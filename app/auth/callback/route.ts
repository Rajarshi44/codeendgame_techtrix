import { NextResponse } from 'next/server'
import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { ADMIN_EMAILS, EVENT_ID } from '@/lib/constants'

const SAFE_NEXT_PATHS = new Set(['/dashboard', '/admin'])

function safeNext(raw: string | null, fallback: string): string {
  if (!raw) return fallback
  // Reject anything that isn't strictly an internal absolute path.
  // Block: scheme-relative ("//evil.com"), backslash bypass ("/\\evil.com"),
  // protocol URLs, URL-encoded slashes, and ".." traversal.
  if (
    !raw.startsWith('/') ||
    raw.startsWith('//') ||
    raw.startsWith('/\\') ||
    raw.includes('..') ||
    /[%]/.test(raw)
  ) {
    return fallback
  }
  // Drop query/fragment for the allowlist check.
  const pathOnly = raw.split('?')[0].split('#')[0]
  return SAFE_NEXT_PATHS.has(pathOnly) ? raw : fallback
}

function buildRedirect(origin: string, forwardedHost: string | null, path: string) {
  const isLocalEnv = process.env.NODE_ENV === 'development'
  if (isLocalEnv) return NextResponse.redirect(`${origin}${path}`)
  if (forwardedHost) return NextResponse.redirect(`https://${forwardedHost}${path}`)
  return NextResponse.redirect(`${origin}${path}`)
}

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  const rawNext = searchParams.get('next')

  if (!code) {
    return NextResponse.redirect(`${origin}/auth/error?reason=oauth_failed`)
  }

  const cookieStore = await cookies()

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet: { name: string; value: string; options: CookieOptions }[]) {
          try {
            cookiesToSet.forEach(({ name, value, options }) => {
              cookieStore.set(name, value, options)
            })
          } catch {
            // ignore in Server Component context
          }
        },
      },
    }
  )

  const { data: sessionData, error: sessionError } = await supabase.auth.exchangeCodeForSession(code)

  if (sessionError || !sessionData.session) {
    return NextResponse.redirect(`${origin}/auth/error?reason=oauth_failed`)
  }

  const userEmail = sessionData.session.user.email
  if (!userEmail) {
    return NextResponse.redirect(`${origin}/auth/error?reason=oauth_failed`)
  }

  const forwardedHost = request.headers.get('x-forwarded-host')

  // ── Admin short-circuit: skip payment gate for allowlist emails ───────────
  if (ADMIN_EMAILS.includes(userEmail.toLowerCase())) {
    const target = safeNext(rawNext, '/admin')
    return buildRedirect(origin, forwardedHost, target)
  }

  // ── Payment check ──────────────────────────────────────────────────────────

  const [{ data: swcTeams }, { data: rzpPayments }] = await Promise.all([
    supabase
      .from('teams')
      .select('team_id')
      .eq('event_id', EVENT_ID)
      .eq('payment_mode', 'SWC_PAID'),
    supabase
      .from('payments')
      .select('team_id')
      .eq('event_id', EVENT_ID)
      .eq('status', 'paid'),
  ])

  const okTeamIds = Array.from(
    new Set([
      ...((swcTeams ?? []).map((t: { team_id: string }) => t.team_id)),
      ...((rzpPayments ?? []).map((p: { team_id: string }) => p.team_id)),
    ])
  )

  if (okTeamIds.length === 0) {
    await supabase.auth.signOut()
    return NextResponse.redirect(`${origin}/auth/error?reason=not_paid`)
  }

  const { data: participant } = await supabase
    .from('participants')
    .select('email, team_id')
    .eq('email', userEmail)
    .in('team_id', okTeamIds)
    .maybeSingle()

  if (!participant) {
    await supabase.auth.signOut()
    return NextResponse.redirect(`${origin}/auth/error?reason=not_paid`)
  }

  return buildRedirect(origin, forwardedHost, safeNext(rawNext, '/dashboard'))
}

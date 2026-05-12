import { NextResponse } from 'next/server'
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

const EVENT_ID = '23e45f0c-c0a7-4b72-86df-7d9bfb4882aa'

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  const next = searchParams.get('next') ?? '/dashboard'

  if (!code) {
    // No auth code — something went wrong with OAuth itself
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
        setAll(cookiesToSet) {
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

  // Exchange code for session
  const { data: sessionData, error: sessionError } = await supabase.auth.exchangeCodeForSession(code)

  if (sessionError || !sessionData.session) {
    return NextResponse.redirect(`${origin}/auth/error?reason=oauth_failed`)
  }

  const userEmail = sessionData.session.user.email
  console.log('[auth/callback] Logged-in email:', userEmail)

  if (!userEmail) {
    return NextResponse.redirect(`${origin}/auth/error?reason=oauth_failed`)
  }

  // ── Payment check ──────────────────────────────────────────────────────────

  // Step a: teams marked SWC_PAID for this event
  const { data: swcTeams, error: swcError } = await supabase
    .from('teams')
    .select('team_id')
    .eq('event_id', EVENT_ID)
    .eq('payment_mode', 'SWC_PAID')
  console.log('[auth/callback] SWC teams:', swcTeams, '| error:', swcError)

  // Step b: teams with Razorpay paid status
  const { data: rzpPayments, error: rzpError } = await supabase
    .from('payments')
    .select('team_id')
    .eq('event_id', EVENT_ID)
    .eq('status', 'paid')
  console.log('[auth/callback] Razorpay payments:', rzpPayments, '| error:', rzpError)

  const okTeamIds = Array.from(
    new Set([
      ...((swcTeams ?? []).map((t: { team_id: string }) => t.team_id)),
      ...((rzpPayments ?? []).map((p: { team_id: string }) => p.team_id)),
    ])
  )
  console.log('[auth/callback] okTeamIds (paid teams union):', okTeamIds)

  if (okTeamIds.length === 0) {
    // No paid teams found at all — treat as not paid for this user
    await supabase.auth.signOut()
    return NextResponse.redirect(`${origin}/auth/error?reason=not_paid`)
  }

  // DEBUG: dump all participant emails in paid teams
  const { data: allParticipants } = await supabase
    .from('participants')
    .select('email, team_id')
    .in('team_id', okTeamIds)
  console.log('[auth/callback] ALL participants in paid teams:', allParticipants?.map(p => p.email))

  // Step c: check if the logged-in user's email is in any of those paid teams
  const { data: participant, error: participantError } = await supabase
    .from('participants')
    .select('email, team_id')
    .eq('email', userEmail)
    .in('team_id', okTeamIds)
    .maybeSingle()
  console.log('[auth/callback] Participant match:', participant, '| error:', participantError)

  if (!participant) {
    // User authenticated but not in a paid team
    await supabase.auth.signOut()
    return NextResponse.redirect(`${origin}/auth/error?reason=not_paid`)
  }

  // ── Access granted ──────────────────────────────────────────────────────────
  const forwardedHost = request.headers.get('x-forwarded-host')
  const isLocalEnv = process.env.NODE_ENV === 'development'

  if (isLocalEnv) {
    return NextResponse.redirect(`${origin}${next}`)
  } else if (forwardedHost) {
    return NextResponse.redirect(`https://${forwardedHost}${next}`)
  } else {
    return NextResponse.redirect(`${origin}${next}`)
  }
}

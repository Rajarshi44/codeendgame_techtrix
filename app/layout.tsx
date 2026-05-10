import type { Metadata } from 'next'
import './globals.css'
import ToastProvider from '@/components/ui/Toast'

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : 'http://localhost:3000'

export const metadata: Metadata = {
  metadataBase: new URL(defaultUrl),
  title: 'CODE ENDGAME — TECHTRIX 2026 | RCCIIT Hackathon',
  description:
    '48-hour online hackathon followed by an 8-hour offline grand finale. Code Endgame is the flagship hackathon of TECHTRIX 2026, RCC Institute of Information Technology.',
  keywords: ['hackathon', 'RCCIIT', 'techtrix 2026', 'code endgame', 'software development', 'Kolkata'],
  openGraph: {
    title: 'CODE ENDGAME — TECHTRIX 2026',
    description: '48 Hours. One Problem. No Mercy.',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="font-body text-[var(--text-primary)] bg-[var(--void)]">
        <div className="relative z-10">
          {children}
        </div>
        <ToastProvider />
      </body>
    </html>
  )
}

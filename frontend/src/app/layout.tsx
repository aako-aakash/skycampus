import type { Metadata } from 'next'
import { DM_Sans } from 'next/font/google'
import './globals.css'
import { Providers } from './providers'
import { Toaster } from 'react-hot-toast'

const dmSans = DM_Sans({ subsets: ['latin'], variable: '--font-dm-sans' })

export const metadata: Metadata = {
  title: 'SkyCampus — AI-Powered University Social Network',
  description: 'Your University. Your Network. Powered by AI.',
  icons: { icon: '/favicon.ico' },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${dmSans.variable} font-sans bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 antialiased`}>
        <Providers>
          {children}
          <Toaster position="bottom-right" toastOptions={{ duration: 3000, style: { background: '#1e293b', color: '#f1f5f9', border: '1px solid #334155' } }} />
        </Providers>
      </body>
    </html>
  )
}

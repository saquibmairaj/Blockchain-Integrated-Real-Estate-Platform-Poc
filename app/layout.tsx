import type { Metadata } from 'next'
import localFont from 'next/font/local'
import './globals.css'
import { AuthProvider } from '@/providers/auth-provider'
import { ToastProvider } from '@/providers/toast-provider'
import { WalletProvider } from '@/providers/wallet-provider'
import { ThemeProvider } from '@/providers/theme-provider'
import { Footer } from '@/components/blocks/footer'
import { Navbar } from '@/components/navigation/navbar'

const geistSans = localFont({
  src: '../public/fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
})
const geistMono = localFont({
  src: '../public/fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
})

export const metadata: Metadata = {
  title: {
    default: 'BlockEstate — Premium real estate, tokenized for everyone',
    template: '%s | BlockEstate',
  },
  description:
    'Own a verified slice of premium real estate with crypto, starting from $100 — tokenized and fractional, settled on-chain.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-surface-base min-h-screen pt-[68px]`}
      >
        <ThemeProvider>
          <ToastProvider>
            <AuthProvider>
              <WalletProvider>
                <Navbar />
                {children}
                <Footer />
              </WalletProvider>
            </AuthProvider>
          </ToastProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}

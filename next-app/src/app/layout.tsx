import type { Metadata } from 'next'
import './globals.css'
import './legacy.css'

export const metadata: Metadata = {
  title: 'MarketingOS',
  description: 'MarketingOS (Next + Postgres)',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&family=DM+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
        <link rel="stylesheet" href="/legacy/style" />
      </head>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  )
}

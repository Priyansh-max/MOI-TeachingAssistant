import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'MOI Teaching Assistant',
  description: 'Teaching Assistant Application',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}

import Providers from './_providers/Providers'
import './globals.css'
import { workSans } from '@/lib/fonts.js'


export const metadata = {
  title: 'Covariance',
  description: 'ETHOnline Hackathon 2023',
}

export default function RootLayout({ children }) {
  return (
      <html lang="en">
        <body className={workSans.style}><Providers>{children}</Providers></body>
      </html>
)}

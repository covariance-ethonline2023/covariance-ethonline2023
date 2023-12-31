import Providers from './_providers/Providers'
import { UserTypeProvider } from './context/userTypeContext'
import './globals.css'
import { workSans } from '@/lib/fonts.js'


export const metadata = {
  title: 'Covariance',
  description: 'ETHOnline Hackathon 2023',
}

export default function RootLayout({ children }) {
  return (
      <html lang="en">
      <body className={`${workSans.className} text-white bg-cover bg-appBlack bg-[url('/images/bg.svg')]`}><Providers><UserTypeProvider>{children}</UserTypeProvider></Providers></body>
      </html>
)}

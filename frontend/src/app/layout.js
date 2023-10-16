import './globals.css'
import { workSans } from '@/lib/fonts.js'
// import { WagmiConfig, createConfig, goerli } from 'wagmi'
// import { createPublicClient, http } from 'viem'


// const config = createConfig({
//   autoConnect: true,
//   publicClient: createPublicClient({
//     chain: goerli,
//     transport: http()
//   }),
// })



export const metadata = {
  title: 'Covariance',
  description: 'ETHOnline Hackathon 2023',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
       {/* <WagmiConfig config={config}> */}
      <body className={workSans.style}>{children}</body>
      {/* </WagmiConfig> */}
    </html>
  )
}

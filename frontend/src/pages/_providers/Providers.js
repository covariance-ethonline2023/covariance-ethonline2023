'use client'

import React from 'react'
import { config } from './WagmiProvider'
import { WagmiConfig } from 'wagmi'


const Providers = ({children}) => {
  return (
    <WagmiConfig config={config}>{children}</WagmiConfig>
  )
}

export default Providers
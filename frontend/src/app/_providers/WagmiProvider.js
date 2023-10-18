import { configureChains, createConfig } from 'wagmi'
import { InjectedConnector } from 'wagmi/connectors/injected'
import { alchemyProvider } from 'wagmi/providers/alchemy'
import { goerli } from 'wagmi/chains'
// import { MetaMaskConnector } from 'wagmi/connectors/metaMask'
import { publicProvider } from 'wagmi/providers/public'


const {chains, publicClient } = configureChains(
    [goerli], 
    [alchemyProvider({  apiKey: process.env.NEXT_APP_ALCHEMY_API_KEY || ''  }), publicProvider() ],
 )

export const config = createConfig({
  autoConnect: true,
  connectors:
  [
      // new MetaMaskConnector({ chains }),
      new InjectedConnector({ chains }),
    ],
    publicClient,
});

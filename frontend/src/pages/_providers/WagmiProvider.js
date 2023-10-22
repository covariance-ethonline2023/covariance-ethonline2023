import { configureChains, createConfig } from 'wagmi'
import { InjectedConnector } from 'wagmi/connectors/injected'
import { alchemyProvider } from 'wagmi/providers/alchemy'
import { goerli } from 'wagmi/chains'
// import { MetaMaskConnector } from 'wagmi/connectors/metaMask'
import { publicProvider } from 'wagmi/providers/public'


const {chains, provider, publicClient } = configureChains(
    [goerli], 
    [alchemyProvider({  apiKey: process.env.NEXT_PUBLIC_ALCHEMY_API_KEY || ''  }), 
    publicProvider() ],
 )

export const config = createConfig({
  autoConnect: false,
  provider,
  connectors:
  [
      // new MetaMaskConnector({ chains }),
      new InjectedConnector({
        chains,
        options: {
          name: 'Injected',
          shimDisconnect: true,
        },
      }),
    ],
    publicClient,
});

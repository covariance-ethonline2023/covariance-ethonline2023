import { configureChains, createConfig } from 'wagmi'
import { InjectedConnector } from 'wagmi/connectors/injected'
import { alchemyProvider } from 'wagmi/providers/alchemy'
import { goerli } from 'wagmi/chains'
import { MetaMaskConnector } from 'wagmi/connectors/metaMask'
import { publicProvider } from 'wagmi/providers/public'
import { WagmiConfig } from 'wagmi'
import { SafeConnector } from 'wagmi/connectors/safe'
// import { WalletConnectConnector } from 'wagmi/connectors/walletConnect';

// import SafeProvider from '@gnosis.pm/safe-apps-react-sdk';



// const WALLETCONNECT_PROJECT_ID = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID


const {chains, publicClient } = configureChains(
    [goerli], 
    [alchemyProvider({  apiKey: process.env.NEXT_PUBLIC_ALCHEMY_API_KEY || ''  }), 
    publicProvider() ],
 )

 let connectors = [
    new SafeConnector({ chains }),
    new MetaMaskConnector({ chains }),
    new InjectedConnector({
      chains,
      options: {
        name: 'Injected',
        shimDisconnect: true,
      },
    }),
  ];


//  if (WALLETCONNECT_PROJECT_ID) {
//     // A WalletConnect ID is provided so we add the Connector for testing purposes
//     connectors = [
//       ...connectors,
//       new WalletConnectConnector({
//         chains,
//         options: {
//           projectId: WALLETCONNECT_PROJECT_ID,
//         },
//       }),
//     ];
//   }

const wagmiConfig = createConfig({
    connectors: connectors,
    publicClient,
});

export default function App({ Component, pageProps }) {
    return (
        <>
        <WagmiConfig config={wagmiConfig}>
            {/* <RainbowKitProvider chains={chains}> */}
            <Component {...pageProps} suppressHydrationWarning={true}/>
            {/* </RainbowKitProvider> */}
        </WagmiConfig>
      </>
    );
  
  }
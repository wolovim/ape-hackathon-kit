'use client'

import * as React from 'react'
import { connectorsForWallets, RainbowKitProvider, darkTheme } from '@rainbow-me/rainbowkit';
import { injectedWallet, walletConnectWallet, metaMaskWallet } from '@rainbow-me/rainbowkit/wallets';
import { WagmiConfig, configureChains, createConfig } from 'wagmi'
import { foundry } from 'wagmi/chains';
import { publicProvider } from 'wagmi/providers/public';

const { chains, publicClient, webSocketPublicClient } = configureChains(
    [
      foundry
    ],
    [publicProvider()]
  );

const connectors = connectorsForWallets([
{
    groupName: 'Recommended',
    wallets: [
        injectedWallet({ chains }),
        metaMaskWallet({
            projectId: 'YOUR_PROJECT_ID',
            chains,
            shimDisconnect: true,
            UNSTABLE_shimOnConnectSelectAccount: true,
        }),
        walletConnectWallet({ projectId: 'YOUR_PROJECT_ID', chains }),
    ],
},
]);

// const { connectors } = getDefaultWallets({
//     appName: 'RainbowKit App',
//     projectId: 'YOUR_PROJECT_ID',
//     chains,
// });

const wagmiConfig = createConfig({
    autoConnect: true,
    connectors,
    publicClient,
    webSocketPublicClient,
});

export function Providers({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = React.useState(false)
  React.useEffect(() => setMounted(true), [])
  return (
    <WagmiConfig config={wagmiConfig}>
        <RainbowKitProvider
            coolMode={true}
            chains={chains} 
            theme={darkTheme({
                accentColor: '#7b3fe4',
                accentColorForeground: 'white',
                borderRadius: 'small',
                fontStack: 'system',
                overlayBlur: 'small',
            })}>
            {mounted && children}
        </RainbowKitProvider>
    </WagmiConfig>
  );
}

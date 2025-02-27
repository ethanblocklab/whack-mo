'use client'

import { DynamicContextProvider } from '@dynamic-labs/sdk-react-core'
import { EthereumWalletConnectors } from '@dynamic-labs/ethereum'
import { createConfig, WagmiProvider } from 'wagmi'
import { monadTestnet } from 'viem/chains'
import { http } from 'viem'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { DynamicWagmiConnector } from '@dynamic-labs/wagmi-connector'

const config = createConfig({
  chains: [monadTestnet],
  multiInjectedProviderDiscovery: false,
  transports: {
    [monadTestnet.id]: http(),
  },
})

const queryClient = new QueryClient()

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <DynamicContextProvider
      theme="auto"
      settings={{
        environmentId: '21a67b7e-3565-49f6-9c21-9f08c272c485',
        walletConnectors: [EthereumWalletConnectors],
      }}
    >
      <WagmiProvider config={config}>
        <QueryClientProvider client={queryClient}>
          <DynamicWagmiConnector>{children}</DynamicWagmiConnector>
        </QueryClientProvider>
      </WagmiProvider>
    </DynamicContextProvider>
  )
}

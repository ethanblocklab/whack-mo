'use client'

import {
  DynamicContextProvider,
  overrideNetworkRpcUrl,
} from '@dynamic-labs/sdk-react-core'
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

// Validate required environment variables
if (!process.env.NEXT_PUBLIC_RPC_URL) {
  throw new Error('NEXT_PUBLIC_RPC_URL environment variable is required')
}

if (!process.env.NEXT_PUBLIC_DYNAMIC_ENVIRONMENT_ID) {
  throw new Error(
    'NEXT_PUBLIC_DYNAMIC_ENVIRONMENT_ID environment variable is required',
  )
}

const rpcUrlOverrides = {
  '10143': [process.env.NEXT_PUBLIC_RPC_URL],
}

export default function DynamicProvider({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <DynamicContextProvider
      theme="auto"
      settings={{
        environmentId: process.env.NEXT_PUBLIC_DYNAMIC_ENVIRONMENT_ID as string,
        walletConnectors: [EthereumWalletConnectors],
        overrides: {
          evmNetworks: (networks) =>
            overrideNetworkRpcUrl(networks, rpcUrlOverrides),
        },
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

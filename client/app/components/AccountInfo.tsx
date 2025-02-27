'use client'

import { useAccount } from 'wagmi'

export default function AccountInfo() {
  const { address, isConnected, chain } = useAccount()

  return (
    <div>
      <p>wagmi connected: {isConnected ? 'true' : 'false'}</p>
      <p>wagmi address: {address}</p>
      <p>wagmi network: {chain?.id}</p>
    </div>
  )
}

'use client'

import { ApolloProvider as BaseApolloProvider } from '@apollo/client'
import createApolloClient from '@/app/lib/apollo-client'
import { ReactNode, useState } from 'react'

export default function ApolloProvider({ children }: { children: ReactNode }) {
  const [client] = useState(() => createApolloClient())

  return <BaseApolloProvider client={client}>{children}</BaseApolloProvider>
}

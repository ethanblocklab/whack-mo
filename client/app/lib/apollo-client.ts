import { ApolloClient, InMemoryCache } from '@apollo/client'

// Create an Apollo Client instance
const createApolloClient = () => {
  if (
    !process.env.NEXT_PUBLIC_GHOST_GRAPH_URL ||
    !process.env.NEXT_PUBLIC_GHOST_GRAPH_KEY
  ) {
    throw new Error('GHOST_GRAPH_URL and GHOST_GRAPH_KEY must be set')
  }

  return new ApolloClient({
    uri: process.env.NEXT_PUBLIC_GHOST_GRAPH_URL,
    cache: new InMemoryCache(),
    defaultOptions: {
      query: {
        fetchPolicy: 'network-only',
      },
    },
    headers: {
      'X-GHOST-KEY': process.env.NEXT_PUBLIC_GHOST_GRAPH_KEY!,
    },
  })
}

export default createApolloClient

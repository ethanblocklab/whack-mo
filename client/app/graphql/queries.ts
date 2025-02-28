import { gql } from '@apollo/client'

export const GET_LEADERBOARD = gql`
  query GetLeaderboard {
    players(limit: 200, orderBy: "points", orderDirection: "desc") {
      items {
        id
        points
      }
    }
  }
`

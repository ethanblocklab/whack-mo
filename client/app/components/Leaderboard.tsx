import React from 'react'
import { formatAddress } from '@/app/utils/formatAddress'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useQuery } from '@apollo/client'
import { GET_LEADERBOARD } from '@/app/graphql/queries'

type LeaderboardEntry = {
  address: string
  points: number
}

type Player = {
  id: string
  points: number
}

export default function Leaderboard({ isVisible }: { isVisible?: boolean }) {
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([])

  // Use Apollo useQuery hook to fetch data
  const { loading, error, data, refetch } = useQuery(GET_LEADERBOARD)

  // Refetch when the component becomes visible
  useEffect(() => {
    if (isVisible) {
      refetch()
    }
  }, [isVisible, refetch])

  useEffect(() => {
    if (data && data.players && data.players.items) {
      try {
        const formattedLeaderboard = data.players.items.map(
          (player: Player) => ({
            address: player.id,
            points: Number(player.points),
          }),
        )

        setLeaderboard(formattedLeaderboard)
      } catch (error) {
        toast.error(
          'Failed to process leaderboard data: ' +
            (error instanceof Error ? error.message : String(error)),
        )
      }
    }
  }, [data])

  // Show error state in the UI
  if (error) {
    return (
      <div className="p-4 text-center">
        <div className="text-red-500 mb-2">Failed to load leaderboard</div>
        <div className="text-sm text-gray-500">
          {error instanceof Error ? error.message : String(error)}
        </div>
        <button
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          onClick={() => refetch?.()}
        >
          Try Again
        </button>
      </div>
    )
  }

  // Show loading state
  if (loading) {
    return <div className="p-4 text-center">Loading leaderboard...</div>
  }

  return (
    <div className="leaderboard-container">
      <div className="leaderboard-header">
        <h2>Leaderboard</h2>
      </div>

      {leaderboard.length > 0 ? (
        <ul className="leaderboard-list">
          {leaderboard.map((entry, index) => (
            <li key={index} className="leaderboard-item">
              <div className="leaderboard-rank">
                <div
                  className={`rank-number ${
                    index === 0
                      ? 'rank-1'
                      : index === 1
                      ? 'rank-2'
                      : index === 2
                      ? 'rank-3'
                      : 'rank-other'
                  }`}
                >
                  {index + 1}
                </div>
                <span className="player-address">
                  {entry.address.startsWith('0x')
                    ? formatAddress(entry.address)
                    : entry.address}
                </span>
              </div>
              <span className="player-points">{entry.points} pts</span>
            </li>
          ))}
        </ul>
      ) : (
        <div className="leaderboard-empty">No players yet. Be the first!</div>
      )}
    </div>
  )
}

import React from 'react'
import { formatAddress } from '@/app/utils/formatAddress'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'

type LeaderboardEntry = {
  address: string
  points: number
}

// forge a topPlayers array
const topPlayers = [
  { address: '0x1234...5678', points: 120 },
  { address: '0xabcd...efgh', points: 95 },
  { address: '0x9876...5432', points: 87 },
  { address: '0xijkl...mnop', points: 65 },
]

export default function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([])
  const [loading, setLoaderboard] = useState(true)

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const formattedLeaderboard = topPlayers.map(
          (player: LeaderboardEntry) => ({
            address: player.address,
            points: Number(player.points),
          }),
        )

        setLeaderboard(formattedLeaderboard)
      } catch (error) {
        toast.error(
          'Failed to fetch leaderboard:' +
            (error instanceof Error ? error.message : String(error)),
        )
      } finally {
        setLoaderboard(false)
      }
    }

    fetchLeaderboard()
  }, [])

  return (
    <div className="leaderboard-container">
      <div className="leaderboard-header">
        <h2>Leaderboard</h2>
        <div className="leaderboard-hint d-none d-lg-block">
          (Click the mole image to toggle)
        </div>
      </div>

      {loading ? (
        <div className="leaderboard-loading">Loading leaderboard...</div>
      ) : (
        <>
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
            <div className="leaderboard-empty">
              No players yet. Be the first!
            </div>
          )}
        </>
      )}
    </div>
  )
}

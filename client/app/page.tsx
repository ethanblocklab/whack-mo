'use client'

import { DynamicWidget } from '@dynamic-labs/sdk-react-core'
import './page.css'
import { useAccount } from 'wagmi'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import useWhackMoleContract from './hooks/useWhackMoleContract'

export default function Main() {
  const { isConnected } = useAccount()
  const [score, setScore] = useState(0)
  const [gameStarted, setGameStarted] = useState(false)
  const [activeMole, setActiveMole] = useState(-1)
  const [timeLeft, setTimeLeft] = useState(30)
  const [whackedMole, setWhackedMole] = useState(-1)
  const [hammerPosition, setHammerPosition] = useState({ x: 0, y: 0 })
  const [showHammer, setShowHammer] = useState(false)
  const [splatMole, setSplatMole] = useState(-1)
  const [scorePopup, setScorePopup] = useState<{
    show: boolean
    x: number
    y: number
  }>({
    show: false,
    x: 0,
    y: 0,
  })
  const [gameShake, setGameShake] = useState(false)
  const { whackMoleOnChain, isPending, isSuccess, isError, error } =
    useWhackMoleContract()

  // Optional: Add audio references
  const [whackSound] = useState(() =>
    typeof Audio !== 'undefined' ? new Audio('/sounds/whack.wav') : null,
  )
  const [pointSound] = useState(() =>
    typeof Audio !== 'undefined' ? new Audio('/sounds/point.wav') : null,
  )

  const startGame = () => {
    setGameStarted(true)
    setScore(0)
    setTimeLeft(30)
  }

  const whackMole = (index: number, e: React.MouseEvent) => {
    if (index === activeMole) {
      // call contract
      whackMoleOnChain()

      // Play sound effects if available
      if (whackSound) {
        whackSound.currentTime = 0
        whackSound.play().catch((e) => console.log('Audio play failed:', e))
      }

      if (pointSound) {
        pointSound.currentTime = 0
        pointSound.play().catch((e) => console.log('Audio play failed:', e))
      }

      // Set the whacked mole for animation
      setWhackedMole(index)

      // Show splat effect
      setSplatMole(index)

      // Show score popup at click position
      setScorePopup({
        show: true,
        x: e.clientX,
        y: e.clientY,
      })

      // Add shake effect to the game
      setGameShake(true)

      // Show hammer strike effect at click position
      setHammerPosition({ x: e.clientX, y: e.clientY })
      setShowHammer(true)

      // Hide effects after animation completes
      setTimeout(() => {
        setShowHammer(false)
        setScorePopup((prev) => ({ ...prev, show: false }))
        setGameShake(false)
      }, 300)

      // Reset whacked and splat states after animation
      setTimeout(() => {
        setWhackedMole(-1)
        setSplatMole(-1)
      }, 300)

      setScore((prev) => prev + 1)
      setActiveMole(-1) // Force mole to hide immediately when whacked
    }
  }

  useEffect(() => {
    let moleTimer: NodeJS.Timeout
    let gameTimer: NodeJS.Timeout

    if (gameStarted && timeLeft > 0) {
      // Move mole every 1000ms - Only runs on client side
      moleTimer = setInterval(() => {
        const newPosition = Math.floor(Math.random() * 9)
        setActiveMole(newPosition)
      }, 1000)

      // Count down game timer
      gameTimer = setInterval(() => {
        setTimeLeft((prev) => prev - 1)
      }, 1000)
    } else if (timeLeft === 0) {
      setGameStarted(false)
      setActiveMole(-1)
    }

    return () => {
      clearInterval(moleTimer)
      clearInterval(gameTimer)
    }
  }, [gameStarted, timeLeft])

  return (
    <>
      {!isConnected ? (
        <div className="wallet-connect-overlay">
          <DynamicWidget />
        </div>
      ) : (
        <DynamicWidget />
      )}
      <div className={`container ${!isConnected ? 'not-connected' : ''}`}>
        {/* Hammer effect element */}
        {showHammer && (
          <div
            className="hammer striking"
            style={{
              position: 'fixed',
              left: `${hammerPosition.x - 32}px`,
              top: `${hammerPosition.y - 32}px`,
            }}
          />
        )}

        {/* Score popup */}
        {scorePopup.show && (
          <div
            className="score-popup active"
            style={{
              position: 'fixed',
              left: `${scorePopup.x - 20}px`,
              top: `${scorePopup.y - 20}px`,
            }}
          >
            +1
          </div>
        )}

        <Image
          src="/images/hammer.png"
          alt=""
          className="decoration decoration-left"
          width={200}
          height={200}
        />
        <Image
          src="/images/mole.png"
          alt=""
          className="decoration decoration-right"
          width={200}
          height={200}
        />

        <div className={`game-container ${gameShake ? 'game-shake' : ''}`}>
          <div className="game-info">
            {!gameStarted && (
              <button
                disabled={!isConnected}
                className="start-button"
                onClick={startGame}
              >
                START GAME
              </button>
            )}
            <div className="stats">
              <div className="score">Score: {score}</div>
              <div className="timer">Time: {timeLeft}s</div>
            </div>
          </div>
          <div className={`mole-grid ${gameStarted ? 'game-started' : ''}`}>
            {Array(9)
              .fill(null)
              .map((_, index) => (
                <div
                  key={index}
                  className={`mole-hole ${
                    activeMole === index ? 'mole-active' : ''
                  }`}
                  onClick={(e) => gameStarted && whackMole(index, e)}
                >
                  <div
                    className={`mole ${whackedMole === index ? 'whacked' : ''}`}
                  />
                  {/* Add splat effect */}
                  <div
                    className={`mole-splat ${
                      splatMole === index ? 'active' : ''
                    }`}
                  />
                </div>
              ))}
          </div>
        </div>
        <div className="footer">
          <div className="footer-text">Break ❤️ Monad</div>
          <div className="attributions">
            Images by:
            <ul>
              <li>
                <a
                  href="https://www.flaticon.com/free-icons/mole"
                  title="mole icons"
                >
                  Freepik
                </a>
              </li>
              <li>
                <a
                  href="https://www.flaticon.com/free-icons/legislation"
                  title="legislation icons"
                >
                  Legislation icons created by Freepik - Flaticon
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  )
}

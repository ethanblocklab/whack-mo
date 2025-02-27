'use client'

import { DynamicWidget } from '@dynamic-labs/sdk-react-core'
import './page.css'
import { useAccount } from 'wagmi'
import { useState, useEffect } from 'react'
import Image from 'next/image'

export default function Main() {
  const { isConnected } = useAccount()
  const [score, setScore] = useState(0)
  const [gameStarted, setGameStarted] = useState(false)
  const [activeMole, setActiveMole] = useState(-1)
  const [timeLeft, setTimeLeft] = useState(30)

  const startGame = () => {
    setGameStarted(true)
    setScore(0)
    setTimeLeft(30)
  }

  const whackMole = (index: number) => {
    if (index === activeMole) {
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

        <div className="game-container">
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
                  onClick={() => gameStarted && whackMole(index)}
                >
                  <div className="mole" />
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

import { useEffect, useState } from 'react'
import './App.css'

const HISTORY_STORAGE_KEY = 'pomodoro-history'

function getTodayKey() {
  const today = new Date()
  const year = today.getFullYear()
  const month = String(today.getMonth() + 1).padStart(2, '0')
  const day = String(today.getDate()).padStart(2, '0')

  return `${year}-${month}-${day}`
}

function loadHistoryState() {
  const todayKey = getTodayKey()

  if (typeof window === 'undefined') {
    return {
      history: [],
      savedDate: todayKey,
    }
  }

  const storedValue = window.localStorage.getItem(HISTORY_STORAGE_KEY)

  if (!storedValue) {
    return {
      history: [],
      savedDate: todayKey,
    }
  }

  try {
    const storedHistory = JSON.parse(storedValue)

    if (storedHistory?.date === todayKey && Array.isArray(storedHistory.history)) {
      return {
        history: storedHistory.history,
        savedDate: storedHistory.date,
      }
    }
  } catch {
    // Ignore invalid saved data and start fresh for today.
  }

  return {
    history: [],
    savedDate: todayKey,
  }
}

function formatTime(totalSeconds) {
  const minutes = Math.floor(totalSeconds / 60)
  const seconds = totalSeconds % 60

  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
}

function App() {
  const [focusMinutes] = useState(25)
  const [breakMinutes] = useState(5)
  const [mode, setMode] = useState('focus')
  const [status, setStatus] = useState('ready')
  const [timeLeft, setTimeLeft] = useState(25 * 60)
  const initialHistoryState = loadHistoryState()
  const [history, setHistory] = useState(initialHistoryState.history)
  const [savedDate, setSavedDate] = useState(initialHistoryState.savedDate)

  function handleStart() {
    setStatus('running')
  }

  function handlePause() {
    setStatus('paused')
  }

  function handleResume() {
    setStatus('running')
  }

  function handleReset() {
    setStatus('ready')
    setTimeLeft(focusMinutes * 60)
  }

  useEffect(() => {
    if (typeof window === 'undefined') {
      return undefined
    }

    window.localStorage.setItem(
      HISTORY_STORAGE_KEY,
      JSON.stringify({
        date: savedDate,
        history,
      }),
    )

    return undefined
  }, [history, savedDate])

  useEffect(() => {
    if (status !== 'running') {
      return undefined
    }

    if (timeLeft === 0) {
      if (mode === 'focus') {
        const completedDate = getTodayKey()

        setHistory((currentHistory) => [
          ...currentHistory,
          {
            id: `${completedDate}-${Date.now()}`,
            label: 'Focus session',
            duration: `${focusMinutes} min`,
          },
        ])
        setSavedDate(completedDate)
      }

      const nextMode = mode === 'focus' ? 'break' : 'focus'

      setMode(nextMode)
      setTimeLeft(nextMode === 'focus' ? focusMinutes * 60 : breakMinutes * 60)

      return undefined
    }

    const intervalId = window.setInterval(() => {
      setTimeLeft((currentTimeLeft) => Math.max(currentTimeLeft - 1, 0))
    }, 1000)

    return () => window.clearInterval(intervalId)
  }, [status, timeLeft, mode, focusMinutes, breakMinutes])

  return (
    <main className="app-shell" data-saved-date={savedDate}>
      <section className="timer-card" aria-labelledby="timer-title">
        <p className="eyebrow">Pomodoro Timer</p>
        <div className="timer-display" aria-live="polite" aria-atomic="true">
          <span className="timer-mode">{mode === 'focus' ? 'Focus' : 'Break'}</span>
          <strong>{formatTime(timeLeft)}</strong>
          <span className="timer-status">{status}</span>
        </div>

        <div className="timer-actions" aria-label="Timer controls">
          <button type="button" onClick={handleStart}>
            Start
          </button>
          <button type="button" onClick={handlePause}>
            Pause
          </button>
          <button type="button" onClick={handleResume}>
            Resume
          </button>
          <button type="button" onClick={handleReset}>
            Reset
          </button>
        </div>

        <div className="timer-settings" aria-label="Session lengths">
          <div>
            <span>Focus</span>
            <strong>{focusMinutes} min</strong>
          </div>
          <div>
            <span>Break</span>
            <strong>{breakMinutes} min</strong>
          </div>
        </div>
      </section>

      <section className="history-card" aria-labelledby="history-title">
        <h2 id="history-title">Today's history</h2>
        {history.length === 0 ? (
          <p className="empty-state">
            Completed focus sessions will appear here after we wire the timer logic.
          </p>
        ) : (
          <ul>
            {history.map((item) => (
              <li key={item.id}>
                <span>{item.label}</span>
                <span>{item.duration}</span>
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  )
}

export default App

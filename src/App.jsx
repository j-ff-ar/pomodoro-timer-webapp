import './App.css'

const focusMinutes = 25
const breakMinutes = 5

function formatTime(totalSeconds) {
  const minutes = Math.floor(totalSeconds / 60)
  const seconds = totalSeconds % 60

  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
}

function App() {
  const mode = 'focus'
  const timeLeft = focusMinutes * 60
  const status = 'ready'
  const history = []

  return (
    <main className="app-shell">
      <section className="timer-card" aria-labelledby="timer-title">
        <p className="eyebrow">Pomodoro Timer</p>
        <div className="timer-display" aria-live="polite" aria-atomic="true">
          <span className="timer-mode">{mode === 'focus' ? 'Focus' : 'Break'}</span>
          <strong>{formatTime(timeLeft)}</strong>
          <span className="timer-status">{status}</span>
        </div>

        <div className="timer-actions" aria-label="Timer controls">
          <button type="button">Start</button>
          <button type="button">Pause</button>
          <button type="button">Resume</button>
          <button type="button">Reset</button>
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
        <h2 id="history-title">Today&apos;s history</h2>
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

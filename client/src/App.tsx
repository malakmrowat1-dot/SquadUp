import './App.css'

function App() {
  return (
    <div className="app">

      <nav className="navbar">
        <div className="logo">
          ⚡ SQUADUP
        </div>

        <div className="nav-links">
          <a href="#">Find Games</a>
          <a href="#">How it works</a>
          <a href="#">Players</a>
        </div>

        <div className="nav-actions">
          <button className="login-btn">Log in</button>
          <button className="join-btn">Join free</button>
        </div>
      </nav>

      <main className="hero-section">

        <div className="hero-text">

          <p className="small-title">
            PLAY. CONNECT. REPEAT.
          </p>

          <h1>
            FIND YOUR
            <span> GAME.</span>
            <br />
            BUILD YOUR
            <br />
            SQUAD.
          </h1>

          <p className="description">
            SquadUp connects you with players nearby.
            Whether you want a casual kick-around or a
            competitive match, your next game is minutes away.
          </p>

          <button className="hero-button">
            Find a game
          </button>

        </div>

        <div className="hero-image">
          <div className="image-placeholder">
            SPORTS IMAGE
          </div>
        </div>

      </main>

    </div>
  )
}

export default App
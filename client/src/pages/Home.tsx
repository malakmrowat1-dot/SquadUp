import { Link } from 'react-router-dom'
import heroImage from '../assets/squadup-sports.png'
import '../App.css'

const sports = [
  { icon: '⚽', name: 'Football' },
  { icon: '🏀', name: 'Basketball' },
  { icon: '🎾', name: 'Tennis' },
  { icon: '🏐', name: 'Volleyball' },
  { icon: '🏃', name: 'Running' },
  { icon: '🏒', name: 'Ice Hockey' },
  { icon: '🏈', name: 'American Football' },
  { icon: '🏉', name: 'Rugby' },
  { icon: '🥊', name: 'Boxing' },
  { icon: '🏊', name: 'Swimming' },
  { icon: '🚴', name: 'Cycling' },
  { icon: '🏋️', name: 'Fitness' },
]

function Home() {
  return (
    <div className="home-page">

      {/* NAVBAR */}
      <nav className="home-navbar">

        <Link to="/" className="home-logo">
          <span className="logo-lightning">⚡</span>
          SQUADUP
        </Link>

        <div className="home-nav-links">
          <Link to="/games">Find Games</Link>
          <a href="#how-it-works">How it works</a>
          <a href="#players">Players</a>
        </div>

        <div className="home-nav-actions">
          <Link to="/login" className="home-login">
            Log in
          </Link>

          <Link to="/register" className="home-register">
            Join free
          </Link>
        </div>

      </nav>


      {/* HERO */}
      <main className="home-hero">

        <div className="home-hero-text">

          <p className="home-eyebrow">
            PLAY. CONNECT. REPEAT.
          </p>

          <h1 className="home-title">

            <span className="title-white">
              FIND YOUR
            </span>

            <span className="title-green">
              GAME.
            </span>

            <span className="title-white title-second">
              BUILD YOUR
            </span>

            <span className="title-white">
              SQUAD.
            </span>

          </h1>

          <p className="home-hero-description">
            Find local games, meet players near you and
            build a squad around the sports you love.
          </p>

          <div className="hero-actions">

            <Link to="/games" className="primary-home-btn">
              Find a game
              <span>→</span>
            </Link>

            <Link to="/create-game" className="secondary-home-btn">
              Host a game
            </Link>

          </div>

          <div className="hero-mini-info">

            <div>
              <strong>12</strong>
              <span>Sports</span>
            </div>

            <div className="mini-divider"></div>

            <div>
              <strong>Easy</strong>
              <span>Game discovery</span>
            </div>

            <div className="mini-divider"></div>

            <div>
              <strong>Free</strong>
              <span>To join</span>
            </div>

          </div>

        </div>


        {/* LARGE IMAGE */}
        <div className="home-hero-visual">

          <div className="hero-image-glow"></div>

          <img
            src={heroImage}
            alt="SquadUp sports community"
            className="home-main-image"
          />

        </div>

      </main>


      {/* HOW IT WORKS */}
      <section
        id="how-it-works"
        className="modern-section how-section"
      >

        <div className="section-heading">

          <p className="home-eyebrow">
            SIMPLE. FAST. FREE.
          </p>

          <h2>
            Ready to play?
            <br />
            <span>It only takes 3 steps.</span>
          </h2>

          <p>
            SquadUp makes finding people to play with simple.
          </p>

        </div>


        <div className="modern-how-grid">

          <div className="modern-how-card">

            <div className="step-number">
              01
            </div>

            <div className="step-icon">
              🔎
            </div>

            <h3>Find a game</h3>

            <p>
              Browse nearby games and choose your
              favorite sport, level and time.
            </p>

          </div>


          <div className="modern-how-card">

            <div className="step-number">
              02
            </div>

            <div className="step-icon">
              🤝
            </div>

            <h3>Join or host</h3>

            <p>
              Join an existing squad or create your
              own game for other players.
            </p>

          </div>


          <div className="modern-how-card">

            <div className="step-number">
              03
            </div>

            <div className="step-icon">
              🏆
            </div>

            <h3>Play & connect</h3>

            <p>
              Meet new players, enjoy the game and
              grow your local sports community.
            </p>

          </div>

        </div>

      </section>


      {/* SPORTS / PLAYERS */}
      <section
        id="players"
        className="modern-section sports-community"
      >

        <div className="section-heading">

          <p className="home-eyebrow">
            FIND YOUR COMMUNITY
          </p>

          <h2>
            Whatever your game,
            <br />
            <span>there's a squad for you.</span>
          </h2>

          <p>
            Discover players across 12 different sports.
          </p>

        </div>


        <div className="sports-grid">

          {sports.map((sport) => (

            <Link
              to="/games"
              className="sport-home-card"
              key={sport.name}
            >

              <span className="sport-home-icon">
                {sport.icon}
              </span>

              <span>
                {sport.name}
              </span>

            </Link>

          ))}

        </div>


        <div className="community-cta">

          <div>

            <p className="home-eyebrow">
              YOUR NEXT GAME IS WAITING
            </p>

            <h3>
              Ready to find your squad?
            </h3>

          </div>

          <Link
            to="/register"
            className="primary-home-btn"
          >
            Join SquadUp
            <span>→</span>
          </Link>

        </div>

      </section>

    </div>
  )
}

export default Home
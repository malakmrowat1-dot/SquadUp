import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import '../App.css'

type Game = {
  id: string
  sport: string
  title: string
  location: string
  date: string
  level: string
  spotsLeft: number
}

const API_URL =
  'https://6a8eb6b3a12b7de8cc0ee64d.mockapi.io/games'

const sports = [
  'All',
  'Football',
  'Basketball',
  'Tennis',
  'Volleyball',
  'Running',
  'Ice Hockey',
  'American Football',
  'Rugby',
  'Boxing',
  'Swimming',
  'Cycling',
  'Fitness',
]

function getSportIcon(sport: string) {
  switch (sport) {
    case 'Football':
      return '⚽'
    case 'Basketball':
      return '🏀'
    case 'Tennis':
      return '🎾'
    case 'Volleyball':
      return '🏐'
    case 'Running':
      return '🏃'
    case 'Ice Hockey':
      return '🏒'
    case 'American Football':
      return '🏈'
    case 'Rugby':
      return '🏉'
    case 'Boxing':
      return '🥊'
    case 'Swimming':
      return '🏊'
    case 'Cycling':
      return '🚴'
    case 'Fitness':
      return '🏋️'
    default:
      return '🏅'
  }
}

function Games() {
  const [games, setGames] = useState<Game[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedSport, setSelectedSport] = useState('All')

  // GET
  useEffect(() => {
    async function getGames() {
      try {
        const response = await fetch(API_URL)

        if (!response.ok) {
          throw new Error('Failed to fetch games')
        }

        const data = await response.json()
        setGames(data)
      } catch (error) {
        console.error('GET error:', error)
      } finally {
        setLoading(false)
      }
    }

    getGames()
  }, [])

  // JOIN GAME - PUT
  async function joinGame(game: Game) {
    if (Number(game.spotsLeft) <= 0) {
      alert('Sorry, this game is full.')
      return
    }

    const updatedGame = {
      ...game,
      spotsLeft: Number(game.spotsLeft) - 1,
    }

    try {
      const response = await fetch(`${API_URL}/${game.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedGame),
      })

      if (!response.ok) {
        throw new Error('Failed to join game')
      }

      const savedGame = await response.json()

      setGames((currentGames) =>
        currentGames.map((currentGame) =>
          currentGame.id === game.id
            ? savedGame
            : currentGame
        )
      )

      alert('You joined the game!')
    } catch (error) {
      console.error('JOIN error:', error)
      alert('Could not join the game.')
    }
  }

  // DELETE
  async function deleteGame(id: string) {
    const confirmDelete = window.confirm(
      'Are you sure you want to delete this game?'
    )

    if (!confirmDelete) {
      return
    }

    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
      })

      if (!response.ok) {
        throw new Error('Failed to delete game')
      }

      setGames((currentGames) =>
        currentGames.filter((game) => game.id !== id)
      )
    } catch (error) {
      console.error('DELETE error:', error)
      alert('Could not delete the game.')
    }
  }

  const filteredGames =
    selectedSport === 'All'
      ? games
      : games.filter(
          (game) => game.sport === selectedSport
        )

  return (
    <div className="app">

      <nav className="navbar">
        <Link to="/" className="logo">
          ⚡ SQUADUP
        </Link>

        <div className="nav-links">
          <Link to="/games">
            Find Games
          </Link>

          <Link to="/">
            Home
          </Link>
        </div>

        <Link to="/create-game">
          <button className="join-free">
            Host a game
          </button>
        </Link>
      </nav>

      <section className="games-page">

        <div className="games-header">
          <p className="section-label">
            FIND YOUR NEXT MATCH
          </p>

          <h1>
            Games Near You
          </h1>

          <p className="games-description">
            Browse games and join players near you.
          </p>
        </div>

        <div className="sport-filters">

          {sports.map((sport) => (
            <button
              key={sport}
              className={
                selectedSport === sport
                  ? 'active-filter'
                  : ''
              }
              onClick={() => setSelectedSport(sport)}
            >
              {sport === 'All'
                ? 'All Sports'
                : `${getSportIcon(sport)} ${sport}`}
            </button>
          ))}

        </div>

        {loading && (
          <p className="games-message">
            Loading games...
          </p>
        )}

        {!loading && games.length === 0 && (
          <div className="games-message">
            <h2>No games yet</h2>

            <p>
              Be the first player to host a game!
            </p>

            <Link to="/create-game">
              <button className="join-btn">
                Host a Game
              </button>
            </Link>
          </div>
        )}

        {!loading &&
          games.length > 0 &&
          filteredGames.length === 0 && (
            <div className="games-message">

              <h2>
                No {selectedSport} games
              </h2>

              <p>
                Try another sport or host a new game.
              </p>

            </div>
          )}

        <div className="games-list">

          {filteredGames.map((game) => (
            <div
              className="game-card"
              key={game.id}
            >

              <div className="game-card-top">

                <span className="game-sport">
                  {getSportIcon(game.sport)} {game.sport}
                </span>

                <span className="game-level">
                  {game.level}
                </span>

              </div>

              <h2>
                {game.title}
              </h2>

              <div className="game-details">

                <p>
                  📅{' '}
                  {new Date(
                    game.date
                  ).toLocaleString()}
                </p>

                <p>
                  📍 {game.location}
                </p>

              </div>

              <div className="game-footer">

                <span>
                  {game.spotsLeft} spots left
                </span>

                <div className="game-actions">

                  <button
                    className="join-btn"
                    onClick={() => joinGame(game)}
                    disabled={Number(game.spotsLeft) <= 0}
                  >
                    {Number(game.spotsLeft) <= 0
                      ? 'Game Full'
                      : 'Join Game'}
                  </button>

                  <Link
                    to={`/edit-game/${game.id}`}
                  >
                    <button className="edit-btn">
                      Edit
                    </button>
                  </Link>

                  <button
                    className="delete-btn"
                    onClick={() =>
                      deleteGame(game.id)
                    }
                  >
                    Delete
                  </button>

                </div>

              </div>

            </div>
          ))}

        </div>

      </section>

    </div>
  )
}

export default Games
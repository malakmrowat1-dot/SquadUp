import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar.jsx'
import SportFilters from '../components/SportFilters.jsx'
import GameCard from '../components/GameCard.jsx'
import '../styles/global.css'
import '../styles/Games.css'

const API_URL =
  'https://6a8eb6b3a12b7de8cc0ee64d.mockapi.io/games'

const Games = () => {
  const [games, setGames] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedSport, setSelectedSport] = useState('All')

  const getGames = async () => {
    try {
      const response = await fetch(API_URL)

      if (!response.ok) {
        throw new Error('Failed to fetch games')
      }

      const data = await response.json()
      setGames(data)
    } catch (error) {
      console.error('Error fetching games:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getGames()
  }, [])

  const joinGame = async (game) => {
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
          currentGame.id === game.id ? savedGame : currentGame
        )
      )

      alert('You joined the game!')
    } catch (error) {
      console.error('Error joining game:', error)
      alert('Could not join the game.')
    }
  }

  const deleteGame = async (id) => {
    const confirmDelete = window.confirm(
      'Are you sure you want to delete this game?'
    )

    if (!confirmDelete) return

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
      console.error('Error deleting game:', error)
      alert('Could not delete the game.')
    }
  }

  const filteredGames =
    selectedSport === 'All'
      ? games
      : games.filter(({ sport }) => sport === selectedSport)

  return (
    <div className="app">
      <Navbar />

      <section className="games-page">
        <div className="games-header">
          <p className="section-label">FIND YOUR NEXT MATCH</p>
          <h1>Games Near You</h1>
          <p className="games-description">
            Browse games and join players near you.
          </p>
        </div>

        <SportFilters
          selectedSport={selectedSport}
          onSelectSport={setSelectedSport}
        />

        {loading && (
          <p className="games-message">Loading games...</p>
        )}

        {!loading && games.length === 0 && (
          <div className="games-message">
            <h2>No games yet</h2>
            <p>Be the first player to host a game!</p>

            <Link to="/create-game" className="join-btn">
              Host a Game
            </Link>
          </div>
        )}

        {!loading &&
          games.length > 0 &&
          filteredGames.length === 0 && (
            <div className="games-message">
              <h2>No {selectedSport} games</h2>
              <p>Try another sport or host a new game.</p>
            </div>
          )}

        <div className="games-list">
          {filteredGames.map((game) => (
            <GameCard
              key={game.id}
              game={game}
              onJoin={joinGame}
              onDelete={deleteGame}
            />
          ))}
        </div>
      </section>
    </div>
  )
}

export default Games
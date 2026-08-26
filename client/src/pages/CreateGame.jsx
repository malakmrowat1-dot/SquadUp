import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import '../App.css'

const API_URL =
  'https://6a8eb6b3a12b7de8cc0ee64d.mockapi.io/games'

function CreateGame() {
  const navigate = useNavigate()

  const [title, setTitle] = useState('')
  const [sport, setSport] = useState('')
  const [location, setLocation] = useState('')
  const [date, setDate] = useState('')
  const [level, setLevel] = useState('')
  const [spotsLeft, setSpotsLeft] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()

    const newGame = {
      title,
      sport,
      location,
      date,
      level,
      spotsLeft: Number(spotsLeft),
    }

    try {
      setLoading(true)

      const response = await fetch(API_URL, {
        method: 'POST',

        headers: {
          'Content-Type': 'application/json',
        },

        body: JSON.stringify(newGame),
      })

      if (!response.ok) {
        throw new Error('Failed to create game')
      }

      const createdGame = await response.json()

      console.log('Game created:', createdGame)

      alert('Game created successfully!')

      navigate('/games')
    } catch (error) {
      console.error('Error:', error)

      alert('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="create-game-page">

      <nav className="navbar">

        <Link to="/" className="logo">
          ⚡ SQUADUP
        </Link>

        <div className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/games">Find Games</Link>
        </div>

      </nav>

      <div className="create-game-container">

        <h1>Host a Game</h1>

        <p>
          Create a new game and invite players to join.
        </p>

        <form
          className="game-form"
          onSubmit={handleSubmit}
        >

          <label>Game title</label>

          <input
            type="text"
            placeholder="Example: Football at Nazareth"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />

          <label>Sport</label>

          <select
            value={sport}
            onChange={(e) => setSport(e.target.value)}
            required
          >
            <option value="">
              Select sport
            </option>

            <option value="Football">
              ⚽ Football
            </option>

            <option value="Basketball">
              🏀 Basketball
            </option>

            <option value="Tennis">
              🎾 Tennis
            </option>

            <option value="Volleyball">
              🏐 Volleyball
            </option>

            <option value="Running">
              🏃 Running
            </option>

            <option value="Ice Hockey">
              🏒 Ice Hockey
            </option>

            <option value="American Football">
              🏈 American Football
            </option>

            <option value="Rugby">
              🏉 Rugby
            </option>

            <option value="Boxing">
              🥊 Boxing
            </option>

            <option value="Swimming">
              🏊 Swimming
            </option>

            <option value="Cycling">
              🚴 Cycling
            </option>

            <option value="Fitness">
              🏋️ Fitness
            </option>
          </select>

          <label>Location</label>

          <input
            type="text"
            placeholder="Example: Nazareth"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
          />

          <label>Date and time</label>

          <input
            type="datetime-local"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />

          <label>Level</label>

          <select
            value={level}
            onChange={(e) => setLevel(e.target.value)}
            required
          >
            <option value="">
              Select level
            </option>

            <option value="Casual">
              Casual
            </option>

            <option value="Intermediate">
              Intermediate
            </option>

            <option value="Competitive">
              Competitive
            </option>
          </select>

          <label>Available spots</label>

          <input
            type="number"
            min="1"
            placeholder="Example: 5"
            value={spotsLeft}
            onChange={(e) => setSpotsLeft(e.target.value)}
            required
          />

          <button
            type="submit"
            className="join-btn"
            disabled={loading}
          >
            {loading ? 'Creating...' : 'Create Game'}
          </button>

        </form>

      </div>

    </div>
  )
}

export default CreateGame
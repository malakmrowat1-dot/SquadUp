import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import '../App.css'

const API_URL =
  'https://6a8eb6b3a12b7de8cc0ee64d.mockapi.io/games'

function EditGame() {
  const { id } = useParams()
  const navigate = useNavigate()

  const [title, setTitle] = useState('')
  const [sport, setSport] = useState('')
  const [location, setLocation] = useState('')
  const [date, setDate] = useState('')
  const [level, setLevel] = useState('')
  const [spotsLeft, setSpotsLeft] = useState('')
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  // GET ONE GAME
  useEffect(() => {
    async function getGame() {
      try {
        const response = await fetch(`${API_URL}/${id}`)

        if (!response.ok) {
          throw new Error('Failed to load game')
        }

        const game = await response.json()

        setTitle(game.title || '')
        setSport(game.sport || '')
        setLocation(game.location || '')
        setDate(game.date || '')
        setLevel(game.level || '')
        setSpotsLeft(String(game.spotsLeft ?? ''))
      } catch (error) {
        console.error('GET ONE error:', error)
        alert('Could not load game.')
      } finally {
        setLoading(false)
      }
    }

    if (id) {
      getGame()
    }
  }, [id])

  // UPDATE GAME - PUT
  async function handleSubmit(e) {
    e.preventDefault()

    const updatedGame = {
      title,
      sport,
      location,
      date,
      level,
      spotsLeft: Number(spotsLeft),
    }

    try {
      setSaving(true)

      const response = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedGame),
      })

      if (!response.ok) {
        throw new Error('Failed to update game')
      }

      alert('Game updated successfully!')
      navigate('/games')
    } catch (error) {
      console.error('UPDATE error:', error)
      alert('Could not update the game.')
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="create-game-page">
        <p className="games-message">
          Loading game...
        </p>
      </div>
    )
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

        <h1>Edit Game</h1>

        <p>
          Update your game information.
        </p>

        <form
          className="game-form"
          onSubmit={handleSubmit}
        >

          <label>Game title</label>

          <input
            type="text"
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
            value={spotsLeft}
            onChange={(e) => setSpotsLeft(e.target.value)}
            required
          />

          <button
            type="submit"
            className="join-btn"
            disabled={saving}
          >
            {saving ? 'Saving...' : 'Save Changes'}
          </button>

        </form>

      </div>

    </div>
  )
}

export default EditGame
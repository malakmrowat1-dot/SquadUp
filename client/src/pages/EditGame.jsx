import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import '../styles/global.css'
import '../styles/GameForm.css'

const API_URL =
  'https://6a8eb6b3a12b7de8cc0ee64d.mockapi.io/games'

const initialFormData = {
  title: '',
  sport: '',
  location: '',
  date: '',
  level: '',
  spotsLeft: '',
}

const sports = [
  { value: 'Football', label: '⚽ Football' },
  { value: 'Basketball', label: '🏀 Basketball' },
  { value: 'Tennis', label: '🎾 Tennis' },
  { value: 'Volleyball', label: '🏐 Volleyball' },
  { value: 'Running', label: '🏃 Running' },
  { value: 'Ice Hockey', label: '🏒 Ice Hockey' },
  { value: 'American Football', label: '🏈 American Football' },
  { value: 'Rugby', label: '🏉 Rugby' },
  { value: 'Boxing', label: '🥊 Boxing' },
  { value: 'Swimming', label: '🏊 Swimming' },
  { value: 'Cycling', label: '🚴 Cycling' },
  { value: 'Fitness', label: '🏋️ Fitness' },
]

const levels = ['Casual', 'Intermediate', 'Competitive']

const EditGame = () => {
  const { id } = useParams()
  const navigate = useNavigate()

  const [formData, setFormData] = useState(initialFormData)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  const getGame = async () => {
    try {
      const response = await fetch(`${API_URL}/${id}`)

      if (!response.ok) {
        throw new Error('Failed to load game')
      }

      const game = await response.json()

      setFormData({
        title: game.title || '',
        sport: game.sport || '',
        location: game.location || '',
        date: game.date || '',
        level: game.level || '',
        spotsLeft: String(game.spotsLeft ?? ''),
      })
    } catch (error) {
      console.error('Error loading game:', error)
      alert('Could not load game.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (id) {
      getGame()
    }
  }, [id])

  const handleChange = ({ target: { name, value } }) => {
    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    const updatedGame = {
      ...formData,
      spotsLeft: Number(formData.spotsLeft),
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
      console.error('Error updating game:', error)
      alert('Could not update the game.')
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="create-game-page">
        <p className="games-message">Loading game...</p>
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
        <p>Update your game information.</p>

        <form className="game-form" onSubmit={handleSubmit}>
          <label htmlFor="title">Game title</label>
          <input
            id="title"
            name="title"
            type="text"
            value={formData.title}
            onChange={handleChange}
            required
          />

          <label htmlFor="sport">Sport</label>
          <select
            id="sport"
            name="sport"
            value={formData.sport}
            onChange={handleChange}
            required
          >
            {sports.map(({ value, label }) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>

          <label htmlFor="location">Location</label>
          <input
            id="location"
            name="location"
            type="text"
            value={formData.location}
            onChange={handleChange}
            required
          />

          <label htmlFor="date">Date and time</label>
          <input
            id="date"
            name="date"
            type="datetime-local"
            value={formData.date}
            onChange={handleChange}
            required
          />

          <label htmlFor="level">Level</label>
          <select
            id="level"
            name="level"
            value={formData.level}
            onChange={handleChange}
            required
          >
            {levels.map((level) => (
              <option key={level} value={level}>
                {level}
              </option>
            ))}
          </select>

          <label htmlFor="spotsLeft">Available spots</label>
          <input
            id="spotsLeft"
            name="spotsLeft"
            type="number"
            min="1"
            value={formData.spotsLeft}
            onChange={handleChange}
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
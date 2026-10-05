import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
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

const CreateGame = () => {
  const navigate = useNavigate()

  const [formData, setFormData] = useState(initialFormData)
  const [loading, setLoading] = useState(false)

  const handleChange = ({ target: { name, value } }) => {
    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    const newGame = {
      ...formData,
      spotsLeft: Number(formData.spotsLeft),
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

      alert('Game created successfully!')
      navigate('/games')
    } catch (error) {
      console.error('Error creating game:', error)
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
        <p>Create a new game and invite players to join.</p>

        <form className="game-form" onSubmit={handleSubmit}>
          <label htmlFor="title">Game title</label>
          <input
            id="title"
            name="title"
            type="text"
            placeholder="Example: Football at Nazareth"
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
            <option value="">Select sport</option>

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
            placeholder="Example: Nazareth"
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
            <option value="">Select level</option>

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
            placeholder="Example: 5"
            value={formData.spotsLeft}
            onChange={handleChange}
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
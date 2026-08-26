import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import '../App.css'

function Register() {
  const navigate = useNavigate()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  function handleSubmit(e) {
    e.preventDefault()

    if (!name || !email || !password || !confirmPassword) {
      alert('Please fill in all fields.')
      return
    }

    if (password !== confirmPassword) {
      alert('Passwords do not match.')
      return
    }

    const newUser = {
      name,
      email,
      password,
    }

    localStorage.setItem(
      'registeredUser',
      JSON.stringify(newUser)
    )

    alert('Account created successfully!')

    navigate('/login')
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

        <h1>Join SquadUp</h1>

        <p>
          Create your account and find your next game.
        </p>

        <form
          className="game-form"
          onSubmit={handleSubmit}
        >

          <label>Full name</label>

          <input
            type="text"
            placeholder="Enter your full name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <label>Email</label>

          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label>Password</label>

          <input
            type="password"
            placeholder="Create a password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <label>Confirm password</label>

          <input
            type="password"
            placeholder="Confirm your password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />

          <button
            type="submit"
            className="join-btn"
          >
            Create Account
          </button>

          <p style={{ textAlign: 'center' }}>
            Already have an account?{' '}
            <Link to="/login">
              Log in
            </Link>
          </p>

        </form>

      </div>

    </div>
  )
}

export default Register
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import '../App.css'

function Login() {
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    if (!email || !password) {
      alert('Please fill in all fields.')
      return
    }

    localStorage.setItem(
      'currentUser',
      JSON.stringify({
        email,
      })
    )

    alert('Login successful!')

    navigate('/')
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

        <h1>Log In</h1>

        <p>
          Welcome back to SquadUp.
        </p>

        <form
          className="game-form"
          onSubmit={handleSubmit}
        >

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
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button
            type="submit"
            className="join-btn"
          >
            Log In
          </button>

          <p style={{ textAlign: 'center' }}>
            Don't have an account?{' '}
            <Link to="/register">
              Sign up
            </Link>
          </p>

        </form>

      </div>

    </div>
  )
}

export default Login
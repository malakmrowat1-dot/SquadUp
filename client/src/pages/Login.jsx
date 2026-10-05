import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar.jsx'
import '../styles/global.css'
import '../styles/Auth.css'

const Login = () => {
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const handleChange = ({ target: { name, value } }) => {
    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    const { email, password } = formData

    if (!email || !password) {
      alert('Please fill in all fields.')
      return
    }

    localStorage.setItem(
      'currentUser',
      JSON.stringify({ email })
    )

    alert('Login successful!')
    navigate('/')
  }

  return (
    <div className="auth-page">
      <Navbar />

      <div className="auth-container">
        <h1>Log In</h1>

        <p className="auth-description">
          Welcome back to SquadUp.
        </p>

        <form className="auth-form" onSubmit={handleSubmit}>
          <label htmlFor="email">Email</label>

          <input
            id="email"
            name="email"
            type="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <label htmlFor="password">Password</label>

          <input
            id="password"
            name="password"
            type="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
            required
          />

          <button type="submit" className="auth-submit">
            Log In
          </button>

          <p className="auth-footer">
            Don't have an account?{' '}
            <Link to="/register">Sign up</Link>
          </p>
        </form>
      </div>
    </div>
  )
}

export default Login
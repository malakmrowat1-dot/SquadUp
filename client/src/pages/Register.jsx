import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar.jsx'
import '../styles/global.css'
import '../styles/Auth.css'

const initialFormData = {
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
}

const Register = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState(initialFormData)

  const handleChange = ({ target: { name, value } }) => {
    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    const { name, email, password, confirmPassword } = formData

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
    <div className="auth-page">
      <Navbar />

      <div className="auth-container">
        <h1>Join SquadUp</h1>

        <p className="auth-description">
          Create your account and find your next game.
        </p>

        <form className="auth-form" onSubmit={handleSubmit}>
          <label htmlFor="name">Full name</label>

          <input
            id="name"
            name="name"
            type="text"
            placeholder="Enter your full name"
            value={formData.name}
            onChange={handleChange}
            required
          />

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
            placeholder="Create a password"
            value={formData.password}
            onChange={handleChange}
            required
          />

          <label htmlFor="confirmPassword">
            Confirm password
          </label>

          <input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            placeholder="Confirm your password"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />

          <button type="submit" className="auth-submit">
            Create Account
          </button>

          <p className="auth-footer">
            Already have an account?{' '}
            <Link to="/login">Log in</Link>
          </p>
        </form>
      </div>
    </div>
  )
}

export default Register
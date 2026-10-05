import '../styles/Navbar.css'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <nav className="navbar">
      <Link to="/" className="logo">
        ⚡ SQUADUP
      </Link>

      <div className="nav-links">
        <Link to="/games">Find Games</Link>
        <Link to="/">Home</Link>
      </div>

      <Link to="/create-game" className="join-free">
        Host a game
      </Link>
    </nav>
  )
}

export default Navbar
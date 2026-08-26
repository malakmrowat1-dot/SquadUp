import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Home from './pages/Home.jsx'
import Games from './pages/Games.jsx'
import CreateGame from './pages/CreateGame.jsx'
import EditGame from './pages/EditGame.jsx'
import Login from './pages/Login.jsx'
import Register from './pages/Register.jsx'

import './App.css'

function App() {
  return (
    <BrowserRouter>

      <Routes>

        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/games"
          element={<Games />}
        />

        <Route
          path="/create-game"
          element={<CreateGame />}
        />

        <Route
          path="/edit-game/:id"
          element={<EditGame />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

      </Routes>

    </BrowserRouter>
  )
}

export default App
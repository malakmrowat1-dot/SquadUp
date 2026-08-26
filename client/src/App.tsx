import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Home from './pages/Home'
import Games from './pages/Games'
import CreateGame from './pages/CreateGame'
import EditGame from './pages/EditGame'
import Login from './pages/Login'
import Register from './pages/Register'

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
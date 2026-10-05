import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom'

import Home from './pages/Home.jsx'
import Games from './pages/Games.jsx'
import CreateGame from './pages/CreateGame.jsx'
import EditGame from './pages/EditGame.jsx'
import Login from './pages/Login.jsx'
import Register from './pages/Register.jsx'



const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/games',
    element: <Games />,
  },
  {
    path: '/create-game',
    element: <CreateGame />,
  },
  {
    path: '/edit-game/:id',
    element: <EditGame />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/register',
    element: <Register />,
  },
])

const App = () => {
  return <RouterProvider router={router} />
}

export default App
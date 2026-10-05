import { Link } from 'react-router-dom'
import { getSportIcon } from './SportFilters.jsx'

const GameCard = ({ game, onJoin, onDelete }) => {
  const isFull = Number(game.spotsLeft) <= 0

  return (
    <div className="game-card">
      <div className="game-card-top">
        <span className="game-sport">
          {getSportIcon(game.sport)} {game.sport}
        </span>

        <span className="game-level">{game.level}</span>
      </div>

      <h2>{game.title}</h2>

      <div className="game-details">
        <p>📅 {new Date(game.date).toLocaleString()}</p>
        <p>📍 {game.location}</p>
      </div>

      <div className="game-footer">
        <span>{game.spotsLeft} spots left</span>

        <div className="game-actions">
          <button
            className="join-btn"
            onClick={() => onJoin(game)}
            disabled={isFull}
          >
            {isFull ? 'Game Full' : 'Join Game'}
          </button>

          <Link
            to={`/edit-game/${game.id}`}
            className="edit-btn"
          >
            Edit
          </Link>

          <button
            className="delete-btn"
            onClick={() => onDelete(game.id)}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  )
}

export default GameCard
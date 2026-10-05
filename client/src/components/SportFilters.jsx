const sports = [
  { name: 'All', icon: '' },
  { name: 'Football', icon: '⚽' },
  { name: 'Basketball', icon: '🏀' },
  { name: 'Tennis', icon: '🎾' },
  { name: 'Volleyball', icon: '🏐' },
  { name: 'Running', icon: '🏃' },
  { name: 'Ice Hockey', icon: '🏒' },
  { name: 'American Football', icon: '🏈' },
  { name: 'Rugby', icon: '🏉' },
  { name: 'Boxing', icon: '🥊' },
  { name: 'Swimming', icon: '🏊' },
  { name: 'Cycling', icon: '🚴' },
  { name: 'Fitness', icon: '🏋️' },
]

export const getSportIcon = (sportName) =>
  sports.find(({ name }) => name === sportName)?.icon || '🏅'

const SportFilters = ({ selectedSport, onSelectSport }) => {
  return (
    <div className="sport-filters">
      {sports.map(({ name, icon }) => (
        <button
          key={name}
          className={selectedSport === name ? 'active-filter' : ''}
          onClick={() => onSelectSport(name)}
        >
          {name === 'All' ? 'All Sports' : `${icon} ${name}`}
        </button>
      ))}
    </div>
  )
}

export default SportFilters
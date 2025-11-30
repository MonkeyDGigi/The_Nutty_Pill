const GamesPage = () => {
  const games = [
    {
      id: 1,
      title: 'Stake Duel',
      description: 'Challenge friends to high-stakes duels',
      status: 'coming soon'
    },
    {
      id: 2,
      title: 'Arcade Challenge',
      description: 'Classic arcade games with sat rewards',
      status: 'coming soon'
    },
    {
      id: 3,
      title: 'Tournaments',
      description: 'Compete in sat-backed tournaments',
      status: 'coming soon'
    },
    {
      id: 4,
      title: 'Lightning Games',
      description: 'Fast-paced games for quick sats',
      status: 'coming soon'
    }
  ];

  return (
    <div>
      <h1 className="page-title">🎮 Games Hub</h1>

      <div className="card-grid">
        {games.map(game => (
          <div key={game.id} className="card">
            <h3 className="card-title">{game.title}</h3>
            <p className="mb-2">{game.description}</p>
            <button
              className="btn btn-secondary"
              disabled
              style={{width: '100%'}}
            >
              {game.status}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GamesPage;



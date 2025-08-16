import React, { useState, useEffect } from 'react';

const PlayerStats = ({ games }) => {
  const [stats, setStats] = useState([]);

  useEffect(() => {
    fetch('/api/stats/players')
      .then(res => res.json())
      .then(data => setStats(data))
      .catch(err => console.error('Error fetching player stats:', err));
  }, [games]);

  return (
    <div>
      <h2>Player Stats</h2>
      <table style={{margin: 'auto'}}>
        <thead>
          <tr>
            <th>Player</th>
            <th>Wins</th>
            <th>Losses</th>
            <th>Total Games</th>
            <th>Win Rate</th>
          </tr>
        </thead>
        <tbody>
          {stats.sort((a, b) => b.winRate - a.winRate).map(player => (
            <tr key={player._id}>
              <td>{player.name}</td>
              <td>{player.wins}</td>
              <td>{player.losses}</td>
              <td>{player.totalGames}</td>
              <td>{player.winRate}%</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PlayerStats;

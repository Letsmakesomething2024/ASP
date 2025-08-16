import React, { useState, useEffect } from 'react';

const PartnerStats = ({ games }) => {
  const [stats, setStats] = useState([]);

  useEffect(() => {
    fetch('/api/stats/partners')
      .then(res => res.json())
      .then(data => setStats(data))
      .catch(err => console.error('Error fetching partner stats:', err));
  }, [games]);

  return (
    <div>
      <h2>Partner Stats</h2>
      <table style={{margin: 'auto'}}>
        <thead>
          <tr>
            <th>Partners</th>
            <th>Wins</th>
            <th>Losses</th>
            <th>Total Games</th>
            <th>Win Rate</th>
          </tr>
        </thead>
        <tbody>
          {stats.sort((a, b) => b.winRate - a.winRate).map((stat, index) => (
            <tr key={index}>
              <td>{stat.players.join(' & ')}</td>
              <td>{stat.wins}</td>
              <td>{stat.losses}</td>
              <td>{stat.totalGames}</td>
              <td>{stat.winRate}%</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PartnerStats;

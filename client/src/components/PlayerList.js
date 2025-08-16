import React from 'react';

const PlayerList = ({ players }) => {
  return (
    <div>
      <h2>Players</h2>
      <ul>
        {players.map(player => (
          <li key={player._id}>{player.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default PlayerList;

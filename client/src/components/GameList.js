import React from 'react';

const GameList = ({ games }) => {
  const getTeamNames = team => {
    if (!team || team.length === 0) {
      return 'N/A';
    }
    return team.map(player => player.name).join(' & ');
  };

  return (
    <div>
      <h2>Games</h2>
      <ul>
        {games.map(game => (
          <li key={game._id}>
            {getTeamNames(game.team1)} ({game.team1Score}) vs {getTeamNames(game.team2)} ({game.team2Score})
            <br />
            Winner: Team {game.winner}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GameList;

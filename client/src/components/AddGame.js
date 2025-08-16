import React, { useState } from 'react';

const AddGame = ({ addGame, players }) => {
  const [team1, setTeam1] = useState([]);
  const [team2, setTeam2] = useState([]);
  const [team1Score, setTeam1Score] = useState(0);
  const [team2Score, setTeam2Score] = useState(0);
  const [winner, setWinner] = useState(1);

  const onSelectChange = (e, setTeam) => {
    const { options } = e.target;
    const value = [];
    for (let i = 0, l = options.length; i < l; i++) {
      if (options[i].selected) {
        value.push(options[i].value);
      }
    }
    setTeam(value);
  }

  const onSubmit = e => {
    e.preventDefault();
    addGame({ team1, team2, team1Score, team2Score, winner });
    setTeam1([]);
    setTeam2([]);
    setTeam1Score(0);
    setTeam2Score(0);
    setWinner(1);
  };

  return (
    <form onSubmit={onSubmit}>
      <h2>Add Game</h2>
      <div>
        <label>Team 1</label>
        <select multiple={true} value={team1} onChange={e => onSelectChange(e, setTeam1)}>
          {players.map(player => (
            <option key={player._id} value={player._id}>{player.name}</option>
          ))}
        </select>
        <input type="number" placeholder="Score" value={team1Score} onChange={e => setTeam1Score(e.target.value)} />
      </div>
      <div>
        <label>Team 2</label>
        <select multiple={true} value={team2} onChange={e => onSelectChange(e, setTeam2)}>
          {players.map(player => (
            <option key={player._id} value={player._id}>{player.name}</option>
          ))}
        </select>
        <input type="number" placeholder="Score" value={team2Score} onChange={e => setTeam2Score(e.target.value)} />
      </div>
      <div>
        <label>Winner</label>
        <select value={winner} onChange={e => setWinner(e.target.value)}>
          <option value={1}>Team 1</option>
          <option value={2}>Team 2</option>
        </select>
      </div>
      <button type="submit">Add Game</button>
    </form>
  );
};

export default AddGame;

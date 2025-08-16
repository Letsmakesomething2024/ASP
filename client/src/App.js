import React, { Component } from 'react';
import PlayerList from './components/PlayerList';
import AddPlayer from './components/AddPlayer';
import GameList from './components/GameList';
import AddGame from './components/AddGame';
import PlayerStats from './components/PlayerStats';
import PartnerStats from './components/PartnerStats';
import './App.css';

class App extends Component {
  state = {
    players: [],
    games: []
  };

  componentDidMount() {
    this.getPlayers();
    this.getGames();
  }

  getPlayers = () => {
    fetch('/api/players')
      .then(res => res.json())
      .then(players => this.setState({ players }))
      .catch(err => console.error('Error fetching players:', err));
  };

  getGames = () => {
    fetch('/api/games')
      .then(res => res.json())
      .then(games => this.setState({ games }))
      .catch(err => console.error('Error fetching games:', err));
  };

  addPlayer = name => {
    fetch('/api/players', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name })
    })
      .then(res => res.json())
      .then(player => {
        this.getPlayers(); // Refresh player list to ensure consistency
      })
      .catch(err => console.error('Error adding player:', err));
  };

  addGame = newGame => {
    fetch('/api/games', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newGame)
    })
      .then(res => res.json())
      .then(game => {
        this.getGames(); // Refresh the games list
      })
      .catch(err => console.error('Error adding game:', err));
  };

  render() {
    return (
      <div className="App">
        <h1>Pickleball Tracker</h1>
        <div style={{display: 'flex', justifyContent: 'space-around', marginBottom: '20px'}}>
          <div>
            <h2>Players</h2>
            <AddPlayer addPlayer={this.addPlayer} />
            <PlayerList players={this.state.players} />
          </div>
          <div>
            <h2>Games</h2>
            <AddGame addGame={this.addGame} players={this.state.players} />
            <GameList games={this.state.games} />
          </div>
        </div>
        <hr />
        <div style={{display: 'flex', justifyContent: 'space-around'}}>
          <PlayerStats games={this.state.games}/>
          <PartnerStats games={this.state.games}/>
        </div>
      </div>
    );
  }
}

export default App;

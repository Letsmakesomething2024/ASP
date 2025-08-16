const express = require('express');
const router = express.Router();

// Player Model
const Player = require('../models/Player');
// Game Model
const Game = require('../models/Game');

// @route   GET /api/stats/players
// @desc    Get player statistics
// @access  Public
router.get('/players', async (req, res) => {
  try {
    const players = await Player.find();
    const games = await Game.find();

    const playerStats = players.map(player => {
      let wins = 0;
      let losses = 0;

      games.forEach(game => {
        const playerIsOnTeam1 = game.team1.some(p => p.equals(player._id));
        const playerIsOnTeam2 = game.team2.some(p => p.equals(player._id));

        if (playerIsOnTeam1) {
          if (game.winner === 1) {
            wins++;
          } else {
            losses++;
          }
        } else if (playerIsOnTeam2) {
          if (game.winner === 2) {
            wins++;
          } else {
            losses++;
          }
        }
      });

      const totalGames = wins + losses;
      const winRate = totalGames > 0 ? (wins / totalGames) * 100 : 0;

      return {
        _id: player._id,
        name: player.name,
        wins,
        losses,
        totalGames,
        winRate: winRate.toFixed(2)
      };
    });

    res.json(playerStats);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET /api/stats/partners
// @desc    Get partner statistics
// @access  Public
router.get('/partners', async (req, res) => {
  try {
    const games = await Game.find().populate('team1').populate('team2');
    const partnerStats = {};

    games.forEach(game => {
      const team1 = game.team1.map(p => p.id).sort();
      const team2 = game.team2.map(p => p.id).sort();

      if (team1.length === 2) {
        const key = team1.join('-');
        if (!partnerStats[key]) {
          partnerStats[key] = {
            players: game.team1.map(p => p.name),
            wins: 0,
            losses: 0
          };
        }
        if (game.winner === 1) {
          partnerStats[key].wins++;
        } else {
          partnerStats[key].losses++;
        }
      }

      if (team2.length === 2) {
        const key = team2.join('-');
        if (!partnerStats[key]) {
          partnerStats[key] = {
            players: game.team2.map(p => p.name),
            wins: 0,
            losses: 0
          };
        }
        if (game.winner === 2) {
          partnerStats[key].wins++;
        } else {
          partnerStats[key].losses++;
        }
      }
    });

    const statsArray = Object.values(partnerStats).map(stat => {
      const totalGames = stat.wins + stat.losses;
      const winRate = totalGames > 0 ? (stat.wins / totalGames) * 100 : 0;
      return { ...stat, totalGames, winRate: winRate.toFixed(2) };
    });

    res.json(statsArray);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;

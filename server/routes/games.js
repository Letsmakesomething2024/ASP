const express = require('express');
const router = express.Router();

// Game Model
const Game = require('../models/Game');

// @route   GET /api/games
// @desc    Get All Games
// @access  Public
router.get('/', (req, res) => {
  Game.find()
    .populate('team1')
    .populate('team2')
    .sort({ date: -1 })
    .then(games => res.json(games));
});

// @route   POST /api/games
// @desc    Create A Game
// @access  Public
router.post('/', (req, res) => {
  const newGame = new Game({
    team1: req.body.team1,
    team2: req.body.team2,
    winner: req.body.winner,
    team1Score: req.body.team1Score,
    team2Score: req.body.team2Score
  });

  newGame.save().then(game => res.json(game));
});

module.exports = router;

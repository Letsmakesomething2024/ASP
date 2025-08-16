const express = require('express');
const router = express.Router();

// Player Model
const Player = require('../models/Player');

// @route   GET /api/players
// @desc    Get All Players
// @access  Public
router.get('/', (req, res) => {
  Player.find()
    .sort({ name: 1 })
    .then(players => res.json(players));
});

// @route   POST /api/players
// @desc    Create A Player
// @access  Public
router.post('/', (req, res) => {
  const newPlayer = new Player({
    name: req.body.name
  });

  newPlayer.save().then(player => res.json(player));
});

module.exports = router;

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const GameSchema = new Schema({
  team1: [{
    type: Schema.Types.ObjectId,
    ref: 'Player'
  }],
  team2: [{
    type: Schema.Types.ObjectId,
    ref: 'Player'
  }],
  winner: {
    type: Number, // 1 for team1, 2 for team2
    required: true
  },
  team1Score: {
    type: Number
  },
  team2Score: {
    type: Number
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Game', GameSchema);

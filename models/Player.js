const mongoose = require('mongoose')

const playerSchema = new mongoose.Schema({
  name: { type: String, required: true, maxlength: 35 },
  brick: { type: Number, required: true, default: 0 },
  rock: { type: Number, required: true, default: 0 },
  wood: { type: Number, required: true, default: 0 },
  sheep: { type: Number, required: true, default: 0 },
  grain: { type: Number, required: true, default: 0 }
}, 
{ 
  timestamps: true 
})

module.exports = mongoose.model('Player', playerSchema)

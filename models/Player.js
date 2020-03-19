const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const playerSchema = new mongoose.Schema({
  name: { type: String, required: true, maxlength: 35, unique: true },
  brick: { type: Number, required: true, default: 0 },
  rock: { type: Number, required: true, default: 0 },
  wood: { type: Number, required: true, default: 0 },
  sheep: { type: Number, required: true, default: 0 },
  grain: { type: Number, required: true, default: 0 }
}, 
{ 
  timestamps: true 
})
playerSchema.plugin(uniqueValidator)


module.exports = mongoose.model('Player', playerSchema)

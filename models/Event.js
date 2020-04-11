const mongoose = require('mongoose')

const eventSchema = new mongoose.Schema({
  name: { type: String, required: true },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'Player', required: true }
}, 
{ 
  timestamps: true 
})


module.exports = mongoose.model('Event', eventSchema)

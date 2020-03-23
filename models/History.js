const mongoose = require('mongoose')

const historySchema = new mongoose.Schema({
  text: { type: String, required: true },
  type: { type: String, required: true, maxlength: 10 }
}, 
{ 
  timestamps: true 
})


module.exports = mongoose.model('History', historySchema)

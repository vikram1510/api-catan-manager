const Player = require('../models/Player')

function create(req, res){
  Player.create(req.body)
    .then(player => res.json(player))
    .catch(err => res.status(400).json(err))
} 

function index(req, res){
  const { name } =  req.query
  const findPlayer = name ? Player.find({ name }) : Player.find()
  
  findPlayer
    .then(players => res.json(players))
    .catch(err => res.status(400).json(err))
}

function update(req, res){
  Player
    .findById(req.params.id)
    .then(player => player.set(req.body))
    .then(player => player.save())
    .then(player => res.json(player))
    .catch(err => res.status(400).json(err))
}

function remove(req, res){
  Player
    .findById(req.params.id)
    .then(player => player.remove())
    .then(() => res.sendStatus(204))
    .catch(err => res.status(400).json(err))
}

function show(req, res) {
  Player.findById(req.params.id)
    .then(player => res.json(player))
    .catch(err => res.status(404).json(err))
}

async function transaction(req, res){

  const { amounts, fromId, toId } = req.body

  const decAmounts = Object.keys(amounts).reduce((final, resource) => {
    final[resource] = amounts[resource] * -1
    return final
  }, {})

  await Player.findOneAndUpdate({ _id: fromId },{ $inc: { ...decAmounts } } )
  await Player.findOneAndUpdate({ _id: toId },{ $inc: { ...amounts } } )
  
  return res.json({ message: 'Transaction successfull' })

}

async function bank(req, res){

  const { playerId, amounts } = req.body

  const updatedPlayer = await Player.findOneAndUpdate({ _id: playerId },{ $inc: { ...amounts } }, { new: true } )

  res.json(updatedPlayer)

}

module.exports = { create, index, update, remove, show, transaction, bank }

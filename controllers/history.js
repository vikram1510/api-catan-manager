const Player = require('../models/History')

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

function remove(req, res){
  Player
    .findById(req.params.id)
    .then(player => player.remove())
    .then(() => res.sendStatus(204))
    .catch(err => res.status(400).json(err))
}


module.exports = { create, index, remove }
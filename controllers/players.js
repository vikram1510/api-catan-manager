const Player = require('../models/Player')

function create(req, res){
  Player.create(req.body)
    .then(player => res.json(player))
    .catch(err => res.status(400).json(err))
}

function index(_, res){
  Player.find()
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

module.exports = { create, index, update, remove }

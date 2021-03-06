const History = require('../models/History')

function create(req, res){
  History.create(req.body)
    .then(event => res.json(event))
    .catch(err => res.status(400).json(err))
}

function index(req, res){

  
  History.find().sort(('-createdAt'))
    .then(events => res.json(events))
    .catch(err => res.status(400).json(err))
}

function remove(req, res){
  History.deleteMany({})
    .then(() => res.sendStatus(204))
    .catch(err => res.status(400).json(err))
}


module.exports = { create, index, remove }

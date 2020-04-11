const Event = require('../models/Event')

function create(req, res){
  Event.create(req.body)
    .then(event => res.json(event))
    .catch(err => res.status(400).json(err))
}

function index(req, res){
  Event.find().sort(('createdAt'))
    .populate('createdBy')
    .then(events => res.json(events))
    .catch(err => res.status(400).json(err))
}

function remove(req, res){
  Event.deleteMany({})
    .then(() => res.sendStatus(204))
    .catch(err => res.status(400).json(err))
}


module.exports = { create, index, remove }

const Resource = require('../models/Resource')

function create(req, res){
  Resource.create(req.body)
    .then(resource => res.json(resource))
    .catch(err => res.status(400).json(err))
}

function index(_, res){
  Resource.find()
    .then(resources => res.json(resources))
    .catch(err => res.status(400).json(err))
}

module.exports = { create, index }

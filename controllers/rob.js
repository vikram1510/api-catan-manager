const sheets = require('../sheets/googleSheets')

function append(req, res) {
  console.log(req.body)
  sheets.appendValues(req.body)
    .then(result => res.json(result))
    .catch(err => res.status(400).json(err))
}

module.exports = { append }
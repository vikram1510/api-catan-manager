
const express = require('express')

const app = express()

const cors = require('cors')

const mongoose = require('mongoose')

const bodyParser = require('body-parser')

const dbURI = process.env.MONGODB_URI || 'mongodb://localhost/catan'

const port = process.env.PORT || 3030

const players = require('./controllers/players')

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true },
  () => console.log('Mongo is connected'))

app.use(cors({ origin: '*' }))

app.use(bodyParser.json())

app.get('/players', players.index)

app.post('/players', players.create)

app.put('/players/:id', players.update)

app.delete('/players/:id', players.remove)

app.get('/players/:id', players.show)

app.get('/', (_, res) => {
  res.send('hello')
})

app.listen(port, () => console.log(`listening on ${port}`))

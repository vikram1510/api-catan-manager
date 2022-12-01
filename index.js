const express = require("express");

const app = express();

const cors = require("cors");

const mongoose = require("mongoose");

const bodyParser = require("body-parser");

const dbURI = process.env.MONGODB_URI || "mongodb://localhost/catan";

const port = process.env.PORT || 3030;

const players = require("./controllers/players");

const history = require("./controllers/history");

const events = require("./controllers/events");
const rob = require("./controllers/rob");

mongoose.connect(
  dbURI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  },
  () => console.log("Mongo is connected")
);

app.use(cors({ origin: "*" }));

console.log("lol");
app.use(bodyParser.json());

// Players

app.get("/players", players.index);

app.post("/players", players.create);

app.put("/players/:id", players.update);

app.delete("/players/:id", players.remove);

app.get("/players/:id", players.show);

app.post("/players/transaction", players.transaction);

app.post("/players/bank", players.bank);

// History

app.get("/history", history.index);

app.post("/history", history.create);

app.delete("/history", history.remove);

// -----

// Events

app.get("/events", events.index);

app.post("/events", events.create);

app.delete("/events", events.remove);

// -----

// Sheets

app.post("/rob", rob.append);

app.get("/", (_, res) => {
  res.send("hello");
});

app.listen(port, () => console.log(`listening on ${port}`));

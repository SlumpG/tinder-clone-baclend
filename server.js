const express = require("express");
const mongoose = require("mongoose");
const cors = require('cors')
const Cards = require("./dbCards");
//app config
const app = express();
const PORT = process.env.PORT || 5000;
const mongoDB =
  "mongodb+srv://gagu:gagu123456@cluster0.irjem.mongodb.net/tinderDB?retryWrites=true&w=majority";

//MiddleWares
app.use(express.json())
app.use(cors())

//DB config
mongoose.connect(mongoDB, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});

//API Endpoints
app.get("/", (req, res) => {
  res.status(200).send("sup!");
});

app.post("/tinder/cards", (req, res) => {
  const dbCard = req.body;

  Cards.create(dbCard, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(201).send(data);
    }
  });
});

app.get("/tinder/cards", (req, res) => {
  Cards.find((err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(data);
    }
  });
});

//listener
app.listen(PORT, () => {
  console.log(`server is live on ${PORT}`);
});

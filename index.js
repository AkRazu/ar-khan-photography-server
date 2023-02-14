const express = require("express");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 5000;
require("dotenv").config();

// Middle Wares
app.use(cors());
app.use(express.json());

// Db connection string
const { MongoClient, ServerApiVersion } = require("mongodb");
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.hb0lx3c.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});


// server default port
app.get("/", (req, res) => {
  res.send("Ar khan photography server !");
});
// server listen run port
app.listen(port, () => {
  console.log(`Ar khan photography server run at http://localhost:${port}`);
});

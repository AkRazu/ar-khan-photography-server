const express = require("express");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 5000;
require("dotenv").config();

// Middle Wares
app.use(cors());
app.use(express.json());

// Db connection string
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.hb0lx3c.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});
async function run() {
  try {
    const servicesDatabase = client.db("client_services").collection("service");
    const worksDatabase = client.db("client_services").collection("works");

    app.get("/service", async (req, res) => {
      const query = {};
      const cursor = servicesDatabase.find(query);
      const result = await cursor.toArray();
      res.send(result);
    });
    app.get("/service/:id", async (req, res) => {
      const id = req.params.id;
      const query = {_id: new ObjectId(id)}
      const result = await servicesDatabase.findOne(query);
      res.send(result);
    });

    app.get("/works", async (req, res) => {
      const query = {};
      const cursor = worksDatabase.find(query);
      const result = await cursor.toArray();
      res.send(result);
    });

  } finally {
  }
}
run().catch((err) => console.log(err));
// server default port
app.get("/", (req, res) => {
  res.send("Ar khan photography server !");
});
// server listen run port
app.listen(port, () => {
  console.log(`Ar khan photography server run at http://localhost:${port}`);
});

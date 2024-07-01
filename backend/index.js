const express = require('express');
const cors = require('cors');
const {MongoClient, ServerApiVersion} = require('mongodb');

const app = express();
const port = process.env.PORT || 4000

app.use(cors());
app.use(express.json());

const uri = "mongodb+srv://abhangparth:ParthTwitter@twitter.v1bgbkh.mongodb.net/Twitter?retryWrites=true&w=majority&appName=Twitter";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("Twitter").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);

app.get('/', (req, res) => {
  res.send('Hello World from twitter!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
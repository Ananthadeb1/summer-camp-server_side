const express = require('express');
const app = express();
require('dotenv').config()
const cors = require('cors');
const port = process.env.PORT || 5000;


// middleware
app.use(cors());
app.use(express.json());


const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.zcvxptr.mongodb.net/?retryWrites=true&w=majority`;

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
    // await client.connect();


    const classesCollection = client.db("schoolDb").collection("classes");
    const extraCollection = client.db("schoolDb").collection("extra");
    const instructorsCollection = client.db("schoolDb").collection("instructors");
    const usersCollection = client.db("schoolDb").collection("users");
    const cartsCollection = client.db("schoolDb").collection("carts");


    //user
    app.post('/users', async (req, res) => {
        console.log('Received POST request at /users');
  console.log('Request body:', req.body);

        const user = req.body;
         const query = { email: user.email }
        const existingUser = await usersCollection.findOne(query);
  
        if (existingUser) {
          return res.send({ message: 'user already exists' })
        }
  
        const result = await usersCollection.insertOne(user);
        console.log('User inserted:', result);
        res.send(result);
      });

      app.get('/users', async (req, res) => {
        const result = await usersCollection.find().toArray();
        res.send(result);
      })

      
    // app.get('/classes/:id', async (req, res) => {
    //     const result = await classesCollection.find().toArray();
    //     res.send(result);
    //   })

    //   app.post('/classes', async (req, res) => {
    //     const item = req.body;
    //     const result = await classesCollection.insertOne(item);
    //     res.send(result);
    //   })

    //   app.delete('/classes/:id', async (req, res) => {
    //     const id = req.params.id;
    //     const query = { _id: new ObjectId(id) };
    //     const result = await classesCollection.deleteOne(query);
    //     res.send(result);
    //   })

    
  


    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);


app.get('/', (req, res) => {
    res.send('school Camp ')
})


app.listen(port, () => {
    console.log(`Summer School Camp is coming soon on port: ${port}`)
})
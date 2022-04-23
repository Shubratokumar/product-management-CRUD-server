// Server for Product Management system
const express = require("express");
const { MongoClient, ServerApiVersion } = require('mongodb');
const app = express();
require('dotenv').config()
const cors = require("cors")
const port = process.env.PORT || 5000;

// middleware 
app.use(cors())
app.use(express.json())

// Database set-up
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.0a811.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

// test the environment variable, it's working or not
// console.log(process.env) // remove this after you've confirmed it working

// Intigration of sever, client and database with async function
async function run() {
    try {
      await client.connect();
      const productCollection = client.db("productManagement").collection("product");

        //  creating API's
        // GET : Load data to server from the server
        app.get('/product', async(req,res)=>{
            const query = {};
            const cursor = productCollection.find(query);
            const products = await cursor.toArray();
            res.send(products);
        })
        // POST : post to DB
        /* app.post('/product', async(req,res)=>{
            const product = {
                name: "Redmi Note 10",
                price: 999,
                quantity : 2
            }
            const result = await productCollection.insertOne(product);
            res.send(result)
        }) */



    } finally {
    //   await client.close();
    }
  }
  run().catch(console.dir);


// server test
app.get('/', (req, res)=>{
    res.send("Server is running successfully!!!")
})

// Listening the port
app.listen(port, ()=>{
    console.log("Product Management server is running under the port :", port);
})
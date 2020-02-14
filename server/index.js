//Basic requirements
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express(); //Initialize express

//Mongo Atlas requirements
const mongoclient = require('mongodb').MongoClient;
const mongoose = require('mongoose');
const morgan = require('morgan');
const path = require('path');
const objectid = require('mongodb').ObjectID;
const uri = "mongodb+srv://<username>:<password>@cluster0-pf0b2.mongodb.net/test?retryWrites=true&w=majority";
const userModel = require('./user-schema');

//Middleware and CORS
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use(express.static(path.join(__dirname, '..', 'public' )))

app.use(cors())







//Start server port 8000
var database, collection;
const port = process.env.PORT || 8000;
app.listen(port, () => {
    mongoclient.connect(uri, { useNewUrlParser: true }, (error, client) => {
        if (error) {
            throw error;
        }
        database = client.db('memestagram');
        collection = database.collection('users');
        console.log('Connected to database: memestagram!');
    })
    console.log(`Listening on ${port}`);
});

app.use(morgan("tiny"));

//Default path
app.get('/', (req, res) => {
    res.send('Hello World!')
})
//Create a user path and accept user details (follows user)
app.post("/api/user", (request, response) => {
    const User = new userModel(request.body)
    collection.insertOne(User, (error, result) => {
        if (error) {
            return response.status(500).send(error);
        }
        response.send(User);
        console.log(`New user created with the following id: ${result.insertedId}`);
    });
});

//Search for users
app.get("/api/users", (request, response) => {
    collection.find({}).toArray((error, result) => {
        if (error) {
            return response.status(500).send(error);
        }
        response.send(result);
    });
});

//Search for users
app.get("/api", (request, response) => {
    const data = {
        username: "username",
    }
        response.send(data);
});
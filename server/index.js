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
    database = client.db("memestagram");
    collection = database.collection("users");
    console.log("Connected to database: memestagram!");
  });
  console.log(`Listening on ${port}`);
});

app.use(morgan("tiny"));

//Default path
app.get("/", (req, res) => {
  res.send("Hello World!");
});

//Create a user for sign up
app.post("/signup", (request, response) => {
  const User = new userModel(request.body);
  collection.insertOne(User, (error, result) => {
    if (error) {
      return response.status(500).send(error);
    }
    console.log(`New user created with the following id: ${result.insertedId}`);
    response.status(200).send();
  });
});

//Check if a user exists for sign in, and then start a session
app.post("/login", (request, response) => {
  var username = request.body.username;
  var password = request.body.password;
  collection
    .findOne({ username: username, password: password })
    .then(user => {
      if (!user) {
        console.log("Matching Account not found");
        return response.status(404).send("Matching Account not found");
      } else {
        request.session.user = user;
        console.log("Matching Account found");
        return response.status(200).send("Matching Account found");
      }
    })
    .catch(err => console.error(`Failed to find document: ${err}`));
});

//Create a dashboard that is only available if a session exists (aka user is signed in)
app.get("/home", (request, response) => {
  if (!request.session.user) {
    return response.status(401).send();
  } else {
    return response.status(200).send("User granted access to home");
  }
});

//Search for users
app.get("/search/:users", (request, response) => {
  collection
    .find({ username: request.params.users })
    .toArray((error, result) => {
      if (error) {
        return response.status(500).send(error);
      }
      return result;
    });
});

//Search for users
app.get("/api", (request, response) => {
    const data = {
        username: "username",
    }
        response.send(data);
});

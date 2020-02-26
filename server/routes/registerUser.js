var express = require("express");
var router = express.Router();
var client = require("../database/connection");
var userModel = require("../models/user-schema");

/**
 * If a request is received, use MongoDB's insertOne
 * function to create a new user. If an error occurs, false is
 * returned. Otherwise, return true to the router call.
 * @param {*} client
 * @param {*} user
 */
async function createUser(client, user) {
  result = await client
    .db("memestagram")
    .collection("users")
    .insertOne(user, (error, result) => {
      if (error) {
        return false;
      }
      console.log(
        `New user successfully created. User ID: ${result.insertedId}`
      );
      return true;
    });
}

//Wait for POST request to /register/. Response is returned
//in JSON format.
router.post("/", function(req, res, next) {
  try {
    console.log("Received user registration request.");
    const User = new userModel(req.body);
    createUser(client, User).then(result => {
      console.log("User successfully created.");
      if (result) {
        res.status(200).send();
      } else {
        res.status(500).send();
      }
    });
  } catch (error) {
    return next(error);
  }
});

module.exports = router;

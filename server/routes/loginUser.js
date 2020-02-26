var express = require("express");
var router = express.Router();
var client = require("../database/connection");

/**
 * This function currently returns true or false, based on whether or not
 * a user with a username/password that matches the database exists. This boolean
 * response is used by the router to send a status 404 (false) or status 200 (true) response.
 * Authentication will need to be added to hash passwords and likely create a cookie session.
 * @param {*} client
 * @param {*} user
 */
async function loginUser(client, user) {
  result = await client
    .db("memestagram")
    .collection("users")
    .findOne({ username: user.username, password: user.password })
    .then(user => {
      if (!user) {
        console.log("404: User was not found in database.");
        return false;
      } else {
        console.log("200: User found in database.");
        return true;
      }
    });
}

//Wait for POST request to /login/. Response is returned
//in JSON format.
router.post("/", function(req, res) {
  try {
    console.log("Received login request");
    loginUser(client, {
      username: req.body.username,
      password: req.body.password
    }).then(result => {
      if (result == false) {
        res.status(404).send();
      } else {
        res.status(200).send();
      }
    });
  } catch (error) {
    return next(error);
  }
});

module.exports = router;

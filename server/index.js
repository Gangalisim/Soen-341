//Initializing express, middleware, and CORS
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const session = require("express-session");
const app = express();

//Loading middleware and CORS
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use(
  session({ secret: "secretstring", resave: false, saveUninitialized: true })
);

//Loading router modules
var login = require("./routes/loginUser");
app.use("/login", login);
var register = require("./routes/registerUser");
app.use("/register", register);
var search = require("./routes/searchUser");
app.use("/search", search);

//Listen on Port 8000
const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`Listening on ${port}`);
});

app.use(morgan("tiny"));

//Default path
app.get("/", (req, res) => {
  res.send("Hello World!");
});

const express = require("express");
const todocontroller = require("./controllers/todocontroller");

const app = express();

// Set up template engine
app.set("view engine", "ejs");

// Static files
app.use(express.static("./public"));

// fire controllers
todocontroller(app);

// listen to port
app.listen(3000);
console.log("You are listening to port 3000");

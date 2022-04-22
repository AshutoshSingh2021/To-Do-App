var bodyParser = require("body-parser");
var mongoose = require("mongoose");

// Connect to the database
mongoose.connect(
  "mongodb+srv://Prince:Singh2022@cluster0.23s99.mongodb.net/Todo?retryWrites=true&w=majority"
);

// Create a schema - this is like a blueprint
var todoSchema = new mongoose.Schema({
  item: String,
});

var Todo = mongoose.model("Todo", todoSchema);

// var data = [
//   { item: "workout" },
//   { item: "Read some books" },
//   { item: "Kick some coding ass" },
//   { item: "hustel for earning money" },
// ];
var urlencodedParser = bodyParser.urlencoded({ extended: false });

module.exports = function (app) {
  app.get("/todo", function (req, res) {
    // get data from mongodb and pass it to view
    Todo.find({}, function (err, data) {
      if (err) throw err;
      res.render("todo", { todos: data });
    });
  });

  app.post("/todo", urlencodedParser, function (req, res) {
    // get data from the view and add it to the mongodb
    var newTodo = Todo(req.body).save(function (err, data) {
      if (err) throw err;
      res.json(data);
    });
  });

  app.delete("/todo/:item", function (req, res) {
    // delete the requested item from mongodb
    Todo.find({ item: req.params.item.replace(/\-/g, " ") }).remove(function (
      err,
      data
    ) {
      if (err) throw err;
      res.json(data);
    });
  });
};

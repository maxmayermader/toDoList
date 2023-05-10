const express = require('express');
const mongoose = require('mongoose');
const { MongoClient } = require('mongodb');
const cors = require('cors');

// var fs = require("fs");


const app = express();


app.use(express.json());
app.use(cors());

mongoose.connect("mongodb://127.0.0.1:27017/reactdata", {
  dbName: "reactdata",
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log("Connected to DB")).catch(console.error);

const Todo = require('./models/Todo');

app.get('/todos', async (req, res) => {
    const todos = await Todo.find;

    res.json(todo);
})

app.post('/todo/new', (req, res) => {
    const todo = new Todo({
        text: req.body.text
    });

    todo.save();

    res.json(todo);
})

app.delete('/todo/delete/:id', async (req, res) => {
    const result = await Todo.findByIdAndDelete(req.params.id);

    res.json(result);
})

app.put('/todo/complete/:id', async (req, res) => {
    const todo = await Todo.findById(req.params.id);

    todo.complete = !todo.complete;

    todo.save();

    res.json(todo);
})

//app.listen(3001, () => console.log("Server started on port 3001"));

const port = process.env.PORT || 4000;
const host = "localhost";
app.listen(port, () => {
  console.log(`App listening at http://%s:%s`, host, port);
});


// var express = require("express");
// var cors = require("cors");
// var app = express();
// var fs = require("fs");
// const { MongoClient } = require("mongodb");

// // Mongo
// const url = "mongodb://127.0.0.1:27017";
// const dbName = "react_data";
// const client = new MongoClient(url);
// const db = client.db(dbName);

// var bodyParser = require("body-parser");

// app.use(cors());
// app.use(bodyParser.json());

// const port = "8081";
// const host = "localhost";

// app.get("/listUsers", async (req, res) => {
//   await client.connect();
//   console.log("Node connected successfully to GET MongoDB");
//   const query = {};
//   const results = await db
//     .collection("users_edu")
//     .find(query)
//     .limit(100)
//     .toArray();
//   console.log(results);
//   res.status(200);
//   res.send(results);
// });
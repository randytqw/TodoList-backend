'use strict';

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Task = require("./Task");
const bodyParser = require('body-parser');
const cors = require("cors");
const allowedOrigins = [
    "http://localhost:8080",
];
const serverless = require('serverless-http');

dotenv.config();

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
    cors({
      origin: function(origin, callback) {
        // allow requests with no origin
        // (like mobile apps or curl requests)
        if (!origin) return callback(null, true);
        if (allowedOrigins.indexOf(origin) === -1) {
          var msg =
            "The CORS policy for this site does not " +
            "allow access from the specified Origin.";
          return callback(new Error(msg), false);
        }
        return callback(null, true);
      },
    })
  );


//connection to db
mongoose.set("useFindAndModify", false);
mongoose.connect("mongodb+srv://test:test@cluster0.3irni.mongodb.net/<test>?retryWrites=true&w=majority", { useNewUrlParser: true });

//POST METHOD
app.post('/task',  (req, res) => {
    const task = new Task({
        content: req.body.content
    });
    console.log(req.body);
    task.save().then((task) => {res.send(task)}).catch((error)=>{res.json(error)})
});

app.get('/hello', async function (req, res) {
  res.json({
      result: 'Hello, World!',
  });
  return;
});

app.get("/", (req, res) => {
    res.json({body: "test"});
});
// GET METHOD
app.get("/tasks", (req, res) => {
    Task.find({}, (err, tasks) => {
        res.json(tasks);
        console.log("test");
    }).catch(error=>{res.json(error)});
});

app.delete("/deleteAll", (req, res) => {
    console.log('delete all');
    Task.deleteMany({}, (err, tasks) => {
        res.json(tasks);
    });
});

app.delete("/delete/:id", (req, res) => {
    Task.deleteOne({"_id": req.params.id}, (err, tasks) => {
        console.log(req.params.id);
        res.json(tasks);
        console.log("testdel");
    }).catch(error=>{res.json(error)});
});
app.put('/edit/:id',  (req, res) => {
    console.log(req.body);
    Task.updateOne({"_id": req.params.id}, {"content": req.body.content}).then((response)=>{
        res.json(response);
        console.log(req.body);
    }).catch((error)=>{
        res.json(error);
    })
});

module.exports = {
  app,
  hello: serverless(app),
};

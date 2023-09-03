'use strict';
const express = require('express');
const mongoose = require('mongoose');
const app = express();

//routes
app.get('/', (req, res) => {
  res.send('Hello Node API!');
});

app.get('/blog', (req, res) => {
  res.send('Hello from Blog! Hooray!!');
});

mongoose.set("strictQuery", false);

mongoose
.connect('mongodb+srv://admin:fuckoff1234@smapi.gzeh2ff.mongodb.net/Node-API?retryWrites=true&w=majority')
.then(() => {
  app.listen(3000, () => {
    console.log('Node app is running on port 3000.');
  });
}).catch((error) => {
  console.log(error);
});
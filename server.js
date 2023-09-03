'use strict';
const express = require('express');
const mongoose = require('mongoose');
const Product = require('./models/productModels');
const app = express();

//middleware
app.use(express.json());

//routes
app.get('/', (req, res) => {
  res.send('Hello Node API!');
});

app.get('/blog', (req, res) => {
  res.send('Hello from Blog! Hooray!!');
});

app.post('/product', async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(200).json(product);
    // console.log(req.body);
    // res.send(req.body);

  } catch (error) {
    console.log(error.message);
    res.status(500).json({message: error.message});
  }
});

//db
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
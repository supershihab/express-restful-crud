'use strict';
const express = require('express');
const mongoose = require('mongoose');
const Product = require('./models/productModels');
const app = express();

//middleware
app.use(express.json());
app.use(express.urlencoded({extended: false}));

//routes
app.get('/', (req, res) => {
  res.send('Hello Node API!');
});

app.get('/blog', (req, res) => {
  res.send('Hello from Blog! Hooray!!');
});

app.get('/products', async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json(products);

  } catch (error) {
    console.log(error.message);
    res.status(500).json({message: error.message});
  }
});

app.get('/products/:id', async (req, res) => {
  try {
    const {id} = req.params;
    const product = await Product.findById(id);
    res.status(200).json(product);

  } catch (error) {
    console.log(error.message);
    res.status(500).json({message: error.message});
  }
});

app.put('/products/:id', async (req, res) => {
  try {
    const {id} = req.params;
    const product = await Product.findByIdAndUpdate(id, req.body);
    //can't find any product in database
    if (!product) {
      return res.status(404).json({message: `Can not find any product by ID ${id}.`});
    }
    const updatedProduct = await Product.findById(id);
    res.status(200).json(updatedProduct);

  } catch (error) {
    console.log(error.message);
    res.status(500).json(error.message);
  }
});

app.delete('/products/:id', async (req, res) => {
  try {
    const {id} = req.params;
    const product = await Product.findByIdAndDelete(id);
    if (!product) {
      return res.status(404).json({message: `Can not find any product by ID ${id}.`});
    }
    res.status(200).json(product);

  } catch (error) {
    console.log(error.message);
    res.status(500).json(error.message);
  }
});

app.post('/products', async (req, res) => {
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
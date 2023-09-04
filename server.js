'use strict';
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const productRoute = require('./routes/productRoute');
const errorMiddleware = require('./middleware/errorMiddleware');

const app = express();

const MONGO_URL = process.env.MONGO_URL;
const PORT = process.env.PORT || 3000;

//middleware - specify json middleware and form data middleware
app.use(express.json());
app.use(express.urlencoded({extended: false}));

//routes

app.use('/api/products', productRoute);
app.use(errorMiddleware);

app.get('/', (req, res) => {
  throw new Error('Fake Error');
  res.send('Hello Node API!');
});

//routes - test route
app.get('/blog', (req, res) => {
  res.send('Hello from Blog! Hooray!!');
});


//db
mongoose.set("strictQuery", false);

mongoose
.connect(MONGO_URL)
.then(() => {
  app.listen(PORT, () => {
    console.log(`Node app is running on port ${PORT}.`);
  });
}).catch((error) => {
  console.log(error);
});
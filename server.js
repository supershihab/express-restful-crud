'use strict';
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const productRoute = require('./routes/productRoute');
const errorMiddleware = require('./middleware/errorMiddleware');
const cors = require('cors');

const app = express();

const MONGO_URL = process.env.MONGO_URL;
const PORT = process.env.PORT || 3000;

// const corsOptions = {
//   origin: 'http://example.com',
//   optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
// }

//middleware - specify json middleware and form data middleware
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cors());
// app.use(cors(corsOptions));

//routes
app.use('/api/products', productRoute);
app.use(errorMiddleware);

app.get('/', (req, res) => {
  //checking out the error middleware
  // throw new Error('Fake Error');
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
'use strict';
const express = require('express');
const Product = require('../models/productModels');
const {getProducts, getSingleProduct, updateProduct, deleteProduct, createProduct} = require('../controllers/productController');
const router = express.Router();

//routes - find all product
router.get('/', getProducts);

//routes - find a single product
router.get('/:id', getSingleProduct);

//routes - update a single product
router.put('/:id', updateProduct);

//routes - delete a single product
router.delete('/:id', deleteProduct);

	//routes - create a product
router.post('/', createProduct);


module.exports = router;

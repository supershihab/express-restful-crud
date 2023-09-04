'use strict';
const express = require('express');
const Product = require('../models/productModels');
const router = express.Router();

//routes - find all product
router.get('/', async (req, res) => {
	try {
		const products = await Product.find({});
		res.status(200).json(products);

	} catch (error) {
		console.log(error.message);
		res.status(500).json({message: error.message});
	}
});

//routes - find a single product
router.get('/:id', async (req, res) => {
	try {
		const {id} = req.params;
		const product = await Product.findById(id);
		res.status(200).json(product);

	} catch (error) {
		console.log(error.message);
		res.status(500).json({message: error.message});
	}
});

//routes - update a single product
router.put('/:id', async (req, res) => {
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

//routes - delete a single product
router.delete('/:id', async (req, res) => {
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

	//routes - create a product
	router.post('/', async (req, res) => {
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


module.exports = router;

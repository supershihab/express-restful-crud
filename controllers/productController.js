'use strict';
const Product = require('../models/productModels');
const asyncHandler = require('express-async-handler')


const getProducts = asyncHandler(async (req, res) => {
	try {
		const products = await Product.find({});
		res.status(200).json(products);

	} catch (error) {
		res.status(500);
		throw new Error(error.message);
	}
});

const getSingleProduct = asyncHandler(async (req, res) => {
	try {
		const {id} = req.params;
		const product = await Product.findById(id);
		res.status(200).json(product);

	} catch (error) {
		res.status(500);
		throw new Error(error.message);
	}
});

const updateProduct = asyncHandler(async (req, res) => {
	try {
		const {id} = req.params;
		const product = await Product.findByIdAndUpdate(id, req.body);
		//can't find any product in database
		if (!product) {
			res.status(404);
			throw new Error(`cannot find any product with ID ${id}`);

		}
		const updatedProduct = await Product.findById(id);
		res.status(200).json(updatedProduct);

	} catch (error) {
		res.status(500);
		throw new Error(error.message);
	}
});

const deleteProduct = asyncHandler(async (req, res) => {
	try {
		const {id} = req.params;
		const product = await Product.findByIdAndDelete(id);
		if (!product) {
			res.status(404);
			throw new Error(`Can't find any product with ID ${id}`);
		}
		res.status(200).json(product);

	} catch (error) {
		res.status(500);
		throw new Error(error.message);
	}
});

const createProduct = asyncHandler(async (req, res) => {
    try {
        const product = await Product.create(req.body);
        res.status(200).json(product);
        // console.log(req.body);
        // res.send(req.body);

    } catch (error) {
		res.status(500);
		throw new Error(error.message);
    }
});

module.exports = {getProducts, getSingleProduct, updateProduct, deleteProduct, createProduct};
'use strict';
const Product = require('../models/productModels');

const getProducts = async (req, res) => {
	try {
		const products = await Product.find({});
		res.status(200).json(products);

	} catch (error) {
		console.log(error.message);
		res.status(500).json({message: error.message});
	}
};

const getSingleProduct = async (req, res) => {
	try {
		const {id} = req.params;
		const product = await Product.findById(id);
		res.status(200).json(product);

	} catch (error) {
		console.log(error.message);
		res.status(500).json({message: error.message});
	}
};

const updateProduct = async (req, res) => {
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
};

const deleteProduct = async (req, res) => {
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
};

const createProduct = async (req, res) => {
    try {
        const product = await Product.create(req.body);
        res.status(200).json(product);
        // console.log(req.body);
        // res.send(req.body);

    } catch (error) {
        console.log(error.message);
        res.status(500).json({message: error.message});
    }
};

module.exports = {getProducts, getSingleProduct, updateProduct, deleteProduct, createProduct};
const { mongoose } = require('mongoose');
const Product = require('../model/Product')

// Get all products
const product_all = async (req, res) => { 
    try {
        console.log('products==>',req.query)
        const products = await Product.find();
        console.log('products==>',products)
        res.json(products)
    } catch (error) {
        res.json({ message:error })
    }
};

// Get Single product
const product_details = async (req, res) => { 
    try {
        console.log("get single product",req.params)
        const singleProduct = await Product.findOne({_id:req.params.productId})
        res.json(singleProduct)
    } catch (error) {
        res.json({ message:error })
    }
};

// Add New product
const product_create = async (req, res) => { 
    console.log(req.body)
    const {title,image,price,details} = req.body
    try {
        const savedProduct = await Product({title,image,price,details}).save();
        console.log('savedProduct',savedProduct)
        res.json(savedProduct);
    } catch (error) {
        console.log('error==?',error)
        res.status(400).send(error)
    }
};

// Update product
const product_update = async (req, res) => {
    try {
        const {title,price,image,details}=req.body;
        // const product = {
        //     title: req.body.title,
        //     price: req.body.price,
        //     image: req.body.image,
        //     details: req.body.details
        // };
        const updateProduct = await Product.findByIdAndUpdate(
            { _id: req.params.productId },
            {title,price,image,details}
        );
        res.json(updateProduct);
    } catch (error) {
        res.json({ message:error })
    }
 };

// Delete product
const product_delete = async (req, res) => { 
    try {
        const deletedProduct = Product.findByIdAndDelete(req.params.productId)
        res.json(deletedProduct)
    } catch (error) {
        res.json({ message: error })
    }
};

module.exports = {
    product_all,
    product_details,
    product_create,
    product_update,
    product_delete
}
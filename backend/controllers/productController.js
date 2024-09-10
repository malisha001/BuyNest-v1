const Product = require('../models/productModel');

//get all products
const getProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
      } catch (error) {
        res.status(500).json({ error: 'Failed to fetch products' });
      }
}
//add product
const addProduct = async (req, res) => {
    try {
        const { name, description, price, image, category, subCategory, sizes, bestseller } = req.body;
    
        // Create a new product instance
        const newProduct = new Product({
          name,
          description,
          price,
          image,
          category,
          subCategory,
          sizes,
          bestseller
        });
    
        // Save the product to the database
        const savedProduct = await newProduct.save();
    
        res.status(201).json(savedProduct);
      } catch (error) {
        res.status(500).json({ error: 'Failed to add product' });
      }
}
module.exports = { getProducts, addProduct };
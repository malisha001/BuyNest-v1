const express = require('express')
const router = express.Router()

//controller function
const {getProducts,addProduct} = require('../controllers/productController')

//get all products route
router.get('/getproducts',getProducts)

//add product route
router.post('/addproduct',addProduct)

module.exports = router;
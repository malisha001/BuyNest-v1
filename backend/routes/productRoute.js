import express from 'express';
import { listProducts, addProduct, removeProduct, singleProduct, updateProduct } from '../controllers/productController.js'; // Import the updateProduct function
import upload from '../middleware/multer.js';
import adminAuth from '../middleware/adminAuth.js';

const productRouter = express.Router();

// Add Product Route (with images)
productRouter.post(
  '/add',
  adminAuth,
  upload.fields([
    { name: 'image1', maxCount: 1 },
    { name: 'image2', maxCount: 1 },
    { name: 'image3', maxCount: 1 },
    { name: 'image4', maxCount: 1 }
  ]),
  addProduct
);

// Remove Product Route
productRouter.post('/remove', adminAuth, removeProduct);

// Single Product Info Route
productRouter.post('/single', singleProduct);

// List Products Route
productRouter.get('/list', listProducts);

// **Update Product Route** (without image uploads)
productRouter.post('/update', adminAuth, updateProduct); 

export default productRouter;

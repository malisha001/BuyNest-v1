const mongoose = require('mongoose');

// Define the schema
const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  image: {
    type: String, // Change to a single string to store image path
    required: true
  },
  category: {
    type: String,
    required: true
  },
  subCategory: {
    type: String,
    required: true
  },
  sizes: {
    type: [String],
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  bestseller: {
    type: Boolean,
    default: false
  }
});

// Create the model
const Product = mongoose.model('Product', productSchema);

module.exports = Product;

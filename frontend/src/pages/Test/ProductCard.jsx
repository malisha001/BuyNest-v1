import React, { useState } from "react";

const ProductCard = ({ imageSrc }) => {
  const [number, setNumber] = useState(""); // State to handle input value

  // Function to handle change and only allow numeric input
  const handleInputChange = (e) => {
    const value = e.target.value;
    // Check if value is numeric or empty (to allow deletion)
    if (!isNaN(value) || value === "") {
      setNumber(value); // Update state only with valid numbers
    }
  };

  return (
    <div className="product-card">
      <img src={imageSrc} alt="Product" className="product-image" />
      <input
        type="text"
        value={number}
        onChange={handleInputChange}
        placeholder="Enter number"
        className="product-input"
      />
    </div>
  );
};

export default ProductCard;

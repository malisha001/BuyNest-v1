import React from "react";
import './test1.css'; 
import './welcome.css';
import ProductCard from "./ProductCard";

const products = [
  {
    id: 1,
    imageSrc:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/8f4f3bfc20e1a3d207d32b749c4f1034bc20f5b6bbbb463f361853ec668f3638?placeholderIfAbsent=true&apiKey=4ab5310948d94fbeb13af5fdd28cfb2e",
  },
  {
    id: 2,
    imageSrc:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/1a4aa46b761cb4b1637f3e1af73848417dc0dd175130e68e1c7a3974aa2bd41e?placeholderIfAbsent=true&apiKey=4ab5310948d94fbeb13af5fdd28cfb2e",
  },
  {
    id: 3,
    imageSrc:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/4dd37635bed88cf613e3769ccfca3ad3ed33308de48f85dc57692c316f0f19e1?placeholderIfAbsent=true&apiKey=4ab5310948d94fbeb13af5fdd28cfb2e",
  },
  {
    id: 4,
    imageSrc:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/eb487b0dd271211aadeba99299126bc8a11b21df28fc0d2991ab4188d6b65ed9?placeholderIfAbsent=true&apiKey=4ab5310948d94fbeb13af5fdd28cfb2e",
  },
  {
    id: 5,
    imageSrc:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/ac13aa5746684db683a6138ded944e57ec3b98e44b06a5ddafaba2b3302987e0?placeholderIfAbsent=true&apiKey=4ab5310948d94fbeb13af5fdd28cfb2e",
  },
  {
    id: 6,
    imageSrc:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/712baf2d2c0ed8e2833fd4c40da31cfc91f708cdb91491efd40113c9331c5d67?placeholderIfAbsent=true&apiKey=4ab5310948d94fbeb13af5fdd28cfb2e",
  },
];

function TestOne() {
  return (
    <main className="welcome-main">
<div className="welcome-container">
  <div className="welcome-content">
    <section className="welcome-info">
      <div className="welcome-group">
        <h1 className="welcome-prices-text">Discover Your Optimal</h1>
        <h2 className="and-save-text">Viewing Experience</h2>
        {/* <p className="shop-smart-description"></p> */}
        <button className="start-shopping-button">
          <span className="start-shopping-background">
            Start shopping
          </span>
        </button>
        <button className="next-button">
          <span className="next-button-background">Next</span>
        </button>
      </div>
    </section>
    <div className="right-column">
              <div className="product-grid">
                {products.map((product) => (
                  <ProductCard
                    key={product.id}
                    imageSrc={product.imageSrc}
                  />
                ))}
              </div>
            </div>
  </div>
</div>
</main>
  );
}

export default TestOne;


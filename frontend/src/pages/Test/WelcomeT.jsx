import React from 'react';
import './welcome.css';
import { useNavigate } from 'react-router-dom';

const WelcomeT = () => {
  const navigate = useNavigate();

  const goToNextStep = () => {
    navigate('/test1'); // This navigates to the '/test1' route
  };

  return (
    <main className="welcome-main">
      <div className="welcome-container">
        <section className="welcome-info">
          <div className="welcome-group">
            <h1 className="welcome-prices-text">Compare prices</h1>
            <h2 className="and-save-text">and save</h2>
            <p className="shop-smart-description">
              BuyNest helps you find the best prices, compare products, and make smarter shopping decisions. Let's start your shopping journey.
            </p>
            <button className="next-button" onClick={goToNextStep}>
              <span className="next-button-background">Next</span>
            </button>
          </div>
        </section>
        <aside className="welcome-image">
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/1c519ca0d099ee3900cb8ecfb97b6052378a55a68a2b1fca09a31ffb25baa148?placeholderIfAbsent=true&apiKey=4ab5310948d94fbeb13af5fdd28cfb2e"
            className="welcome-img"
            alt="Illustration of compare and save feature"
          />
        </aside>
      </div>
    </main>
  );
};

export default WelcomeT;

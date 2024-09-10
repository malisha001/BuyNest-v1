import React from "react";
import './welcome.css'; 
import TextSizeTest from './TextSizeTest'; // Import the TextSizeTest component

const Test3 = () => {
  return (
    <main className="welcome-main">
      <div className="welcome-container">
        <div className="welcome-content">
          <section className="welcome-info">
            <div className="welcome-group">
              <h1 className="welcome-prices-text">Customize Your</h1>
              <h2 className="and-save-text">Viewing Experience</h2>
              <p className="shop-smart-description">
              Ensure easy reading for all by adjusting text size with the slider below. Your preferences are saved for a consistent browsing experience on your next visit.
              </p>
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
          
          {/* Replace the image section with the TextSizeTest component */}
          <section className="text-size-test">
            <TextSizeTest /> {/* This renders the TextSizeTest in place of the image */}
          </section>
        </div>
      </div>
    </main>
  );
};

export default Test3;

import React, { useState, useEffect } from 'react';
import './textSizeTest.css'; // Add updated styles

const TextSizeTest = () => {
    const [textSize, setTextSize] = useState(() => {
        return localStorage.getItem('textSize') ? parseInt(localStorage.getItem('textSize')) : 16;
    });

    useEffect(() => {
        localStorage.setItem('textSize', textSize);
        document.documentElement.style.setProperty('--dynamic-text-size', `${textSize}px`);
    }, [textSize]);

    return (
        <div className="full-screen-container">
            <div className="text-size-box">
                <h1 style={{ fontSize: `${textSize}px` }}>Accessibility Settings</h1>
                <p className="description-text" style={{ fontSize: `${textSize}px` }}>
                    Adjust the text size below. This will affect all text across the page in real time.
                </p>
                <div className="slider-container">
                    <input
                        type="range"
                        min="12"
                        max="40"
                        value={textSize}
                        onChange={(e) => setTextSize(e.target.value)}
                        className="text-size-slider"
                    />
                    <span className="font-size-display">{textSize}px</span>
                </div>
            </div>
        </div>
    );
};

export default TextSizeTest;

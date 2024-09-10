import React, { useState, useEffect } from 'react';
import useSpeechToText from '../../hooks/useSpeechToText';
import { useNavigate } from 'react-router-dom';

const AccessibilityTaskbar = () => {
    // Voice to Text
    const { isListning, transcript, startListning, stopListning } = useSpeechToText({ continuous: true });
    const navigate = useNavigate();

    //accessibility settings
    const [seizureSafe, setSeizureSafe] = useState(false);
    const [visionImpaired, setVisionImpaired] = useState(false);
    const [fontSize, setFontSize] = useState(16);
    const [lineHeight, setLineHeight] = useState(1.5);
    const [letterSpacing, setLetterSpacing] = useState(1);
    const [contrast, setContrast] = useState('default');
    const [monochrome, setMonochrome] = useState(false);
    const [saturation, setSaturation] = useState(100);
    const [isTaskbarVisible, setIsTaskbarVisible] = useState(true);
    const [showSettings, setShowSettings] = useState(null); // Track which popup is open

// Start or stop listening based on the current state
const startStopListening = () => {
    isListning ? stopVoiceInput() : startListning();
};

// Check for voice commands and navigate based on the command
useEffect(() => {
    const command = transcript.trim().toLowerCase();
    console.log(command);

    // Call the appropriate navigation function based on the command
    if (command === "go to login") {
        navigateTo('/login');
    } else if (command === "go to cart") {
        navigateTo('/cart');
    } else if (command === "go to profile") {
        navigateTo('/profile');
    } else if (command === "go to collection") {
        navigateTo('/collection');
    } else if (command === "go to home") {
        navigateTo('/');
    }else if (command === "go to about") {
        navigateTo('/orders');
    }
    stopVoiceInput();
}, [transcript]);

// A general navigation function that takes the target route
const navigateTo = (path) => {
    navigate(path);

    // Automatically stop listening after 5 seconds
    setTimeout(() => {
        stopVoiceInput();
    }, 5000);
};

// Stop listening
const stopVoiceInput = () => {
    stopListning();
};

    // Apply Seizure Safe Profile
    useEffect(() => {
        document.body.style.filter = seizureSafe ? 'grayscale(100%)' : 'none';
    }, [seizureSafe]);

    // Apply Vision Impaired Profile
    useEffect(() => {
        document.body.style.fontSize = visionImpaired ? '20px' : '16px';
        document.body.style.filter = visionImpaired ? 'contrast(150%)' : 'contrast(100%)';
    }, [visionImpaired]);

    // Apply Font Size
    useEffect(() => {
        document.body.style.fontSize = `${fontSize}px`;
    }, [fontSize]);

    // Apply Line Height
    useEffect(() => {
        document.body.style.lineHeight = `${lineHeight}`;
    }, [lineHeight]);

    // Apply Letter Spacing (Line Spacing)
    useEffect(() => {
        document.body.style.letterSpacing = `${letterSpacing}px`;
    }, [letterSpacing]);

    // Apply Contrast
    useEffect(() => {
        switch (contrast) {
            case 'dark':
                document.body.style.backgroundColor = '#000';
                document.body.style.color = '#FFF';
                break;
            case 'light':
                document.body.style.backgroundColor = '#FFF';
                document.body.style.color = '#000';
                break;
            case 'high':
                document.body.style.filter = 'contrast(200%)';
                break;
            default:
                document.body.style.backgroundColor = '';
                document.body.style.color = '';
                document.body.style.filter = 'contrast(100%)';
                break;
        }
    }, [contrast]);

    // Apply Monochrome Filter
    useEffect(() => {
        document.body.style.filter = monochrome ? 'grayscale(100%)' : '';
    }, [monochrome]);

    // Apply Saturation Adjustment
    useEffect(() => {
        document.body.style.filter = saturation !== 100 ? `saturate(${saturation}%)` : 'none';
    }, [saturation]);

    // Function to Reset All Accessibility Settings to Default
    const resetSettings = () => {
        setSeizureSafe(false);
        setVisionImpaired(false);
        setFontSize(16);
        setLineHeight(1.5);
        setLetterSpacing(1);
        setContrast('default');
        setMonochrome(false);
        setSaturation(100);
    };

    // Handle which settings box to show
    const handleIconClick = (settingsType) => {
        setShowSettings(showSettings === settingsType ? null : settingsType); // Toggle popup
    };

    return (
        <>
            {isTaskbarVisible && (
                <div style={{
                    position: 'fixed',
                    bottom: '20px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    backgroundColor: 'rgba(0, 0, 0, 0.85)',  // Darker glassy look
                    backdropFilter: 'blur(10px)', // Blur for glass effect
                    color: 'white',
                    padding: '10px 20px',
                    borderRadius: '30px',  // Softer, more rounded edges
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    zIndex: 1000,
                    fontFamily: 'Arial, sans-serif',
                    width: 'auto',
                    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.5)',  // Shadow for floating effect
                    border: '1px solid rgba(255, 255, 255, 0.2)',  // Soft border for definition
                }}>
                    <div style={{
                        display: 'flex',
                        gap: '15px',
                        alignItems: 'center',
                    }}>
                        {/* Font Size Icon */}
                        <button
                            style={iconButtonStyle}
                            onClick={() => handleIconClick('fontSize')}
                            aria-label="Adjust Font Size"
                        >
                            🔤
                        </button>

                        {/* Line Height Icon */}
                        <button
                            style={iconButtonStyle}
                            onClick={() => handleIconClick('lineHeight')}
                            aria-label="Adjust Line Height"
                        >
                            📏
                        </button>

                        {/* Letter Spacing Icon */}
                        <button
                            style={iconButtonStyle}
                            onClick={() => handleIconClick('letterSpacing')}
                            aria-label="Adjust Letter Spacing"
                        >
                            ↔️
                        </button>

                        {/* Monochrome Icon */}
                        <button
                            style={iconButtonStyle}
                            onClick={() => handleIconClick('monochrome')}
                            aria-label="Toggle Monochrome"
                        >
                            🖤
                        </button>

                        {/* Vision Impaired Icon */}
                        <button
                            style={iconButtonStyle}
                            onClick={() => handleIconClick('visionImpaired')}
                            aria-label="Toggle Vision Impaired Profile"
                        >
                            👓
                        </button>

                        {/* Voice to Text Icon */}
                        <button
                            style={iconButtonStyle}
                            onClick={startStopListening}
                            aria-label="Voice to Text Feature"
                        >
                            🎤
                        </button>

                        {/* Screen Reader Icon */}
                        <button
                            style={iconButtonStyle}
                            onClick={() => alert('Screen Reader feature coming soon!')}
                            aria-label="Screen Reader Feature"
                        >
                            🗣️
                        </button>

                        {/* Reset Button */}
                        <button
                            onClick={resetSettings}
                            style={{
                                backgroundColor: '#f00',
                                color: 'white',
                                border: 'none',
                                padding: '8px 12px',
                                borderRadius: '20px',
                                cursor: 'pointer',
                                transition: 'background 0.3s ease',
                            }}
                            onMouseEnter={(e) => e.target.style.backgroundColor = '#c00'}
                            onMouseLeave={(e) => e.target.style.backgroundColor = '#f00'}
                        >
                            Reset
                        </button>
                    </div>

                    {/* Settings Popup */}
                    {showSettings === 'fontSize' && (
                        <SettingsPopup label={`Font Size: ${fontSize}px`} min="12" max="40" value={fontSize} onChange={(e) => setFontSize(e.target.value)} />
                    )}

                    {showSettings === 'lineHeight' && (
                        <SettingsPopup label={`Line Height: ${lineHeight}`} min="1" max="3" step="0.1" value={lineHeight} onChange={(e) => setLineHeight(e.target.value)} />
                    )}

                    {showSettings === 'letterSpacing' && (
                        <SettingsPopup label={`Letter Spacing: ${letterSpacing}px`} min="0" max="5" value={letterSpacing} onChange={(e) => setLetterSpacing(e.target.value)} />
                    )}

                    {showSettings === 'monochrome' && (
                        <SettingsPopup label={`Monochrome: ${monochrome ? "On" : "Off"}`} isCheckbox={true} checked={monochrome} onChange={() => setMonochrome(!monochrome)} />
                    )}

                    {showSettings === 'visionImpaired' && (
                        <SettingsPopup label={`Vision Impaired Profile: ${visionImpaired ? "On" : "Off"}`} isCheckbox={true} checked={visionImpaired} onChange={() => setVisionImpaired(!visionImpaired)} />
                    )}

                    {showSettings === 'seizureSafe' && (
                        <SettingsPopup label={`Seizure Safe Profile: ${seizureSafe ? "On" : "Off"}`} isCheckbox={true} checked={seizureSafe} onChange={() => setSeizureSafe(!seizureSafe)} />
                    )}
                </div>
            )}

            {/* Show Taskbar Button */}
            {!isTaskbarVisible && (
                <button
                    onClick={() => setIsTaskbarVisible(true)}
                    style={{
                        position: 'fixed',
                        bottom: '20px',
                        right: '20px',
                        backgroundColor: '#555',
                        color: 'white',
                        border: 'none',
                        padding: '8px 12px',
                        borderRadius: '20px',
                        cursor: 'pointer',
                    }}
                    onMouseEnter={(e) => e.target.style.backgroundColor = '#333'}
                    onMouseLeave={(e) => e.target.style.backgroundColor = '#555'}
                >
                    Show Taskbar
                </button>
            )}
        </>
    );
};

// Icon Button Styles
const iconButtonStyle = {
    fontSize: '20px',
    color: 'white',
    cursor: 'pointer',
    border: 'none',
    background: 'transparent',
    padding: '10px',
    borderRadius: '50%',
    transition: 'background 0.3s ease',
    onMouseEnter: (e) => e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.1)',
    onMouseLeave: (e) => e.target.style.backgroundColor = 'transparent',
};

// Settings Popup Component
const SettingsPopup = ({ label, min, max, step = 1, value, onChange, isCheckbox, checked }) => (
    <div style={{
        position: 'absolute',
        bottom: '60px',
        backgroundColor: 'white',
        color: 'black',
        padding: '10px',
        borderRadius: '8px',
        boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.15)',
    }}>
        <label>{label}</label>
        {isCheckbox ? (
            <input
                type="checkbox"
                checked={checked}
                onChange={onChange}
                style={{ marginLeft: '10px', cursor: 'pointer' }}
            />
        ) : (
            <input
                type="range"
                min={min}
                max={max}
                step={step}
                value={value}
                onChange={onChange}
                style={{ marginLeft: '10px', cursor: 'pointer', width: '100px' }}
            />
        )}
    </div>
);

export default AccessibilityTaskbar;

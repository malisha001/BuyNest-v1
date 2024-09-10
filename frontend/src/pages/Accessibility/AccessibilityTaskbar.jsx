import React, { useState, useEffect } from 'react';

const AccessibilityTaskbar = () => {
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
        document.body.style.filter = `saturate(${saturation}%)`;
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
                    bottom: '20px', // Floats 20px above the bottom
                    left: '50%',
                    transform: 'translateX(-50%)',
                    backgroundColor: 'rgba(0, 0, 0, 0.9)',  // Black glossy look
                    color: 'white',
                    padding: '10px',
                    borderRadius: '50px',  // Rounded edges
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    zIndex: 1000,
                    fontFamily: 'Arial, sans-serif',
                    width: 'auto', // Reduce width to fit icons
                    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.5)',  // Floating effect
                }}>
                    <div style={{
                        display: 'flex',
                        gap: '15px',
                        alignItems: 'center',
                    }}>
                        {/* Font Size Icon */}
                        <button
                            style={{
                                fontSize: '20px',
                                color: 'white',
                                cursor: 'pointer',
                                border: 'none',
                                background: 'transparent',
                                padding: '10px',
                                borderRadius: '50%',
                                transition: 'background 0.3s ease',
                            }}
                            onClick={() => handleIconClick('fontSize')}
                            onMouseEnter={(e) => e.target.style.backgroundColor = '#333'}
                            onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
                            aria-label="Adjust Font Size"
                        >
                            🔤
                        </button>

                        {/* Line Height Icon */}
                        <button
                            style={{
                                fontSize: '20px',
                                color: 'white',
                                cursor: 'pointer',
                                border: 'none',
                                background: 'transparent',
                                padding: '10px',
                                borderRadius: '50%',
                                transition: 'background 0.3s ease',
                            }}
                            onClick={() => handleIconClick('lineHeight')}
                            onMouseEnter={(e) => e.target.style.backgroundColor = '#333'}
                            onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
                            aria-label="Adjust Line Height"
                        >
                            📏
                        </button>

                        {/* Letter Spacing (Line Spacing) Icon */}
                        <button
                            style={{
                                fontSize: '20px',
                                color: 'white',
                                cursor: 'pointer',
                                border: 'none',
                                background: 'transparent',
                                padding: '10px',
                                borderRadius: '50%',
                                transition: 'background 0.3s ease',
                            }}
                            onClick={() => handleIconClick('letterSpacing')}
                            onMouseEnter={(e) => e.target.style.backgroundColor = '#333'}
                            onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
                            aria-label="Adjust Letter Spacing"
                        >
                            ↔️
                        </button>

                        {/* Monochrome Icon */}
                        <button
                            style={{
                                fontSize: '20px',
                                color: 'white',
                                cursor: 'pointer',
                                border: 'none',
                                background: 'transparent',
                                padding: '10px',
                                borderRadius: '50%',
                                transition: 'background 0.3s ease',
                            }}
                            onClick={() => handleIconClick('monochrome')}
                            onMouseEnter={(e) => e.target.style.backgroundColor = '#333'}
                            onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
                            aria-label="Toggle Monochrome"
                        >
                            🖤
                        </button>

                        {/* Vision Impaired Icon */}
                        <button
                            style={{
                                fontSize: '20px',
                                color: 'white',
                                cursor: 'pointer',
                                border: 'none',
                                background: 'transparent',
                                padding: '10px',
                                borderRadius: '50%',
                                transition: 'background 0.3s ease',
                            }}
                            onClick={() => handleIconClick('visionImpaired')}
                            onMouseEnter={(e) => e.target.style.backgroundColor = '#333'}
                            onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
                            aria-label="Toggle Vision Impaired Profile"
                        >
                            👓
                        </button>

                        {/* Seizure Safe Profile */}
                        <button
                            style={{
                                fontSize: '20px',
                                color: 'white',
                                cursor: 'pointer',
                                border: 'none',
                                background: 'transparent',
                                padding: '10px',
                                borderRadius: '50%',
                                transition: 'background 0.3s ease',
                            }}
                            onClick={() => handleIconClick('seizureSafe')}
                            onMouseEnter={(e) => e.target.style.backgroundColor = '#333'}
                            onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
                            aria-label="Toggle Seizure Safe Profile"
                        >
                            🧠
                        </button>

                        {/* Saturation Icon */}
                        <button
                            style={{
                                fontSize: '20px',
                                color: 'white',
                                cursor: 'pointer',
                                border: 'none',
                                background: 'transparent',
                                padding: '10px',
                                borderRadius: '50%',
                                transition: 'background 0.3s ease',
                            }}
                            onClick={() => handleIconClick('saturation')}
                            onMouseEnter={(e) => e.target.style.backgroundColor = '#333'}
                            onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
                            aria-label="Adjust Saturation"
                        >
                            🎨
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
                        <div style={{
                            position: 'absolute',
                            bottom: '60px',
                            backgroundColor: 'white',
                            color: 'black',
                            padding: '10px',
                            borderRadius: '8px',
                            boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.15)',
                        }}>
                            <label>Font Size: {fontSize}px</label>
                            <input
                                type="range"
                                min="12"
                                max="40"
                                value={fontSize}
                                onChange={(e) => setFontSize(e.target.value)}
                                style={{ marginLeft: '10px', cursor: 'pointer', width: '100px' }}
                            />
                        </div>
                    )}

                    {showSettings === 'lineHeight' && (
                        <div style={{
                            position: 'absolute',
                            bottom: '60px',
                            backgroundColor: 'white',
                            color: 'black',
                            padding: '10px',
                            borderRadius: '8px',
                            boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.15)',
                        }}>
                            <label>Line Height: {lineHeight}</label>
                            <input
                                type="range"
                                min="1"
                                max="3"
                                step="0.1"
                                value={lineHeight}
                                onChange={(e) => setLineHeight(e.target.value)}
                                style={{ marginLeft: '10px', cursor: 'pointer', width: '100px' }}
                            />
                        </div>
                    )}

                    {showSettings === 'letterSpacing' && (
                        <div style={{
                            position: 'absolute',
                            bottom: '60px',
                            backgroundColor: 'white',
                            color: 'black',
                            padding: '10px',
                            borderRadius: '8px',
                            boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.15)',
                        }}>
                            <label>Letter Spacing: {letterSpacing}px</label>
                            <input
                                type="range"
                                min="0"
                                max="5"
                                value={letterSpacing}
                                onChange={(e) => setLetterSpacing(e.target.value)}
                                style={{ marginLeft: '10px', cursor: 'pointer', width: '100px' }}
                            />
                        </div>
                    )}

                    {showSettings === 'monochrome' && (
                        <div style={{
                            position: 'absolute',
                            bottom: '60px',
                            backgroundColor: 'white',
                            color: 'black',
                            padding: '10px',
                            borderRadius: '8px',
                            boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.15)',
                        }}>
                            <label>Monochrome: {monochrome ? "On" : "Off"}</label>
                            <input
                                type="checkbox"
                                checked={monochrome}
                                onChange={() => setMonochrome(!monochrome)}
                                style={{ marginLeft: '10px', cursor: 'pointer' }}
                            />
                        </div>
                    )}

                    {showSettings === 'saturation' && (
                        <div style={{
                            position: 'absolute',
                            bottom: '60px',
                            backgroundColor: 'white',
                            color: 'black',
                            padding: '10px',
                            borderRadius: '8px',
                            boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.15)',
                        }}>
                            <label>Saturation: {saturation}%</label>
                            <input
                                type="range"
                                min="0"
                                max="200"
                                value={saturation}
                                onChange={(e) => setSaturation(e.target.value)}
                                style={{ marginLeft: '10px', cursor: 'pointer', width: '100px' }}
                            />
                        </div>
                    )}

                    {showSettings === 'visionImpaired' && (
                        <div style={{
                            position: 'absolute',
                            bottom: '60px',
                            backgroundColor: 'white',
                            color: 'black',
                            padding: '10px',
                            borderRadius: '8px',
                            boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.15)',
                        }}>
                            <label>Vision Impaired Profile: {visionImpaired ? "On" : "Off"}</label>
                            <input
                                type="checkbox"
                                checked={visionImpaired}
                                onChange={() => setVisionImpaired(!visionImpaired)}
                                style={{ marginLeft: '10px', cursor: 'pointer' }}
                            />
                        </div>
                    )}

                    {showSettings === 'seizureSafe' && (
                        <div style={{
                            position: 'absolute',
                            bottom: '60px',
                            backgroundColor: 'white',
                            color: 'black',
                            padding: '10px',
                            borderRadius: '8px',
                            boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.15)',
                        }}>
                            <label>Seizure Safe Profile: {seizureSafe ? "On" : "Off"}</label>
                            <input
                                type="checkbox"
                                checked={seizureSafe}
                                onChange={() => setSeizureSafe(!seizureSafe)}
                                style={{ marginLeft: '10px', cursor: 'pointer' }}
                            />
                        </div>
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

export default AccessibilityTaskbar;

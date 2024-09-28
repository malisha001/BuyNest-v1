import { useState, useEffect } from 'react';
import useSpeechToText from '../../hooks/useSpeechToText';
import { useNavigate } from 'react-router-dom';

const AccessibilityTaskbar = () => {
    const { isListning, transcript, startListning, stopListning } = useSpeechToText({ continuous: true });
    const [isVoiceActive, setIsVoiceActive] = useState(false); 
    const [isTaskbarActivated, setIsTaskbarActivated] = useState(false); 
    const [fontSize, setFontSize] = useState(16);
    const [lineHeight, setLineHeight] = useState(1.5);
    const [letterSpacing, setLetterSpacing] = useState(1);
    const [contrast, setContrast] = useState('default');
    const [monochrome, setMonochrome] = useState(false);
    const [saturation, setSaturation] = useState(100);
    const [seizureSafe, setSeizureSafe] = useState(false);
    const [visionImpaired, setVisionImpaired] = useState(false);
    const [isTaskbarVisible, setIsTaskbarVisible] = useState(true);
    const [showSettings, setShowSettings] = useState(null);
    const [showCommandFeedback, setShowCommandFeedback] = useState('');
    const [tooltip, setTooltip] = useState(''); 

    const navigate = useNavigate();

    // Start or stop listening based on the current state
    const startStopListening = () => {
        if (isListning) {
            stopVoiceInput();
        } else {
            startListning();
            setIsVoiceActive(true); 
        }
    };

    // Handle voice commands
    useEffect(() => {
        const command = transcript.trim().toLowerCase();

        const executeCommand = (feedback, callback) => {
            callback();
            setShowCommandFeedback(feedback);
            setTimeout(() => setShowCommandFeedback(''), 3000); 
            stopVoiceInput(); 
        };

        if (command.includes("activate taskbar")) {
            executeCommand('Taskbar Activated', () => setIsTaskbarActivated(true));
        } else if (command.includes("deactivate taskbar")) {
            executeCommand('Taskbar Deactivated', () => setIsTaskbarActivated(false));
        } else if (command.includes("increase text size")) {
            executeCommand('Text Size Increased', () => setFontSize((prevSize) => prevSize + 2));
        } else if (command.includes("decrease text size")) {
            executeCommand('Text Size Decreased', () => setFontSize((prevSize) => Math.max(12, prevSize - 2)));
        } else if (command.includes("increase line height")) {
            executeCommand('Line Height Increased', () => setLineHeight((prevHeight) => prevHeight + 0.1));
        } else if (command.includes("decrease line height")) {
            executeCommand('Line Height Decreased', () => setLineHeight((prevHeight) => Math.max(1, prevHeight - 0.1)));
        } else if (command.includes("increase contrast")) {
            executeCommand('Contrast Increased', () => setContrast('high'));
        } else if (command.includes("decrease contrast")) {
            executeCommand('Contrast Reset', () => setContrast('default'));
        } else if (command.includes("reset")) { 
            executeCommand('Settings Reset', resetSettings);
        } else if (command === "go to login") {
            executeCommand('Navigating to Login', () => navigateTo('/login'));
        } else if (command === "go to cart") {
            executeCommand('Navigating to Cart', () => navigateTo('/cart'));
        } else if (command === "go to profile") {
            executeCommand('Navigating to Profile', () => navigateTo('/profile'));
        } else if (command === "go to collection") {
            executeCommand('Navigating to Collection', () => navigateTo('/collection'));
        } else if (command === "go to home") {
            executeCommand('Navigating to Home', () => navigateTo('/'));
        } else if (command === "go to orders") {
            executeCommand('Navigating to Orders', () => navigateTo('/orders'));
        }

        if (transcript) {
            setIsVoiceActive(false); 
        }
    }, [transcript]);

    // General navigation handler
    const navigateTo = (path) => {
        navigate(path);
    };

    // Stop listening
    const stopVoiceInput = () => {
        stopListning();
        setIsVoiceActive(false); 
    };

    // Apply settings effects
    useEffect(() => {
        document.body.style.filter = seizureSafe ? 'grayscale(100%)' : 'none';
    }, [seizureSafe]);

    useEffect(() => {
        document.body.style.fontSize = visionImpaired ? '20px' : '16px';
        document.body.style.filter = visionImpaired ? 'contrast(150%)' : 'contrast(100%)';
    }, [visionImpaired]);

    useEffect(() => {
        document.body.style.fontSize = `${fontSize}px`;
    }, [fontSize]);

    useEffect(() => {
        document.body.style.lineHeight = `${lineHeight}`;
    }, [lineHeight]);

    useEffect(() => {
        document.body.style.letterSpacing = `${letterSpacing}px`;
    }, [letterSpacing]);

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

    useEffect(() => {
        document.body.style.filter = monochrome ? 'grayscale(100%)' : '';
    }, [monochrome]);

    useEffect(() => {
        document.body.style.filter = saturation !== 100 ? `saturate(${saturation}%)` : 'none';
    }, [saturation]);

    // Reset all settings to default
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

    const handleIconClick = (settingsType) => {
        setShowSettings(showSettings === settingsType ? null : settingsType); 
    };

    // Taskbar and orb animation styles
    const orbContainerStyles = {
        position: 'fixed',
        bottom: '180px',
        left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        zIndex: 1001,
        textAlign: 'center',
    };

    const orbStyles = {
        width: '80px',
        height: '80px',
        borderRadius: '50%',
        background: 'linear-gradient(135deg, #66e2ff, #8e9bff, #d066ff, #ff66b3)',
        animation: 'orbGlow 2s ease-in-out infinite',
        boxShadow: '0 0 30px rgba(0, 255, 255, 0.5)',
    };

    const listeningTextStyles = {
        color: 'white',
        marginTop: '15px',
        fontSize: '20px',
        fontWeight: 'bold',
    };

    const feedbackStyles = {
        position: 'fixed',
        bottom: '100px',
        left: '50%',
        transform: 'translateX(-50%)',
        backgroundColor: 'rgba(0, 0, 0, 0.85)',
        color: '#fff',
        padding: '10px 20px',
        borderRadius: '10px',
        fontSize: '18px',
        fontWeight: 'bold',
        zIndex: 1002,
        display: showCommandFeedback ? 'block' : 'none',
    };

    const voiceTextStyles = {
        position: 'fixed',
        bottom: '150px',
        left: '50%',
        transform: 'translateX(-50%)',
        backgroundColor: 'rgba(0, 0, 0, 0.85)', 
        color: '#FFFFFF',
        padding: '15px 30px',
        borderRadius: '25px',
        fontSize: '22px',
        fontWeight: 'bold',
        zIndex: 1002,
        letterSpacing: '1px', 
    };

    const tooltipStyle = {
        position: 'absolute',
        backgroundColor: 'rgba(0, 0, 0, 0.85)',
        color: '#fff',
        padding: '10px 15px',  // Larger padding for visibility
        borderRadius: '8px',
        fontSize: '16px',  // Larger font size for accessibility
        bottom: '80px', // Above taskbar with more space
        whiteSpace: 'nowrap',
        zIndex: 1001,
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.2)', // Subtle shadow for better focus
    };

    const keyframes = `
        @keyframes orbGlow {
            0%, 100% {
                transform: scale(1);
                box-shadow: 0 0 15px rgba(0, 255, 255, 0.4);
            }
            50% {
                transform: scale(1.1);
                box-shadow: 0 0 35px rgba(0, 255, 255, 0.8);
            }
        }
    `;

    return (
        <>
            <style>{keyframes}</style>

            {/* Voice activation feedback */}
            <div style={feedbackStyles}>
                {showCommandFeedback}
            </div>

            {/* Orb animation for voice commands */}
            {isVoiceActive && (
                <div style={orbContainerStyles}>
                    <div style={orbStyles}></div>
                    <div style={listeningTextStyles}>Processing...</div>
                </div>
            )}

            {/* Display spoken words */}
            {isListning && (
                <div style={voiceTextStyles}>
                    <p>{transcript || 'Listening...'}</p>
                </div>
            )}

            {isTaskbarVisible && (
                <div style={{
                    position: 'fixed',
                    bottom: '20px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    backgroundColor: isTaskbarActivated ? 'rgba(34, 34, 34, 0.95)' : 'rgba(34, 34, 34, 0.85)',
                    backdropFilter: 'blur(10px)',
                    color: 'white',
                    padding: '10px 20px',
                    borderRadius: '30px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    zIndex: 1000,
                    fontFamily: 'Arial, sans-serif',
                    width: 'auto',
                    boxShadow: isTaskbarActivated ? '0 0 20px rgba(0, 123, 255, 0.7)' : '0 4px 10px rgba(0, 0, 0, 0.5)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
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
                            onMouseEnter={() => setTooltip("Increase Text Size (Say 'Increase Text Size')")}
                            onMouseLeave={() => setTooltip('')}
                        >
                            🔤
                        </button>

                        {/* Line Height Icon */}
                        <button
                            style={iconButtonStyle}
                            onClick={() => handleIconClick('lineHeight')}
                            aria-label="Adjust Line Height"
                            onMouseEnter={() => setTooltip("Adjust Line Height (Say 'Increase Line Height')")}
                            onMouseLeave={() => setTooltip('')}
                        >
                            📏
                        </button>

                        {/* Letter Spacing Icon */}
                        <button
                            style={iconButtonStyle}
                            onClick={() => handleIconClick('letterSpacing')}
                            aria-label="Adjust Letter Spacing"
                            onMouseEnter={() => setTooltip("Adjust Letter Spacing (Say 'Increase Letter Spacing')")}
                            onMouseLeave={() => setTooltip('')}
                        >
                            ↔️
                        </button>

                        {/* Monochrome Icon */}
                        <button
                            style={iconButtonStyle}
                            onClick={() => handleIconClick('monochrome')}
                            aria-label="Toggle Monochrome"
                            onMouseEnter={() => setTooltip("Toggle Monochrome (Say 'Activate Monochrome')")}
                            onMouseLeave={() => setTooltip('')}
                        >
                            🖤
                        </button>

                        {/* Vision Impaired Icon */}
                        <button
                            style={iconButtonStyle}
                            onClick={() => handleIconClick('visionImpaired')}
                            aria-label="Toggle Vision Impaired Profile"
                            onMouseEnter={() => setTooltip("Activate Vision Impaired Mode (Say 'Activate Vision Impaired')")}
                            onMouseLeave={() => setTooltip('')}
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

                    {tooltip && <div style={tooltipStyle}>{tooltip}</div>}

                    {/* Settings Popups */}
                    {showSettings === 'fontSize' && <SettingsPopup label={`Font Size: ${fontSize}px`} min="12" max="40" value={fontSize} onChange={(e) => setFontSize(e.target.value)} />}
                    {showSettings === 'lineHeight' && <SettingsPopup label={`Line Height: ${lineHeight}`} min="1" max="3" step="0.1" value={lineHeight} onChange={(e) => setLineHeight(e.target.value)} />}
                    {showSettings === 'letterSpacing' && <SettingsPopup label={`Letter Spacing: ${letterSpacing}px`} min="0" max="5" value={letterSpacing} onChange={(e) => setLetterSpacing(e.target.value)} />}
                    {showSettings === 'monochrome' && <SettingsPopup label={`Monochrome: ${monochrome ? "On" : "Off"}`} isCheckbox={true} checked={monochrome} onChange={() => setMonochrome(!monochrome)} />}
                    {showSettings === 'visionImpaired' && <SettingsPopup label={`Vision Impaired Profile: ${visionImpaired ? "On" : "Off"}`} isCheckbox={true} checked={visionImpaired} onChange={() => setVisionImpaired(!visionImpaired)} />}
                    {showSettings === 'seizureSafe' && <SettingsPopup label={`Seizure Safe Profile: ${seizureSafe ? "On" : "Off"}`} isCheckbox={true} checked={seizureSafe} onChange={() => setSeizureSafe(!seizureSafe)} />}
                </div>
            )}

            {!isTaskbarVisible && (
                <button onClick={() => setIsTaskbarVisible(true)} style={{
                    position: 'fixed', bottom: '20px', right: '20px', backgroundColor: '#555', color: 'white',
                    border: 'none', padding: '8px 12px', borderRadius: '20px', cursor: 'pointer'
                }}
                    onMouseEnter={(e) => e.target.style.backgroundColor = '#333'}
                    onMouseLeave={(e) => e.target.style.backgroundColor = '#555'}>
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
};

// Settings Popup Component
const SettingsPopup = ({ label, min, max, step = 1, value, onChange, isCheckbox, checked }) => (
    <div style={{
        position: 'fixed', bottom: '80px', left: '50%', transform: 'translateX(-50%)',
        backgroundColor: 'rgba(50, 50, 50, 0.95)', backdropFilter: 'blur(10px)', color: 'white',
        padding: '20px', borderRadius: '12px', boxShadow: '0px 8px 24px rgba(0, 0, 0, 0.25)', minWidth: '350px', textAlign: 'center', zIndex: 1001
    }} className="popup-content">
        <label>{label}</label>
        {isCheckbox ? (
            <input type="checkbox" checked={checked} onChange={onChange} style={{ marginLeft: '10px', cursor: 'pointer' }} />
        ) : (
            <input type="range" min={min} max={max} step={step} value={value} onChange={onChange} style={{
                marginLeft: '10px', cursor: 'pointer', width: '100px',
                accentColor: '#1a73e8', backgroundColor: '#1a73e8'
            }} />
        )}
    </div>
);

export default AccessibilityTaskbar;

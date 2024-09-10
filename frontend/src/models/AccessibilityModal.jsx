// AccessibilityModal.js
import React, { useContext } from 'react';
import { AccessibilityContext } from '../context/AccessibilityContext';

const AccessibilityModal = () => {
  const {
    isModalOpen,
    setIsModalOpen,
    seizureSafe,
    setSeizureSafe,
    visionImpaired,
    setVisionImpaired,
    fontSize,
    setFontSize,
    lineHeight,
    setLineHeight,
    letterSpacing,
    setLetterSpacing,
    contrast,
    setContrast,
    monochrome,
    setMonochrome,
    saturation,
    setSaturation,
    resetSettings
  } = useContext(AccessibilityContext);

  if (!isModalOpen) return null;

  return (
    <div style={{
      position: 'fixed',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      backgroundColor: '#fff',
      padding: '20px',
      zIndex: 1000,
      boxShadow: '0 4px 10px rgba(0,0,0,0.2)',
      borderRadius: '10px',
      width: '400px',
    }}>
      <h2>Accessibility Options</h2>
      <div style={{ marginBottom: '10px' }}>
        <label>Seizure Safe Profile</label>
        <input type="checkbox" checked={seizureSafe} onChange={() => setSeizureSafe(!seizureSafe)} />
      </div>
      <div style={{ marginBottom: '10px' }}>
        <label>Vision Impaired Profile</label>
        <input type="checkbox" checked={visionImpaired} onChange={() => setVisionImpaired(!visionImpaired)} />
      </div>
      <div style={{ marginBottom: '10px' }}>
        <label>Font Size: {fontSize}px</label>
        <input type="range" min="12" max="40" value={fontSize} onChange={(e) => setFontSize(e.target.value)} />
      </div>
      <div style={{ marginBottom: '10px' }}>
        <label>Line Height: {lineHeight}</label>
        <input type="range" min="1" max="3" step="0.1" value={lineHeight} onChange={(e) => setLineHeight(e.target.value)} />
      </div>
      <div style={{ marginBottom: '10px' }}>
        <label>Letter Spacing: {letterSpacing}px</label>
        <input type="range" min="0" max="5" value={letterSpacing} onChange={(e) => setLetterSpacing(e.target.value)} />
      </div>
      <div style={{ marginBottom: '10px' }}>
        <label>Contrast</label>
        <select value={contrast} onChange={(e) => setContrast(e.target.value)}>
          <option value="default">Default</option>
          <option value="dark">Dark Contrast</option>
          <option value="light">Light Contrast</option>
          <option value="high">High Contrast</option>
        </select>
      </div>
      <div style={{ marginBottom: '10px' }}>
        <label>Monochrome</label>
        <input type="checkbox" checked={monochrome} onChange={() => setMonochrome(!monochrome)} />
      </div>
      <div style={{ marginBottom: '10px' }}>
        <label>Saturation: {saturation}%</label>
        <input type="range" min="0" max="200" value={saturation} onChange={(e) => setSaturation(e.target.value)} />
      </div>
      <div style={{ marginTop: '20px' }}>
        <button onClick={resetSettings}>Reset Settings</button>
        <button onClick={() => setIsModalOpen(false)} style={{ marginLeft: '10px' }}>Close</button>
      </div>
    </div>
  );
};

export default AccessibilityModal;

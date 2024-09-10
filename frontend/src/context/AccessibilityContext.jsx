// AccessibilityContext.js
import React, { createContext, useState, useEffect } from 'react';

export const AccessibilityContext = createContext();

export const AccessibilityProvider = ({ children }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [seizureSafe, setSeizureSafe] = useState(false);
  const [visionImpaired, setVisionImpaired] = useState(false);
  const [fontSize, setFontSize] = useState(16);
  const [lineHeight, setLineHeight] = useState(1.5);
  const [letterSpacing, setLetterSpacing] = useState(1);
  const [contrast, setContrast] = useState('default');
  const [monochrome, setMonochrome] = useState(false);
  const [saturation, setSaturation] = useState(100);

  // Effect to update the page styles dynamically
  useEffect(() => {
    const contentArea = document.getElementById('main-content') || document.body;

    // Apply styles dynamically to the content area
    contentArea.style.fontSize = `${fontSize}px`;
    contentArea.style.lineHeight = lineHeight;
    contentArea.style.letterSpacing = `${letterSpacing}px`;

    switch (contrast) {
      case 'dark':
        contentArea.style.backgroundColor = '#000';
        contentArea.style.color = '#FFF';
        break;
      case 'light':
        contentArea.style.backgroundColor = '#FFF';
        contentArea.style.color = '#000';
        break;
      case 'high':
        contentArea.style.filter = 'contrast(200%)';
        break;
      default:
        contentArea.style.backgroundColor = '';
        contentArea.style.color = '';
        contentArea.style.filter = 'contrast(100%)';
        break;
    }

    if (monochrome) {
      contentArea.style.filter = 'grayscale(100%)';
    } else {
      contentArea.style.filter = `saturate(${saturation}%)`;
    }

    if (seizureSafe) {
      contentArea.style.filter = 'grayscale(100%)';
    }

  }, [fontSize, lineHeight, letterSpacing, contrast, monochrome, saturation, seizureSafe]);

  // Reset all accessibility settings
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

  return (
    <AccessibilityContext.Provider
      value={{
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
      }}
    >
      {children}
    </AccessibilityContext.Provider>
  );
};

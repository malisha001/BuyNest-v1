// AccessibilityButton.js
import React, { useContext } from 'react';
import { AccessibilityContext } from '../context/AccessibilityContext';

const AccessibilityButton = () => {
  const { setIsModalOpen } = useContext(AccessibilityContext);

  return (
    <button
      onClick={() => setIsModalOpen(true)}
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
        zIndex: 999,
      }}
    >
      Accessibility Options
    </button>
  );
};

export default AccessibilityButton;

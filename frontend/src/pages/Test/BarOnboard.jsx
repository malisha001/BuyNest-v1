import React from 'react';
import { useNavigate } from 'react-router-dom';

const BarOnboard = ({ completeOnboarding }) => {
  const navigate = useNavigate();

  // Handle onboarding completion and navigate to home page
  const handleCompleteOnboarding = () => {
    completeOnboarding();
    navigate('/');
  };

  return (
    <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        backgroundColor: '#f8f9fa', // Light background color
        fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif',
        overflow: 'hidden',
        textAlign: 'center',
        position: 'relative',
      }}>
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '50%',
          background: 'linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.1) 100%)',
          zIndex: -1,
        }}></div>
  
        <h1 style={{
          fontSize: '3.5rem',
          fontWeight: '900',
          color: '#333',
          marginBottom: '1.5rem',
          textShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
          lineHeight: '1.2',
        }}>
          Discover Your New Accessibility Taskbar
        </h1>
        <p style={{
          fontSize: '1.25rem',
          color: '#555',
          marginBottom: '2.5rem',
          maxWidth: '700px',
          lineHeight: '1.6',
        }}>
          This innovative taskbar will transform how you interact with your browser. It provides quick access to essential accessibility features, making your browsing experience smoother and more personalized.
        </p>
        <div style={{
          display: 'flex',
          gap: '1.5rem',
          justifyContent: 'center',
          marginBottom: '3rem',
          flexWrap: 'wrap',
        }}>
          {/* Taskbar Icons */}
          {[
            { icon: '🔤', label: 'Font Size', delay: 0.5 },
            { icon: '📏', label: 'Line Height', delay: 1 },
            { icon: '↔️', label: 'Letter Spacing', delay: 1.5 },
            { icon: '🖤', label: 'Monochrome', delay: 2 },
            { icon: '👓', label: 'Vision Impaired', delay: 2.5 },
            { icon: '🎨', label: 'Saturation', delay: 3 },
          ].map(({ icon, label, delay }) => (
            <div key={label} style={{
              textAlign: 'center',
              opacity: '0',
              animation: `fadeIn 1s ${delay}s forwards`,
            }}>
              <div style={{
                width: '70px',
                height: '70px',
                margin: '0 auto',
                borderRadius: '50%',
                backgroundColor: '#ffffff',
                boxShadow: '0 6px 12px rgba(0, 0, 0, 0.2)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '0.5rem',
                transition: 'transform 0.3s ease',
                transform: 'scale(1)',
              }}>
                <div style={{
                  fontSize: '2.5rem',
                  color: '#007bff',
                }}>
                  {icon}
                </div>
              </div>
              <div style={{
                fontSize: '1.1rem',
                color: '#333',
                fontWeight: '600',
              }}>
                {label}
              </div>
            </div>
          ))}
        </div>
        <button
          onClick={handleCompleteOnboarding}
          style={{
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            padding: '12px 24px',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '1.2rem',
            fontWeight: '600',
            boxShadow: '0 6px 12px rgba(0, 0, 0, 0.3)',
            transition: 'background 0.3s ease, box-shadow 0.3s ease, transform 0.3s ease',
            transform: 'scale(1)',
          }}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = '#0056b3';
            e.target.style.boxShadow = '0 8px 16px rgba(0, 0, 0, 0.4)';
            e.target.style.transform = 'scale(1.05)';
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = '#007bff';
            e.target.style.boxShadow = '0 6px 12px rgba(0, 0, 0, 0.3)';
            e.target.style.transform = 'scale(1)';
          }}
        >
          Explore Now
        </button>
        <style>
          {`
            @keyframes fadeIn {
              from {
                opacity: 0;
                transform: translateY(20px);
              }
              to {
                opacity: 1;
                transform: translateY(0);
              }
            }
          `}
        </style>
      </div>
  );
};

export default BarOnboard;

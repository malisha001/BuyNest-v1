import React from 'react';
import { useNavigate } from 'react-router-dom';

const BarOnboard = ({ completeOnboarding }) => {
  const navigate = useNavigate();

  // Handle onboarding completion and navigate to the home page
  const handleCompleteOnboarding = () => {
    completeOnboarding();
    navigate('/');
  };

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-gray-50 to-gray-100 text-center">
      {/* Subtle Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white opacity-90 z-[-1]"></div>

      {/* Heading Section */}
      <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight drop-shadow-md">
        Discover Your New Accessibility Taskbar
      </h1>
      <p className="text-lg md:text-xl text-gray-600 mb-10 max-w-2xl leading-relaxed">
        Experience a taskbar that transforms how you interact with your browser, offering quick access to essential accessibility features. Personalize your browsing experience for ultimate ease and convenience.
      </p>

      {/* Taskbar Icons */}
      <div className="flex flex-wrap gap-8 justify-center mb-14">
        {[
          { icon: '🔤', label: 'Font Size', delay: 0.5 },
          { icon: '📏', label: 'Line Height', delay: 1 },
          { icon: '↔️', label: 'Letter Spacing', delay: 1.5 },
          { icon: '🖤', label: 'Monochrome', delay: 2 },
          { icon: '👓', label: 'Vision Impaired', delay: 2.5 },
          { icon: '🎨', label: 'Saturation', delay: 3 },
        ].map(({ icon, label, delay }) => (
          <div
            key={label}
            className="text-center opacity-0 animate-fadeIn transform transition-all duration-300 hover:scale-110"
            style={{ animationDelay: `${delay}s` }}
          >
            <div className="w-20 h-20 bg-white rounded-full shadow-lg flex items-center justify-center mb-3">
              <span className="text-3xl text-indigo-500">{icon}</span>
            </div>
            <div className="text-gray-800 font-semibold">{label}</div>
          </div>
        ))}
      </div>

      {/* Complete Onboarding Button */}
      <button
        onClick={handleCompleteOnboarding}
        className="bg-indigo-600 text-white px-8 py-3 rounded-full shadow-lg hover:bg-indigo-700 hover:shadow-xl transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-indigo-300"
      >
        Explore Now
      </button>

      {/* Custom FadeIn Animation using Tailwind */}
      <style>{`
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
        .animate-fadeIn {
          animation: fadeIn 1s forwards;
        }
      `}</style>
    </div>
  );
};

export default BarOnboard;

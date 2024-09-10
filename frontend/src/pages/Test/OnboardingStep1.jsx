import React from 'react';
import { useNavigate } from 'react-router-dom';
import OnboardingWrapper from './OnboardingWrapper';
import './welcome.css'; // Import your existing styles

const OnboardingStep1 = () => {
  const navigate = useNavigate();

  const goToNextStep = () => {
    navigate('/test1');
  };

  return (
    <OnboardingWrapper>
      <div className="px-8 py-12">
        <h1 className="text-4xl font-extrabold text-blue-800 mb-6">Compare Prices and Save</h1>
        <p className="text-lg text-gray-600 mb-8">
          Shop smart and save more. Our platform searches the web to find the best prices and lets you know when the item you are viewing is available at a lower price elsewhere.
        </p>
        <button
          onClick={goToNextStep}
          className="bg-blue-500 text-white px-6 py-3 rounded-lg font-semibold shadow hover:bg-blue-600 transition-all duration-300"
        >
          Start Shopping
        </button>
      </div>
    </OnboardingWrapper>
  );
};

export default OnboardingStep1;

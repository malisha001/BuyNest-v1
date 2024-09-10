import React from 'react';

const OnboardingWrapper = ({ children }) => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 via-white to-blue-50 flex items-center justify-center p-8">
      <div className="bg-white shadow-2xl rounded-xl w-full max-w-3xl">
        {children}
      </div>
    </div>
  );
};

export default OnboardingWrapper;

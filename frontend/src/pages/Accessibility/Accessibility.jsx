import React from 'react';
import { FaVolumeUp, FaAssistiveListeningSystems, FaMousePointer, FaMicrophone } from 'react-icons/fa';

const Accessibility = () => {
  return (
    <main className="bg-gradient-to-r from-gray-50 to-gray-100 min-h-screen py-16 px-4 sm:px-10 lg:px-20">
      {/* Hero Section */}
      <header className="text-center mb-16">
        <h1 className="text-6xl font-extrabold text-gray-900 mb-5 animate-fadeIn">Empowering Your Shopping Experience</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed animate-fadeIn delay-100">
          Our e-clothing store is designed to be accessible to everyone. Whether you need voice navigation, screen reader compatibility, or real-time assistance, 
          we've got features that make your shopping experience smoother, more personalized, and easy to navigate.
        </p>
      </header>

      {/* Main Accessibility Features Section */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 mb-16">
        {/* Accessibility Taskbar */}
        <div className="feature-card p-8 rounded-lg shadow-lg bg-white hover:shadow-xl transition-all border border-gray-200 animate-fadeIn delay-200">
          <div className="text-center">
            <FaMousePointer className="text-6xl text-yellow-500 mb-4" />
            <h2 className="text-2xl font-bold mb-4">Accessibility Taskbar</h2>
            <p className="text-gray-600 leading-relaxed">
              Customize your browsing experience with font size adjustments, contrast control, and voice commands. The taskbar adapts to your needs, making navigation and interaction seamless.
            </p>
          </div>
        </div>

        {/* Live Human Assistance */}
        <div className="feature-card p-8 rounded-lg shadow-lg bg-white hover:shadow-xl transition-all border border-gray-200 animate-fadeIn delay-300">
          <div className="text-center">
            <FaAssistiveListeningSystems className="text-6xl text-purple-500 mb-4" />
            <h2 className="text-2xl font-bold mb-4">Live Human Assistance</h2>
            <p className="text-gray-600 leading-relaxed">
              Connect with a real-time assistant for personalized guidance. Our helpers can assist you via voice chat, provide product recommendations, and even help you complete your purchase.
            </p>
          </div>
        </div>

        {/* Screen Reader Compatibility */}
        <div className="feature-card p-8 rounded-lg shadow-lg bg-white hover:shadow-xl transition-all border border-gray-200 animate-fadeIn delay-400">
          <div className="text-center">
            <FaVolumeUp className="text-6xl text-red-500 mb-4" />
            <h2 className="text-2xl font-bold mb-4">Screen Reader Compatibility</h2>
            <p className="text-gray-600 leading-relaxed">
              Enable speech synthesis to have product details and navigation options read aloud. This feature is ideal for visually impaired users, ensuring they can easily browse product information without needing to read the content themselves.
            </p>
          </div>
        </div>
      </section>

      {/* Voice Navigation Section */}
      <section className="bg-gradient-to-br from-[#f8fafc] via-[#edf2f7] to-[#e2e8f0] py-16 px-6 rounded-lg shadow-lg mb-16">
        <h2 className="text-5xl font-extrabold text-center mb-10 text-gray-900">Voice Navigation Commands</h2>
        <p className="text-lg text-center text-gray-600 max-w-3xl mx-auto mb-10 leading-relaxed">
          Control the website using voice commands to navigate, adjust settings, and interact hands-free. 
          Our Accessibility Taskbar allows you to execute commands like navigating to pages or customizing your browsing experience.
        </p>

        {/* Command Categories */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 max-w-5xl mx-auto">
          {/* Navigation Commands */}
          <div className="command-card bg-white shadow-md p-8 rounded-lg hover:shadow-lg transition-all hover:border-indigo-400 border border-gray-200">
            <h3 className="text-3xl font-semibold mb-6 text-indigo-600">Navigation Commands</h3>
            <ul className="list-disc list-inside text-lg text-gray-700 space-y-4">
              <li><strong>"Go to home"</strong> – Navigates to the homepage</li>
              <li><strong>"Go to collection"</strong> – Takes you to the product collection page</li>
              <li><strong>"Go to cart"</strong> – Opens your shopping cart</li>
              <li><strong>"Go to profile"</strong> – Opens your profile page</li>
              <li><strong>"Go to orders"</strong> – Opens your orders page</li>
            </ul>
          </div>

          {/* Customization Commands */}
          <div className="command-card bg-white shadow-md p-8 rounded-lg hover:shadow-lg transition-all hover:border-indigo-400 border border-gray-200">
            <h3 className="text-3xl font-semibold mb-6 text-indigo-600">Customization Commands</h3>
            <ul className="list-disc list-inside text-lg text-gray-700 space-y-4">
              <li><strong>"Increase text size"</strong> – Increases the font size</li>
              <li><strong>"Decrease text size"</strong> – Decreases the font size</li>
              <li><strong>"Increase line height"</strong> – Increases line spacing for better readability</li>
              <li><strong>"Reset"</strong> – Resets all accessibility settings to default</li>
            </ul>
          </div>
        </div>

        {/* Voice Command Helper */}
        <div className="mt-16 text-center">
          <FaMicrophone className="text-indigo-500 text-6xl mx-auto mb-5 animate-bounce" />
          <h3 className="text-3xl font-semibold text-gray-900 mb-4">Start Using Voice Commands</h3>
          <p className="text-lg text-gray-600 max-w-xl mx-auto leading-relaxed">
            Simply speak your commands into the microphone, and our system will take care of the rest. Experience a truly hands-free shopping experience.
          </p>
        </div>
      </section>

      {/* Visual Breakdown of Accessibility Taskbar Features */}
      <section className="bg-gradient-to-br from-gray-100 to-white py-16 px-4 rounded-lg shadow-inner mb-16">
        <h2 className="text-4xl font-bold text-center mb-10 text-gray-800">Explore Taskbar Features</h2>
        <p className="text-lg text-center text-gray-600 max-w-2xl mx-auto mb-10 leading-relaxed">
          Our accessibility taskbar gives you control over key accessibility settings. With a few clicks, you can adjust font sizes, tweak contrast, and even change letter spacing for better readability.
        </p>

        {/* Icon Grid with Interactive Features */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-8 text-center animate-fadeIn">
          {[
            { icon: '🔤', label: 'Font Size' },
            { icon: '📏', label: 'Line Height' },
            { icon: '↔️', label: 'Letter Spacing' },
            { icon: '👓', label: 'Vision Impaired' },
            { icon: '🖤', label: 'Monochrome' },
            { icon: '🎨', label: 'Saturation' },
          ].map(({ icon, label }) => (
            <div
              key={label}
              className="flex flex-col items-center transition-transform transform hover:scale-105"
            >
              <div className="w-16 h-16 bg-white rounded-full shadow-md flex items-center justify-center mb-3">
                <span className="text-3xl">{icon}</span>
              </div>
              <p className="text-gray-700 font-semibold">{label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Closing Section */}
      <footer className="text-center py-12">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 animate-fadeIn">Need More Help?</h2>
        <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto animate-fadeIn">
          Our team is always ready to assist you. Whether it’s troubleshooting accessibility issues or helping you use the features more effectively, we’re here to ensure a smooth experience.
        </p>
        <button
          onClick={() => window.location.href = '/live-start'}
          className="px-8 py-3 bg-purple-600 text-white rounded-full shadow-lg hover:bg-purple-700 transition-all transform hover:scale-105"
        >
          Get Live Help
        </button>
      </footer>

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
    </main>
  );
};

export default Accessibility;

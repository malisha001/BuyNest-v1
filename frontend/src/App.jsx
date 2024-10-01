import { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Home from './pages/Home';
import Collection from './pages/Collection';
import About from './pages/About';
import Accessibility from './pages/Accessibility/Accessibility';
import Contact from './pages/Contact';
import Product from './pages/Product';
import Cart from './pages/Cart';
import Login from './pages/Login';
import Profile from './pages/Profile';
import PlaceOrder from './pages/PlaceOrder';
import Orders from './pages/Orders';
import LiveAssistanceStart from './pages/Live Assistant/LiveAssistanceStart';
import WaitingForConnection from './pages/Live Assistant/WaitingForConnection';
import FloatingChat from './pages/Live Assistant/FloatingChat';
import AssistantDashboard from './pages/Live Assistant/AssistantDashboard';
import LiveAssistanceInterface from './pages/Live Assistant/LiveAssistanceInterface';
import WelcomeT from './pages/Test/WelcomeT';
import TestOne from './pages/Test/test1';
import Test3 from './pages/Test/test3';
import BarOnboard from './pages/Test/BarOnboard';
import SearchBar from './components/SearchBar';
import TrackOrder from './pages/TrackOrder';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

const App = () => {
  const [onboardingCompleted, setOnboardingCompleted] = useState(false);
  const navigate = useNavigate();

  // Check onboarding status from localStorage
  useEffect(() => {
    const completed = localStorage.getItem('onboardingCompleted');
    if (completed) {
      setOnboardingCompleted(true);
    }
  }, []);

  // Function to complete onboarding and redirect to Home
  const completeOnboarding = () => {
    localStorage.setItem('onboardingCompleted', 'true');
    setOnboardingCompleted(true);
    navigate('/');
  };

  return (
    <div className='px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]'>
      <ToastContainer />
      
      {/* Conditionally Render Navbar and Footer */}
      {onboardingCompleted && (
        <>
          <Navbar />
          <SearchBar />
        </>
      )}
      
      <Routes>
        {!onboardingCompleted ? (
          <>
            {/* Onboarding Pages - Navbar and Footer are hidden */}
            <Route path="/start" element={<WelcomeT />} />
            <Route path="/test1" element={<TestOne />} />
            <Route path="/test3" element={<Test3 />} />
            <Route path="/taskbar" element={<BarOnboard completeOnboarding={completeOnboarding} />} />
            <Route path="/" element={<WelcomeT />} />
          </>
        ) : (
          <>
            {/* Main Routes with Navbar/Footer */}
            <Route path="/" element={<Home />} />
            <Route path="/collection" element={<Collection />} />
            <Route path="/about" element={<About />} />
            <Route path="/accessibility" element={<Accessibility />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/product/:productId" element={<Product />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/login" element={<Login />} />
            <Route path="/profile" element={<Profile />} />  
            <Route path="/place-order" element={<PlaceOrder />} />
            <Route path="/orders" element={<Orders />} />
            <Route path='/track-order/:orderId' element={<TrackOrder />} />
            <Route path="/live-start" element={<LiveAssistanceStart />} />
            <Route path="/live-wait" element={<WaitingForConnection />} />
            <Route path="/assis-dash" element={<AssistantDashboard />} />
            <Route path="/assis-live" element={<LiveAssistanceInterface />} />
          </>
        )}
      </Routes>
      
      {/* Conditionally Render Footer */}
      {onboardingCompleted && <Footer />}
      
      <FloatingChat />
    </div>
  );
};

export default App;

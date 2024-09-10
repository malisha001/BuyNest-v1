import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Collection from './pages/Collection';
import About from './pages/About';
import Contact from './pages/Contact';
import Product from './pages/Product';
import Cart from './pages/Cart';
import Login from './pages/Login';
import PlaceOrder from './pages/PlaceOrder';
import Orders from './pages/Orders';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import SearchBar from './components/SearchBar';
import LiveAssistanceStart from './pages/Live Assistant/LiveAssistanceStart';
import WaitingForConnection from './pages/Live Assistant/WaitingForConnection';
import FloatingChat from './pages/Live Assistant/FloatingChat';
import AssistantDashboard from './pages/Live Assistant/AssistantDashboard';
import LiveAssistanceInterface from './pages/Live Assistant/LiveAssistanceInterface';
import WelcomeT from './pages/Test/OnboardingStep1';
import TestOne from './pages/Test/test1';
import Test3 from './pages/Test/test3';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  return (
    <div className='px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]'>
      <ToastContainer />
      <Navbar />
      <SearchBar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/collection' element={<Collection />} />
        <Route path='/about' element={<About />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/product/:productId' element={<Product />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/login' element={<Login />} />
        <Route path='/place-order' element={<PlaceOrder />} />
        <Route path='/orders' element={<Orders />} />
        <Route path='/live-start' element={<LiveAssistanceStart />} />
        <Route path='/live-wait' element={<WaitingForConnection />} />
        <Route path='/assis-dash' element={<AssistantDashboard />} />
        <Route path='/assis-live' element={<LiveAssistanceInterface />} />
        <Route path="/start" element={<WelcomeT />} />
        <Route path="/test1" element={< TestOne/>} />
          <Route path="/test3" element={< Test3/>} />
        {/* Uncomment when ActiveLiveSession is ready */}
        {/* <Route path='/live-assistance-session' element={<ActiveLiveSession />} /> */}
      </Routes>
      {/* Floating Chat */}
      <FloatingChat />
      <Footer />
    </div>
  );
};

export default App;

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import Slider from './components/Slider';
import ContentSection from './components/ContentSection';
import AboutUs from './components/AboutUs';
import ContactUs from './components/ContactUs';
import SignUp from './components/SignUp';
import LogIn from './components/LogIn';
import Footer from './components/Footer';
import Upload from './components/Upload';
import Pricing from './components/Pricing';
import ApiStack from './components/ApiStack';


import './style.css';

function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={
            <>
              <Slider />
              <ContentSection />
            </>
          } />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<LogIn />} />
          <Route path="/upload" element={<Upload />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/apistack" element={<ApiStack />} />

        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/API logo.png';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="container">
        <div className="logo">
          <img src={logo} alt="Logo" />
        </div>
        
        <div className={`nav-links ${isOpen ? 'active' : ''}`}>
          <ul>
            <li><Link to="/">HOME</Link></li>
            <li><Link to="/apistack">API STACK</Link></li>
            <li><Link to="/pricing">PRICING</Link></li>
            <li><Link to="/about">ABOUT US</Link></li>
            <li><Link to="/contact">CONTACT US</Link></li>
            <li><Link to="/signup">SIGN UP</Link></li>
            <li><Link to="/login">LOGIN</Link></li>
          </ul>
        </div>

        <div className="hamburger" onClick={() => setIsOpen(!isOpen)}>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

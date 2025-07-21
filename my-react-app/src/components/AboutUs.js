import React from 'react';
import './AboutUs.css';

const AboutUs = () => {
  return (
    
    <div className="about-container">
      <div className="about-hero">
        <h1>About Us</h1>
      </div>
      <div className="about-illustration">
        <img src={require('../assets/about_us.jpg')} alt="Company Illustration" />
      </div>
      <div className="about-content">
        <section className="mission-section">
          <h2>Our Story</h2>
          <p>
          In today's digital world, hate speech continues to evolve, often hiding within images and using symbols to evade detection. Our project is dedicated to combating this challenge by developing an advanced hate speech detection API specifically designed for Sinhala-language content. Using cutting-edge AI, natural language processing (NLP), and deep learning techniques, our system can accurately extract and analyze text from images, even when disguised with special characters (e.g., @, #, $). This ensures that no harmful content slips through undetected. Built on a robust FastAPI framework, our API is designed for efficiency, scalability, and real-time analysis, making it a valuable tool for social media platforms, online communities, and digital content moderation teams. By providing automated, accurate hate speech detection, we aim to empower developers, organizations, and policymakers in their mission to create safer and more inclusive digital spaces. At the core of our project lies a commitment to ethical AI, ensuring fairness, transparency, and responsible use of technology. We believe in fostering a healthier online environment where individuals can engage without fear of harassment or discrimination.
          </p>
        </section>

        

        <section className="achievements-section">
          <h2>Our Achievements</h2>
          <div className="achievements-grid">
            <div className="achievement-card">
              <h3>500+</h3>
              <p>Successful Projects</p>
            </div>
            <div className="achievement-card">
              <h3>10+</h3>
              <p>Years of Experience</p>
            </div>
            <div className="achievement-card">
              <h3>98%</h3>
              <p>Client Satisfaction</p>
            </div>
          </div>
        </section>

        <section className="values-section">
          <h2>Our Values</h2>
          <ul>
            <li>Innovation and Creativity</li>
            <li>Customer Satisfaction</li>
            <li>Teamwork and Collaboration</li>
            <li>Integrity and Transparency</li>
          </ul>
        </section>

        <section className="vision-mission">
          <div className="vision-card">
            <h3>Vision</h3>
            <p>To create a digital world free from hate speech where everyone can communicate safely and respectfully</p>
          </div>
          <div className="mission-card">
            <h3>Mission</h3>
            <p>Develop advanced AI solutions to detect and prevent hate speech in Sinhala language content across all digital platforms</p>
          </div>
        </section>

        <section className="follow-section">
          <h2>Follow Us</h2>
          <div className="social-links">
            <a href="#" className="social-link">Facebook</a>
            <a href="#" className="social-link">Twitter</a>
            <a href="#" className="social-link">LinkedIn</a>
            <a href="#" className="social-link">GitHub</a>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AboutUs;

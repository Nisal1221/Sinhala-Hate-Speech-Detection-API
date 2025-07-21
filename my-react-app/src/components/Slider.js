import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Slider.css';
import background1 from '../assets/img-1.jpg';
import wallpaper2 from '../assets/img-2.jpg';

const Slider = () => {
  const [slideIndex, setSlideIndex] = useState(0);
  const navigate = useNavigate(); // ✅ React Router hook to navigate

  const slides = [
    {
      image: background1,
      text: 'AI-powered Text Analytics Suite with advanced features to detect "SINHALA" hate speech, analyze sentiments, and identify topics – promoting safe and inclusive communication',
    },
    {
      image: wallpaper2,
      text: 'Ensure Safe and Inclusive Conversations',
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setSlideIndex((prevIndex) => (prevIndex + 1) % slides.length);
    }, 5000); // 5 seconds per slide

    return () => clearInterval(interval);
  }, [slides.length]);

  const handleTryNowClick = () => {
    navigate('/upload'); // ✅ Route to Upload page
  };

  return (
    <div className="slider-container">
      <div className="slider">
        {slides.map((slide, index) => (
          <div
            className={`slide ${index === slideIndex ? 'active' : ''}`}
            key={index}
          >
            <img src={slide.image} alt={`Slide ${index + 1}`} loading="eager" />
            <div className="fallback-content">
              <h2>Image failed to load</h2>
            </div>

            <div className="text-overlay">
              <h2>{slide.text}</h2>
              <button className="try-now" onClick={handleTryNowClick}>
                Try Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Slider;

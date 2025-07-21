import React from "react";
import "./Pricing.css";

const plans = [
  {
    name: "Free Plan",
    price: "LKR 0",
    description: "Ideal for testing and demos.",
    features: [
      "100 API calls/month",
      "Text-only analysis",
      "No support",
      "Non-commercial use",
    ],
    button: "Get Started",
    popular: false,
  },
  {
    name: "Developer Plan",
    price: "LKR 1,500",
    description: "Great for developers integrating hate speech detection.",
    features: [
      "5,000 API calls/month",
      "Text & image analysis",
      "Standard support",
      "Usage analytics",
    ],
    button: "Start Now",
    popular: true,
  },
  {
    name: "Business Plan",
    price: "LKR 6,000",
    description: "For organizations needing advanced functionality.",
    features: [
      "25,000 API calls/month",
      "Full features: text, image, rationale highlighting",
      "Priority support",
      "Custom reports & SLA",
    ],
    button: "Contact Sales",
    popular: false,
  },
];

const Pricing = () => {
  return (
    <div className="pricing-container">
      <div className="pricing-header">
        <h1 className="pricing-title">Choose the Right Plan for Your Needs</h1>
        <p className="pricing-subtitle">
          Start detecting Sinhala hate speech — fast, accurate, and scalable.
        </p>
      </div>
      
      <div className="pricing-grid">
        {plans.map((plan, index) => (
          <div 
            className={`pricing-card ${plan.popular ? "popular" : ""}`}
            key={index}
          >
            {plan.popular && <div className="popular-badge">Most Popular</div>}
            
            <div className="card-header">
              <h3 className="plan-name">{plan.name}</h3>
              <div className="plan-price">
                <span className="price-amount">{plan.price}</span>
                <span className="price-period">/month</span>
              </div>
              <p className="plan-description">{plan.description}</p>
            </div>
            
            <div className="card-features">
              <ul>
                {plan.features.map((feature, i) => (
                  <li key={i}>
                    <svg className="feature-icon" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
            
            <button className={`card-button ${plan.popular ? "primary" : "secondary"}`}>
              {plan.button}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Pricing;
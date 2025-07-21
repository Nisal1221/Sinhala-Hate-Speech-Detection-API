import React from 'react';
import './ContentSection.css';

const ContentSection = () => {
  return (
    <div>
      <div>
        <div className="text-line">Empowering Safer Spaces: Detecting Hate, Inspiring Change</div>
      </div>
      <div className="card-grid">
        <div className="card green-card">
          <div className="circle green-circle"></div>
          <h2>Simple Yet Powerful</h2>
          <p>In a world full of complex problems, we make detecting hate speech as simple as a click. Using advanced AI, our system helps you tackle sensitive content effortlessly.</p>
        </div>
        <div className="card yellow-card">
          <div className="circle yellow-circle"></div>
          <div className="yellow-rectangle"></div>
          <h2>Spotting the Harmful and Promoting Peace</h2>
          <p>From hate-filled text to malicious images, our tool identifies harmful content, giving you the insights needed to create safer, more inclusive environments.</p>
        </div>
        <div className="card blue-card">
          <div className="circle blue-circle"></div>
          <div className="blue-square"></div>
          <h2>Analyze Any Source with Precision</h2>
          <p>Our system works seamlessly with text and images from social media, forums, feedback, or any other platform. Accurate analysis, no matter where the content comes from.</p>
        </div>
        <div className="card purple-card">
          <div className="triangle purple-triangle"></div>
          <h2>Interactive Insights</h2>
          <p>Make data meaningful! Our dynamic visualizations help you interpret results easily, enabling informed decisions and effective action.</p>
        </div>
      </div>

      <section className="highlight-section">
    <h1>What makes us <span className="highlight">unique</span></h1>
    <p className="description">
      HariWachana.lk is a powerful text analysis suite that analyses unstructured, complex data with an accuracy rate of 95% at an incredible speed, owing to our avant-garde tools based on the following tech, to derive actionable insights from copious amounts of complex contextual data across various sources:
    </p>

    <div className="highlight-content">
      <div className="image-box">
        <img src={require('../assets/sinhala.png')} alt="Sentiment Icons" />
      </div>

      <div className="cards-container">
        <div className="card nlp">
          <h3>NLP - Natural Language Processing</h3>
          <p>
            Natural Language Processing is the branch of AI that enables automated manipulation of natural language such as speech and text by software. Using data preprocessing techniques through NLP, Textrics interprets context from sourced data and converts it into machine language.
          </p>
        </div>

        <div className="card ml">
          <h3>ML - Machine Learning</h3>
          <p>
            ML enables systems to automatically learn from experience with unprompted programming and accurate problem solutions. Through the use of multiple frameworks and training, we transform contextual data into a language which the machine can interpret, hence allowing us to be domain agnostic.
          </p>
        </div>
        <div className="card nlp">
          <h3>DL - Deep Learning</h3>
          <p>
          Our system uses advanced deep learning models like XLM-RoBERTa, a transformer-based neural network, to understand complex patterns in Sinhala language. These models analyze both text and symbols at a deep level, enabling accurate hate speech detection even when offensive content is disguised or implicit.
          </p>
        </div>
        
      </div>
      
    </div>
  </section>
    </div>
  );
};

export default ContentSection;

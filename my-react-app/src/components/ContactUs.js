import React, { useState } from 'react';
import './ContactUs.css';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        const response = await fetch('http://localhost:5000/send-email', {

        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      if (response.ok) {
        alert('Message sent successfully!');
      } else {
        alert('Error sending message.');
      }
    } catch (error) {
      console.error('Email send error:', error);
      alert('Error sending message.');
    }
  };

  const handleClear = () => {
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      subject: '',
      message: ''
    });
  };

  return (
    <div className="contact-container">
      <div className="contact-info">
        <h2>Our Sri Lanka Office</h2>
        <div><strong>Headquarters</strong><br/>No. 123, Galle Road<br/>Colombo 03, Sri Lanka</div>
        <div><strong>Phone</strong><br/>+94 11 234 5678<br/>+94 75 068 4121</div>
        <div><strong>Email</strong><br/>info@hariwachana.lk<br/>support@hariwachana.lk</div>
        <div><strong>WhatsApp</strong><br/>075 068 4121<br/>Available 24/7</div>
        <div className="social-icons">
          <a href="#"><i className="fab fa-facebook-f"></i></a>
          <a href="#"><i className="fab fa-twitter"></i></a>
          <a href="#"><i className="fab fa-instagram"></i></a>
          <a href="#"><i className="fab fa-linkedin-in"></i></a>
        </div>
      </div>

      <form className="contact-form" onSubmit={handleSubmit}>
        <h2>Send Us a Message</h2>
        <div className="form-row">
          <input type="text" name="firstName" placeholder="First name" required value={formData.firstName} onChange={handleChange} />
          <input type="text" name="lastName" placeholder="Last name" required value={formData.lastName} onChange={handleChange} />
        </div>
        <input type="email" name="email" placeholder="Email" required value={formData.email} onChange={handleChange} />
        <input type="text" name="phone" placeholder="Phone (Sri Lanka)" required value={formData.phone} onChange={handleChange} />
        <select name="subject" required value={formData.subject} onChange={handleChange}>
          <option value="">Select a subject</option>
          <option value="General Inquiry">General Inquiry</option>
          <option value="Technical Support">Technical Support</option>
          <option value="Partnership">Partnership</option>
        </select>
        <textarea name="message" placeholder="Message" required value={formData.message} onChange={handleChange}></textarea>
        <div className="form-buttons">
          <button type="submit" className="blue-button">Send Message</button>
          <button type="button" className="outline-button" onClick={handleClear}>Clear Form</button>
        </div>
      </form>
    </div>
  );
};

export default ContactUs;

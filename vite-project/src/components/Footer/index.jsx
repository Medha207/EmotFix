import React, { useState } from 'react';
import './index.css';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [showContactModal, setShowContactModal] = useState(false);
  const [contactForm, setContactForm] = useState({ name: '', email: '', message: '' });
  const [contactMessage, setContactMessage] = useState('');

  const handleSubscribe = (e) => {
    e.preventDefault();

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email.trim()) {
      setMessage('Please enter your email address');
      setTimeout(() => setMessage(''), 3000);
      return;
    }

    if (!emailRegex.test(email)) {
      setMessage('Please enter a valid email address');
      setTimeout(() => setMessage(''), 3000);
      return;
    }

    // Success
    setMessage('🎉 Successfully subscribed! Check your inbox.');
    setEmail('');
    setTimeout(() => setMessage(''), 5000);
  };

  const handleContactSubmit = (e) => {
    e.preventDefault();

    if (!contactForm.name.trim() || !contactForm.email.trim() || !contactForm.message.trim()) {
      setContactMessage('Please fill in all fields');
      setTimeout(() => setContactMessage(''), 3000);
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(contactForm.email)) {
      setContactMessage('Please enter a valid email address');
      setTimeout(() => setContactMessage(''), 3000);
      return;
    }

    // Success
    setContactMessage('✅ Message sent! We\'ll get back to you soon.');
    setContactForm({ name: '', email: '', message: '' });
    setTimeout(() => {
      setContactMessage('');
      setShowContactModal(false);
    }, 3000);
  };

  return (
    <footer className="footer-section">
      <div className="footer-content">
        {/* Left Section - Brand */}
        <div className="footer-brand">
          <h2>🎬 EmotiFlix</h2>
          <p>Watch movies that match your mood.</p>
          <div className="social-icons">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"><i className="fab fa-facebook"></i></a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"><i className="fab fa-instagram"></i></a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"><i className="fab fa-twitter"></i></a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer"><i className="fab fa-youtube"></i></a>
          </div>
        </div>

        {/* Middle Section - Quick Links */}
        <div className="footer-links">
          <h4>Explore</h4>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/#moods">Moods</a></li>
            <li><a href="/#faq">FAQs</a></li>
            <li><button className="contact-link" onClick={() => setShowContactModal(true)}>Contact Us</button></li>
          </ul>
        </div>

        {/* Right Section - Newsletter */}
        <div className="footer-newsletter">
          <h4>Stay Updated</h4>
          <p>Subscribe for weekly mood-based movie picks 🎥</p>
          <form onSubmit={handleSubscribe}>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button type="submit">Subscribe</button>
          </form>
          {message && <p className="subscribe-message">{message}</p>}
        </div>
      </div>

      {/* Bottom Line */}
      <div className="footer-bottom">
        <p>© 2025 EmotiFlix | Built with ❤️ by Emily</p>
      </div>

      {/* Contact Us Modal */}
      {showContactModal && (
        <div className="contact-modal" onClick={() => setShowContactModal(false)}>
          <div className="contact-modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="contact-modal-close" onClick={() => setShowContactModal(false)}>
              ✕
            </button>
            <h2>Contact Us</h2>
            <p>We'd love to hear from you! Send us a message.</p>
            <form onSubmit={handleContactSubmit}>
              <input
                type="text"
                placeholder="Your Name"
                value={contactForm.name}
                onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
              />
              <input
                type="email"
                placeholder="Your Email"
                value={contactForm.email}
                onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
              />
              <textarea
                placeholder="Your Message"
                rows="5"
                value={contactForm.message}
                onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
              ></textarea>
              <button type="submit">Send Message</button>
            </form>
            {contactMessage && <p className="contact-feedback">{contactMessage}</p>}
          </div>
        </div>
      )}
    </footer>
  );
};

export default Footer;





































































// const Footer = () => (
//     <footer className="footer">
//         <div className="footer-content">
//             <div className="footer-text">
//                 <p>© 2025 EmotiFlix</p>
//                 <span className="heart-divider">Made with <span className="heart">❤️</span> by Emily</span>
//             </div>
//             <div className="social-links">
//                 <a href="#" className="social-link" aria-label="Instagram">
//                     <i className="fab fa-instagram"></i>
//                 </a>
//                 <a href="#" className="social-link" aria-label="Twitter">
//                     <i className="fab fa-twitter"></i>
//                 </a>
//                 <a href="#" className="social-link" aria-label="LinkedIn">
//                     <i className="fab fa-linkedin"></i>
//                 </a>
//             </div>
//         </div>
//     </footer>
// );

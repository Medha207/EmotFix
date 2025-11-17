import React from 'react';
import './index.css';

const Footer = () => (
<footer className="footer-section">
  <div className="footer-content">
    {/* Left Section - Brand */}
    <div className="footer-brand">
      <h2>🎬 EmotiFlix</h2>
      <p>Watch movies that match your mood.</p>
      <div className="social-icons">
        <a href="#"><i className="fab fa-facebook"></i></a>
        <a href="#"><i className="fab fa-instagram"></i></a>
        <a href="#"><i className="fab fa-twitter"></i></a>
        <a href="#"><i className="fab fa-youtube"></i></a>
      </div>
    </div>

    {/* Middle Section - Quick Links */}
    <div className="footer-links">
      <h4>Explore</h4>
      <ul>
        <li><a href="#">Home</a></li>
        <li><a href="#">Moods</a></li>
        <li><a href="#">FAQs</a></li>
        <li><a href="#">Contact Us</a></li>
      </ul>
    </div>

    {/* Right Section - Newsletter */}
    <div className="footer-newsletter">
      <h4>Stay Updated</h4>
      <p>Subscribe for weekly mood-based movie picks 🎥</p>
      <form>
        <input type="email" placeholder="Enter your email" />
        <button type="submit">Subscribe</button>
      </form>
    </div>
  </div>

  {/* Bottom Line */}
  <div className="footer-bottom">
    <p>© 2025 EmotiFlix | Built with ❤️ by Emily</p>
  </div>
</footer>

);

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

import React from 'react';
import './Footer.css'; 

const Footer = () => {
  return (
    <footer>
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} WiseRate. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
import React from 'react';
import { Link } from "react-router-dom"


const Footer = () => {
  return (
    <footer>
       <div className="footer-container">
        <div className="footer-left">© 2024 ООО «ДЕЛЬРОН» </div>
          <div className="footer-right">
            <ul className='footer-links'>
            <li><Link to="/terms-of-service" target='_blank' >Пользовательское соглашение</Link></li>
            <li><Link to="/privacy-policy" target='_blank' >Политика конфиденциальности</Link></li>
            </ul>
          </div>
        </div>
    </footer>

  );
};

export default Footer;

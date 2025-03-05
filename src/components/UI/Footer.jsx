import React from 'react';
// import { Link } from "react-router-dom"
// import { ReactComponent as TelegramIcon }  from '../../styles/assets/icons/telegram.svg';
// import { ReactComponent as VKIcon }  from '../../styles/assets/icons/vk.svg';
// import { ReactComponent as WhatsAppIcon }  from '../../styles/assets/icons/whatsapp.svg';

const Footer = () => {
  return (
    <footer>
       <div className="footer-container">
          <div className="footer-left">Copyright © 2024 Delrone | All Rights Reserved </div>
          <div className="footer-right">
            <ul className='footer-links'>
              <li>Пользовательское соглашение</li>
              <li>лец 1</li>
              <li>лец 2</li>
            </ul>
          </div>
        </div>
    </footer>

  );
};

export default Footer;
{/* <div className="social-links">
    <Link className = "Link" to="/"><TelegramIcon/></Link>
    <Link className = "Link" to="/"><VKIcon/></Link>
    <Link className = "Link" to="/"><WhatsAppIcon/></Link>
</div>  */}
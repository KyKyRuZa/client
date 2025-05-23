import React, { useState } from 'react';
import { Link } from "react-router-dom"
import { useAuth } from '../Auth/Auth';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleUser} from '@fortawesome/free-solid-svg-icons'

const Navbar = () => {
  const { user } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  
  return (
    <header> 
        <nav className="header-container" >
          <div className='nav-left'>
            <Link to="/"><div className="logo">Delron</div></Link>
          </div>
          <div className="hamburger" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <CloseIcon /> : <MenuIcon />}
          </div>
          <div className={`nav-right ${isMenuOpen ? 'active' : ''}`}>
              {user ? (
              <>
                <Link to={`/profile/${user?.role}/${user?.id}`} className="profile-btn">
                  <FontAwesomeIcon icon={faCircleUser} />  
                  <span style={{ marginLeft: '8px' }}>{user.firstName}</span>
                </Link>
              </>
            ) : (
              <>
                <Link to="/login" className="login-btn">
                  Войти
                </Link>
                <Link to="/register" className="reg-btn">
                  Регистрация
                </Link>
              </>
              
            )}
          </div>
        </nav>
    </header>
   
  );
};

export default Navbar;

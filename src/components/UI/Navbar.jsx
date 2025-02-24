import React from 'react';
import { Link, useNavigate } from "react-router-dom"
import { useAuth } from '../Auth/Auth';


const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };
  return (
    <header> 
        <nav className="header-container">
          <div className='nav-left'>
            <Link to="/"><div className="logo">Delron</div></Link>
          </div>
          <div className="nav-right">
              {user ? (
              <>
                <Link to="/profile" className="profile-btn">
                  {user.username || 'Профиль'}
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

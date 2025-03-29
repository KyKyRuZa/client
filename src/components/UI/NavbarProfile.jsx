import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom"
import { useAuth } from '../Auth/Auth';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
  faCircleUser,
  faTag,
  faList,
  faCartShopping,
  faRightFromBracket,
  faAngleDoubleLeft,
  faAngleDoubleRight,
  faGear
} from '@fortawesome/free-solid-svg-icons'
import { faBasketShopping } from '@fortawesome/free-solid-svg-icons'
import '../../styles/global.css';
import '../../styles/profile.css';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';

const Navbar = ({ setActiveView, onCollapse }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };
  const handleCollapse = () => {
    setIsCollapsed(!isCollapsed);
    onCollapse(!isCollapsed);
  };
  const handleViewChange = (view) => {
    navigate(`/profile/${view}`);
    setIsMenuOpen(false);
  };

  return (
    <div className={`sidebar ${isCollapsed ? 'collapsed' : ''}`}>
      <div className="sidebar-header">
        <Link className="brand" to="/">
          <span className='mini'>D</span>
          {!isCollapsed && <span className='full'>Delron</span>}
        </Link>
        <div className="hamburger" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <CloseIcon /> : <MenuIcon />}
        </div>
        <button 
          className="collapse-btn"
          onClick={handleCollapse}
        >
          {isCollapsed ? <FontAwesomeIcon icon={faAngleDoubleRight} size="lg"/> : <FontAwesomeIcon icon={faAngleDoubleLeft} size="lg"/>}
        </button>
      </div>


      <nav className={`sidebar-nav ${isMenuOpen ? 'active' : ''}`}>
        <div className="nav-header">
          {!isCollapsed && <span >Меню навигации</span>}
        </div>
        <div className="nav-item" onClick={() => handleViewChange(`${user.role}`)}>
        <FontAwesomeIcon icon={faCircleUser} size="lg"/>
          {!isCollapsed && <span>Профиль</span>}
        </div>

        {user?.role === 'администратор' && (
          <div className="nav-item" onClick={() => handleViewChange('admin-catalog')}>
            <FontAwesomeIcon icon={faList} size="lg"/>
            {!isCollapsed && <span>Каталог</span>}
          </div>
        )}

        <div className="nav-item" onClick={() => handleViewChange('orders')}>
        <FontAwesomeIcon icon={faCartShopping} size="lg"/>
          {!isCollapsed && <span>Заказы</span>}
        </div>

        <div className="nav-item" onClick={() => handleViewChange('basket')}>
        <FontAwesomeIcon icon={faBasketShopping} size="lg" />
          {!isCollapsed && <span>Корзина</span>}
        </div>

        {user?.role === 'администратор' && (
          <>
            <div className="nav-item" onClick={() => handleViewChange('sells')}>
            <FontAwesomeIcon icon={faTag} size="lg"/>
              {!isCollapsed && <span>Продажи</span>}
            </div>
          </>
        )}
         <div className="nav-item" onClick={() => handleViewChange('settings')}>
         <FontAwesomeIcon icon={faGear} size="lg"/>
              {!isCollapsed && <span>Настройки</span>}
            </div>
      </nav>

      <div className={`sidebar-footer ${isMenuOpen ? 'active' : ''}`}>
        <button onClick={handleLogout} className="logout-btn">
        <FontAwesomeIcon icon={faRightFromBracket} size="lg"/>
          {!isCollapsed && <span>Выйти</span>}
        </button>
      </div>
    </div>
  );  
};

export default Navbar;

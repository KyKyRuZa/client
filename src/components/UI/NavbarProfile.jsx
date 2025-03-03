import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom"
import { useAuth } from '../Auth/Auth';
import Sell from '@mui/icons-material/Sell';
import ViewList from '@mui/icons-material/ViewList';
import ShoppingCart from '@mui/icons-material/ShoppingCart';
import Logout from '@mui/icons-material/Logout';
import ArrowLeft from '@mui/icons-material/KeyboardDoubleArrowLeft';
import ArrowRight from '@mui/icons-material/KeyboardDoubleArrowRight';
import Person from '@mui/icons-material/Person';
import Settings from '@mui/icons-material/Settings';
import '../../styles/global.css';
import '../../styles/profile.css';
const Navbar = ({ setActiveView, onCollapse }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };
  const handleCollapse = () => {
    setIsCollapsed(!isCollapsed);
    onCollapse(!isCollapsed);
  };
  const handleViewChange = (view) => {
    setActiveView(view);
  };

  return (
    <div className={`sidebar ${isCollapsed ? 'collapsed' : ''}`}>
      <div className="sidebar-header">
        <Link className="brand" to="/">
          D
          {!isCollapsed && <span>DELRON</span>}
        </Link>
        <button 
          className="collapse-btn"
          onClick={handleCollapse}
        >
          {isCollapsed ? <ArrowRight/> : <ArrowLeft/>}
        </button>
      </div>


      <nav className="sidebar-nav">
        <div className="nav-header">
          {!isCollapsed && <span >Меню навигации</span>}
        </div>
        <div className="nav-item" onClick={() => handleViewChange('profile')}>
          <Person />
          {!isCollapsed && <span>Профиль</span>}
        </div>

        {user?.role === 'администратор' && (
          <div className="nav-item" onClick={() => handleViewChange('catalog')}>
            <ViewList />
            {!isCollapsed && <span>Каталог</span>}
          </div>
        )}

        <div className="nav-item" onClick={() => handleViewChange('orders')}>
          <ShoppingCart />
          {!isCollapsed && <span>Заказы</span>}
        </div>

        <div className="nav-item" onClick={() => handleViewChange('basket')}>
          <ShoppingCart />
          {!isCollapsed && <span>Корзина</span>}
        </div>

        {user?.role === 'администратор' && (
          <>
            <div className="nav-item" onClick={() => handleViewChange('sells')}>
              <Sell />
              {!isCollapsed && <span>Продажи</span>}
            </div>
          </>
        )}
         <div className="nav-item" onClick={() => handleViewChange('settings')}>
              <Settings />
              {!isCollapsed && <span>Настройки</span>}
            </div>
      </nav>

      <div className="sidebar-footer">
        <button onClick={handleLogout} className="logout-btn">
          <Logout />
          {!isCollapsed && <span>Выйти</span>}
        </button>
      </div>
    </div>
  );  
};

export default Navbar;

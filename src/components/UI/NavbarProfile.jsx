import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom"
import { useAuth } from '../Auth/Auth';
import SellIcon from '@mui/icons-material/Sell';
import ViewListIcon from '@mui/icons-material/ViewList';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import LogoutIcon from '@mui/icons-material/Logout';
import DashboardIcon from '@mui/icons-material/Dashboard';
import '../../styles/global.css';
import '../../styles/profile.css'

const Navbar = ({ setActiveView }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleViewChange = (view) => {
    setActiveView(view);
  };

  return (
    <div className={`sidebar ${isCollapsed ? 'collapsed' : ''}`}>
      <div className="sidebar-header">
        <Link className="brand" to="/">
          <DashboardIcon />
          {!isCollapsed && <span>Delron</span>}
        </Link>
        <button 
          className="collapse-btn"
          onClick={() => setIsCollapsed(!isCollapsed)}
        >
          {isCollapsed ? '→' : '←'}
        </button>
      </div>

      <div className="user-profile">
        {!isCollapsed && (
          <div className="user-info" onClick={() => handleViewChange('profile')}>
            <span className="user-name">{`${user?.lastName || ''} ${user?.firstName || ''}`}</span>
            <span className="user-role">{user?.role}</span>
          </div>
        )}
      </div>

      <nav className="sidebar-nav">
        <div className="nav-item" onClick={() => handleViewChange('orders')}>
          <ShoppingCartIcon />
          {!isCollapsed && <span>Заказы</span>}
        </div>
        <div className="nav-item" onClick={() => handleViewChange('basket')}>
          <ShoppingCartIcon />
          {!isCollapsed && <span>Корзина</span>}
        </div>
        {user?.role === 'администратор' && (
          <>
            <div className="nav-item" onClick={() => handleViewChange('catalog')}>
              <ViewListIcon />
              {!isCollapsed && <span>Каталог</span>}
            </div>
            <div className="nav-item" onClick={() => handleViewChange('sells')}>
              <SellIcon />
              {!isCollapsed && <span>Продажи</span>}
            </div>
          </>
        )}
        
      </nav>

      <div className="sidebar-footer">
        <button onClick={handleLogout} className="logout-btn">
          <LogoutIcon />
          {!isCollapsed && <span>Выйти</span>}
        </button>
      </div>
    </div>
  );  
};

export default Navbar;

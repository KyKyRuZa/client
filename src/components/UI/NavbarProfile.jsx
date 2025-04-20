import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom"
import { useAuth } from '../Auth/Auth';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
  faCircleUser,
  faAngleDown,
  faAngleRight,
  faTag,
  faList,
  faBell,
  faCartShopping,
  faRightFromBracket,
  faAngleDoubleLeft,
  faAngleDoubleRight,
  faGear,
  faClipboardList
} from '@fortawesome/free-solid-svg-icons'
import '../../styles/global.css';
import '../../styles/profile/profile.css';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';

const Navbar = ({ setActiveView, onCollapse }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navItems = [
    { id: 'userprofile', icon: faCircleUser, text: 'Профиль',path: 'profile',role: 'user',
      subItems : [
        { id: 'profile', text: 'Профиль', path: `${user?.role}/${user?.id}` },
        { id: 'profile-settings', text: 'Настройки профиля', path: `settings` },
      ]
    },
    { id: 'adminprofile', icon: faCircleUser, text: 'Профиль', path: 'profile', role: 'super_admin',
      subItems : [
        { id: 'profile', text: 'Профиль', path: `${user?.role}/${user?.id}` },
        { id: 'profile-settings', text: 'Настройки профиля', path: 'settings' },
        { id: 'statistic', text: 'Статистика', path: 'statistic'},
        { id: 'users', text: 'Пользователи', path: 'users' },      
      ]
    },
    { id: 'catalog', icon: faList, text: 'Каталог', path: 'admin-catalog', role: 'super_admin',
      subItems: [
        { id: 'products', text: 'Товары', path: 'products' },
        { id: 'categories', text: 'Категории', path: 'categories' }
      ] 
    },
    { id: 'products', icon: faCartShopping,text: 'Товары', path: 'products', role: 'user',
      subItems: [
        { id: 'orders', text: 'Заказы', path: 'orders' }, 
        { id: 'basket', text: 'Корзина', path: 'basket' },
      ]
    },
    { id: 'sells', icon: faTag, text: 'Продажи', path: 'sells', role: 'super_admin' },
    { id: 'notifications', icon: faBell, text: 'Уведомления', path: 'notifications'},
    { id: 'logs', icon: faClipboardList, text: 'Логи', path: 'logs', role: 'super_admin'},
    { id: 'settings', icon: faGear, text: 'Настройки', path: 'settings',  role: 'super_admin', 
      subItems: [
        
        { id: 'security', text: 'Безопасность', path: 'security',},
        { id: 'backup-settings', text: 'Настройки бэкапа', path: 'backup-settings' }
      ]
    }
    
  ];


const NavItem = ({ icon, text, onClick, isCollapsed, subItems, basePath }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className="nav-item" onClick={() => subItems ? setIsOpen(!isOpen) : onClick()}>
        <FontAwesomeIcon icon={icon} size="lg" />
        {!isCollapsed && (
          <>
            <span>{text}</span>
            {subItems && <FontAwesomeIcon icon={isOpen ? faAngleDown : faAngleRight} />}
          </>
        )}
      </div>
      {!isCollapsed && isOpen && subItems && (
        <div className="nav-subitems">
          {subItems.map(subItem => (
            <div
              key={subItem.id}
              className="nav-subitem"
              onClick={(e) => {
                e.stopPropagation();
                navigate(`/${basePath}/${subItem.path}`);
              }}
            >
              {subItem.text}
            </div>
          ))}
        </div>
      )}
    </>
  );
};

const handleLogout = () => {
  logout();
  navigate('/login');
};

const handleCollapse = () => {
  setIsCollapsed(!isCollapsed);
  onCollapse(!isCollapsed);
};

const handleViewChange = (path) => {
  if (typeof path === 'function') {
    navigate(`/profile/${path(user)}`);
  } else {
    navigate(`/${path}`);
  }
  setIsMenuOpen(false);
};

return (
  <div className={`sidebar ${isCollapsed ? 'collapsed' : ''}`}>
    <div className="sidebar-header">
      <Link className="brand" to="/">
        <span>{isCollapsed ? 'D' : 'Delron'}</span>
      </Link>
      <div className="hamburger" onClick={() => setIsMenuOpen(!isMenuOpen)}>
        {isMenuOpen ? <CloseIcon /> : <MenuIcon />}
      </div>
      <button className="collapse-btn" onClick={handleCollapse}>
        {isCollapsed ? <FontAwesomeIcon icon={faAngleDoubleRight} size="lg" /> : <FontAwesomeIcon icon={faAngleDoubleLeft} size="lg" />}
      </button>
    </div>

    <nav className={`sidebar-nav ${isMenuOpen ? 'active' : ''}`}>
      <div className="nav-header">
        {!isCollapsed && <span>Меню навигации</span>}
      </div>
      {navItems.map(item => (
        ((item.role && user?.role === item.role) || !item.role) && (
          <NavItem
            key={item.id}
            icon={item.icon}
            text={item.text}
            subItems={item.subItems}
            basePath={item.path}
            onClick={() => handleViewChange(typeof item.path === 'function' ? item.path(user) : item.path)}
            isCollapsed={isCollapsed}
          />
        )
      ))}
    </nav>

    <div className={`sidebar-footer ${isMenuOpen ? 'active' : ''}`}>
      <button onClick={handleLogout} className="logout-btn">
        <FontAwesomeIcon icon={faRightFromBracket} size="lg" />
        {!isCollapsed && <span>Выйти</span>}
      </button>
    </div>
  </div>
);
};

export default Navbar;

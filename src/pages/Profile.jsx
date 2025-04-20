import React, { useState } from 'react';
import { useNavigate,useLocation } from 'react-router-dom';
import { useAuth } from '../components/Auth/Auth';
import Navbar from '../components/UI/NavbarProfile';
import { ProfileInfo } from './user/ProfileInfo';
import { AdminCatalog } from './admin/AdminCatalog';
import { Orders } from './user/Order';
import { Basket } from './user/Basket';
import { Sells } from './admin/Sells';
import { Settings } from './user/Settings';
import { Statistic } from './admin/Statistic';
import { Users } from './admin/User'
import { Logs } from './admin/Logs'
import '../styles/profile/main.css';
import '../styles/profile/admin.css';
import '../styles/profile/catalog.css';
import '../styles/profile/basket.css';
import '../styles/profile/setting.css';
import '../styles/profile/logs.css';
import '../styles/profile/media.css';

export const Profile = () => {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const { user } = useAuth();
    const navigate = useNavigate();
   
    const renderContent = () => {
        const location = useLocation(); 
        const pathSegments = location.pathname.split('/');
        
        switch (location.pathname) {
            case `/profile/${user?.role}/${user?.id}`:
                return <ProfileInfo user={user} />;
            case '/profile/statistic':
                return <Statistic user={user}/>;
            case '/products/basket':
                return <Basket />;
            case '/profile/users':
                return < Users />
            case '/admin-catalog/products':
                return <AdminCatalog />;
            case '/admin-catalog/categories':
                return <AdminCatalog />;
            case '/products/sells':
                return <Sells />;
            case '/products/orders':
                return <Orders />;
            case '/logs':
                return <Logs/>
            case '/profile/settings':
                return <Settings />;
            default:
                return null;
        }
    };

    return (
        <div className="profile-container">
            <Navbar onCollapse={setIsCollapsed} />
            <main className={`main-content ${isCollapsed ? 'collapsed' : ''}`}>
                <div className="dashboard-container">
                    {renderContent()}
                </div>
            </main>
        </div>
    );
};

export default Profile;
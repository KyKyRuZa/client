import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../components/Auth/Auth';
import Navbar from '../components/UI/NavbarProfile';
import { ProfileInfo } from './ProfileInfo';
import { AdminCatalog } from './AdminCatalog';
import { Orders } from './Order';
import { Basket } from './Basket';
import { Sells } from './Sells';
import { Settings } from './Settings';
import '../styles/main.css';

export const Profile = () => {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const { user } = useAuth();
    const navigate = useNavigate();

    const renderContent = () => {
        switch(window.location.pathname.split('/').pop()) {
            case `${user?.role}`:
                return <ProfileInfo user={user} />;
            case 'basket':
                return <Basket />;
            case 'admin-catalog':
                return <AdminCatalog />;
            case 'sells':
                return <Sells />;
            case 'orders':
                return <Orders />;
            case 'settings':
                return <Settings />;
            default:
                return <ProfileInfo user={user} />;
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
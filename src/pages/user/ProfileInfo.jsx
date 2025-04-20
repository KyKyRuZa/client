import React, { useEffect, useState } from 'react';
import profileService from '../../api/profile'

export const ProfileInfo = ({ user }) => {
    const [statistics, setStatistics] = useState(null);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const fetchStatistics = async () => {
            try {
                const response = await profileService.getStatistics();
                setStatistics(response.data);
            } catch (error) {
                console.error('Error fetching statistics:', error);
            } finally {
                setLoading(false);
            }
        };
    
        if (user?.role === 'super_admin') {
            fetchStatistics();
        }
    }, [user]);

    
    return (
    <>
        <div className="profile-card">
            <div className="user-card">
                <div className="profile-name">{user?.firstName || ''} {user?.lastName || ''}</div>
                <div>{new Date(user?.createdAt).toLocaleDateString()}</div>
                <div className="profile-content">
                    <div className='profile-title'>Контактные данные</div>
                    <div className='profile-info'> 
                        <div>Телефон</div>
                        <div className='right'>{user?.phone || '-'}</div> 
                    </div>
                    <div className='profile-info'> 
                        <div>Email</div> 
                        <div className='right'>{user?.email || '-'}</div>
                    </div>
                </div>
            </div>
        </div>
    </>
    )
};
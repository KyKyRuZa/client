import React, { useEffect, useState } from 'react';
import axios from 'axios';
import profileService from '../api/profile'

export const ProfileInfo = ({ user }) => {
    const [statistics, setStatistics] = useState(null);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const fetchStatistics = async () => {
            try {
                const response = await profileService(); // Замените URL на ваш API
                setStatistics(response.data); // Axios автоматически парсит JSON
            } catch (error) {
                console.error('Ошибка при получении статистики:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchStatistics();
    }, []);

    
    return (
    <>
        <div className="profile-card">
            {user?.role === 'user' && (
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
            )}
            {user?.role === 'admin' && (
                <div className="admin-card">
                <div className="profile-content">
                    
    
                    {/* Отображение статистики */}
                    <div className="profile-title">Статистика</div>
                    {loading ? (
                        <div>Загрузка статистики...</div>
                    ) : statistics ? (
                        <>
                            <div className='profile-info'>
                                <div>Количество товаров</div>
                                <div className='right'>{statistics.totalProducts}</div>
                            </div>
                            <div className='profile-info'>
                                <div>Количество пользователей</div>
                                <div className='right'>{statistics.totalUsers}</div>
                            </div>
                            <div className='profile-info'>
                                <div>Количество заказов</div>
                                <div className='right'>{statistics.totalOrders}</div>
                            </div>
                            <div className='profile-info'>
                                <div>Общая выручка</div>
                                <div className='right'>{statistics.totalRevenue} ₽</div>
                            </div>
                        </>
                    ) : (
                        <div>Не удалось загрузить статистику</div>
                    )}
                </div>
            </div>
            )}
        </div>
    </>
    )
};
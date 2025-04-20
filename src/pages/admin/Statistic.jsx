import React, { useState, useEffect } from "react"
import profileService from '../../api/profile'


export const Statistic = ({ user }) => {
    const [loading, setLoading] = useState(true);
    const [statistics, setStatistics] = useState(null);

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
    
        fetchStatistics();
    }, [user]);

    return (
        <div className="admin-card">
            <div className="admin-content">
                <div className="admin-title">Статистика</div>
                {loading ? (
                    <div>Загрузка статистики...</div>
                ) : statistics ? (
                    <div className="admin-info">
                        <div className="stat-box">
                            <div className="stat-value">{statistics.totalProducts}</div>
                            <div className="stat-label">Количество товаров</div>
                        </div>
                        <div className="stat-box">
                            <div className="stat-value">{statistics.totalUsers}</div>
                            <div className="stat-label">Количество пользователей</div>
                        </div>
                        <div className="stat-box">
                            <div className="stat-value">{statistics.totalOrders}</div>
                            <div className="stat-label">Количество заказов</div>
                        </div>
                        <div className="stat-box">
                            <div className="stat-value">{statistics.totalRevenue} ₽</div>
                            <div className="stat-label">Общая выручка</div>
                        </div>
                    </div>
                ) : (
                    <div>Не удалось загрузить статистику</div>
                )}
            </div>
        </div>
    );
};

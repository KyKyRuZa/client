// Orders.js
import React, { useState } from 'react';
import InfoMessage from '../components/UI/InfoMessage';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faList } from '@fortawesome/free-solid-svg-icons';

export const Orders = () => {
    const [orders, setOrders] = useState([]);

    return (
        <div className="order-card">
            <h3 className="order-title">Заказы</h3>
            <div className="order-content">
                {orders.length === 0 ? (
                    <InfoMessage 
                        icon={<FontAwesomeIcon icon={faList} />}
                        message="У вас пока нет заказов"
                    />
                ) : (
                    <div className="order-history">
                        {orders.map(order => (
                            <div key={order.id} className="order-item">
                                <div className="order-header">
                                    <span>Заказ №{order.id}</span>
                                    <span>{order.date.toLocaleDateString()}</span>
                                    <span className={`order-status ${order.status.toLowerCase()}`}>
                                        {order.status}
                                    </span>
                                </div>
                                <div className="order-profiles">
                                    {order.items.map(item => (
                                        <div key={item.name} className="order-item-profile">
                                            <span>{item.name}</span>
                                            <span>Количество: {item.quantity}</span>
                                            <span>{item.price} ₽</span>
                                        </div>
                                    ))}
                                </div>
                                <div className="order-total">
                                    Итого: {order.total} ₽
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};
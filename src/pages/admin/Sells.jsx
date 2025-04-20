// Sells.js
import React, { useState } from 'react';
import InfoMessage from '../../components/UI/InfoMessage';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoneyBillWave } from '@fortawesome/free-solid-svg-icons';

export const Sells = () => {
    const [sales, setSales] = useState([]);

    return (
        <div className="sells-card">
            <h3 className="sells-title">Продажи</h3>
            <div className="sells-content">
                {sales.length === 0 ? (
                    <InfoMessage 
                        icon={<FontAwesomeIcon icon={faMoneyBillWave} />}
                        message="У вас пока нет продаж"
                    />
                ) : (
                    <div className="sales-history">
                        {sales.map(sale => (
                            <div key={sale.id} className="sale-item">
                                <div className="sale-header">
                                    <span>Продажа №{sale.id}</span>
                                    <span>{sale.date.toLocaleDateString()}</span>
                                </div>
                                <div className="sale-profiles">
                                    {sale.items.map(item => (
                                        <div key={item.name} className="sale-item-profile">
                                            <span>{item.name}</span>
                                            <span>Количество: {item.quantity}</span>
                                            <span>{item.price} ₽</span>
                                        </div>
                                    ))}
                                </div>
                                <div className="sale-total">
                                    Итого: {sale.total} ₽
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};
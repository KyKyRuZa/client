import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import paymentService from '../api/payment';
import '../styles/payment.css';

const Payment = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const [paymentData, setPaymentData] = useState(null);
  const [status, setStatus] = useState('pending');

  useEffect(() => {
    const fetchPaymentData = async () => {
      try {
        const response = await paymentService.getPaymentStatus(orderId);
        setPaymentData(response.payment);
      } catch (error) {
        console.error('Error fetching payment:', error);
      }
    };

    fetchPaymentData();
    const interval = setInterval(fetchPaymentData, 5000);
    return () => clearInterval(interval);
  }, [orderId]);

  const handleBackToCatalog = () => {
    navigate('/catalog');
  };

  return (
    <div className="payment-wrapper">
      <div className="payment-container">
        <h2>Оплата заказа</h2>
        
        {paymentData && (
          <div className="payment-details">
            <div className="payment-info">
              <p>Номер заказа: <span>{paymentData.orderId}</span></p>
              <p>Сумма: <span>{paymentData.amount} ₽</span></p>
              <p>Статус: <span className={`status ${paymentData.status.toLowerCase()}`}>
                {paymentData.status}
              </span></p>
            </div>

            <div className="qr-section">
              <h3>Отсканируйте QR-код для оплаты</h3>
              {paymentData.qrCode && (
                <img 
                  src={paymentData.qrCode} 
                  alt="QR код для оплаты" 
                  className="qr-code"
                />
              )}
              <p className="qr-instruction">
                Откройте приложение банка и отсканируйте QR-код
              </p>
            </div>

            <button 
              className="back-button"
              onClick={handleBackToCatalog}
            >
              Вернуться в каталог
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Payment;

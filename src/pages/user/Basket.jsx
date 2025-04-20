// Basket.js
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../components/Auth/Auth';
import InfoMessage from '../../components/UI/InfoMessage';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faTrash } from '@fortawesome/free-solid-svg-icons';
import { IconButton } from '@mui/material';
import basketService from '../../api/basket';

export const Basket = () => {
    const { user } = useAuth();
    const [basketItems, setBasketItems] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchBasket = async () => {
            try {
                const basketData = await basketService.fetchBasket(user.id);
                setBasketItems(basketData);
            } catch (error) {
                console.error('Ошибка при получении корзины:', error);
            }
        };
        if (user && user.id) {
            fetchBasket();
        }
    }, [user]);

    const refreshBasket = async () => {
        try {
            const basketData = await basketService.fetchBasket(user.id);
            setBasketItems(basketData);
        } catch (error) {
            console.error('Error fetching basket:', error);
        }
    };

    const handleBasketUpdate = async () => {
        await refreshBasket(); 
    };

    const incrementQuantity = async (productId) => {
        try {
            const response = await basketService.incrementQuantity(user.id, productId);
            if (response) {
                await handleBasketUpdate(); 
            }
        } catch (error) {
            console.error('Error incrementing quantity:', error);
        }
    };

    const decrementQuantity = async (productId) => {
        try {
            const response = await basketService.decrementQuantity(user.id, productId);
            if (response) {
                await handleBasketUpdate(); 
            }
        } catch (error) {
            console.error('Error decrementing quantity:', error);
        }
    };

    const removeFromCart = async (productId) => {
        try {
            await basketService.removeFromCart(user.id, productId); // Используем сервис
            setBasketItems(basketItems.filter(item => item.productId !== productId));
            await handleBasketUpdate();
        } catch (error) {
            console.error('Error removing from cart:', error);
        }
    };

    const handlePayment = () => {
        const orderId = Date.now();
        navigate(`/payment/${orderId}`);
    };

    return (
        <div className="basket-container">
            <div className='basket-title'>Корзина</div>
            <div className="basket-items">
                {basketItems.length === 0 ? (
                        <InfoMessage 
                            icon={<FontAwesomeIcon icon={faShoppingCart} />}
                            message={
                                <>
                                    Ваша корзина пуста.<br/> Хотите перейти в{' '}
                                    <a href="/catalog" style={{ color: 'white', textDecoration: 'underline' }}>
                                        каталог
                                    </a>
                                    ?
                                </>
                            }
                            
                        />

                ) : (
                    <>
                        {basketItems.map((item) => (
                            <div key={item.id} className="basket-item">
                                <div className="basket-actions">
                                    <IconButton className="icon-button delete">
                                        <FontAwesomeIcon icon={faTrash} onClick={() => removeFromCart(item.productId)} />
                                    </IconButton>
                                </div>
                                <div className="basket-content">
                                    <div className="basket-img-container">
                                        <img 
                                            src={`${item.Product?.imageUrl}`} 
                                            className="basket-img"
                                        />
                                        <div className='basket-subtitle'>{item.Product?.name}</div>
                                    </div>
                                    <div className="basket-quantity">
                                        <button 
                                            className="quantity-btn"
                                            onClick={() => decrementQuantity(item.productId)}
                                        >-</button>
                                        <span>{item.quantity}</span>
                                        <button 
                                            className="quantity-btn"
                                            onClick={() => incrementQuantity(item.productId)}
                                        >+</button>
                                    </div>
                                </div>
                                <p className='basket-amount'>{item.totalAmount} ₽</p>
                            </div>
                        ))}
                        <div className='basket-total-container'>
                            <button className="buy" onClick={handlePayment}>Оплатить</button>
                            <div className="basket-total">Итого: {basketItems.reduce((sum, item) => sum + item.totalAmount, 0)} ₽</div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};
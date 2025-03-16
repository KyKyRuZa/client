import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../components/Auth/Auth';
import Navbar from '../components/UI/Navbar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBasketShopping, faCheck } from '@fortawesome/free-solid-svg-icons';
import catalogService from '../api/catalog';
import '../styles/product.css';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

const Product = () => {
    const { id } = useParams();
    const { user } = useAuth();
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);
    const [isAdded, setIsAdded] = useState(false);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await catalogService.fetchProducts();
                const foundProduct = response.find(p => p.id === parseInt(id));
                setProduct(foundProduct);
            } catch (error) {
                console.error('Ошибка добавления продукта:', error);
            }
        };
        fetchProduct();
    }, [id]);

    const handleAddToBasket = async () => {
        if (!user) {
            navigate('/login');
            return;
        }
        try {
            await catalogService.addToBasket(user.id, product.id);
            setIsAdded(true);
        } catch (error) {
            console.error('Error adding to basket:', error);
        }
    };

    return (
        <>
            <Navbar />
            <main className="product-page">
                {product && (
                    <div className="product-container">
                        <FontAwesomeIcon icon={faArrowLeft} onClick={() => navigate(-1)} className='back-icon' />
                        
                        <div className="product-image-container">
                            <img 
                                src={product.imageUrl} 
                                alt={product.name} 
                                className="product-image"
                            />
                        </div>
                        <div className="product-info">
                            <h1 className="product-title">{product.name}</h1>
                            <div className="product-category">{product.category}</div>
                            <p className="product-description">{product.description}</p>
                            <div className="product-stock">
                                В наличии: {product.quantity} шт.
                            </div>
                            <div className="product-actions">
                                <div className="product-price">{product.price} ₽</div>
                                <div className="product-buttons">
                                    <button className="buy-button">Купить</button>
                                    <button 
                                        className="basket-button"
                                        onClick={handleAddToBasket}
                                    >
                                        {isAdded ? 
                                            <FontAwesomeIcon icon={faCheck} size="lg"/> : 
                                            <FontAwesomeIcon icon={faBasketShopping} size="lg" />
                                        }
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </main>
        </>
    );
};

export default Product;

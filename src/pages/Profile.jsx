import React, { useEffect, useState } from 'react';
import { useAuth } from '../components/Auth/Auth';
import Navbar from '../components/UI/NavbarProfile';
import '../styles/dashboard.css';
import '../styles/global.css';
import profileService from '../api/profile'; // Импортируем новый сервис
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { IconButton } from '@mui/material';

const ProfileInfo = ({ user }) => (
    <div className="detail-card">
        <h1 className="detail-title">{user?.firstName || ''} {user?.lastName || ''}</h1>
        <div className="detail-content">
            <p>Email: {user?.email || 'Не указан'}</p>
            <p>Телефон: {user?.phone || 'Не указан'}</p>
            <p>Дата регистрации: {new Date(user?.createdAt).toLocaleDateString()}</p>
        </div>
    </div>
);

const AdminInfo = ({ user }) => {
    if (user?.role !== 'администратор') return null;
    
    return (
        <div className="detail-card">
            <h3 className="detail-title">Дополнительная информация</h3>
            <div className="detail-content">
                <p>Статус: {user?.status}</p>
                <p>Последний вход: {user?.lastLogin ? new Date(user?.lastLogin).toLocaleString() : 'Не указано'}</p>
            </div>
        </div>
    );
};

const Sells = () => {
    const [sales, setSales] = useState([]);

    return (
        <div className="detail-card">
            <h3 className="detail-title">Продажи</h3>
            <div className="detail-content">
                {sales.length === 0 ? (
                    <p>У вас пока нет продаж</p>
                ) : (
                    <div className="sales-history">
                        {sales.map(sale => (
                            <div key={sale.id} className="sale-item">
                                <div className="sale-header">
                                    <span>Продажа №{sale.id}</span>
                                    <span>{sale.date.toLocaleDateString()}</span>
                                </div>
                                <div className="sale-details">
                                    {sale.items.map(item => (
                                        <div key={item.name} className="sale-item-detail">
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

const Catalog = () => {
    const [products, setProducts] = useState([]);
    const [isAddingProduct, setIsAddingProduct] = useState(false);
    const [newProduct, setNewProduct] = useState({
        name: '',
        description: '',
        price: '',
        image: null,
    });

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const productsData = await profileService.fetchProducts(); // Используем сервис
                setProducts(productsData);
            } catch (error) {
                console.error('Ошибка при загрузке продуктов:', error);
            }
        };

        fetchProducts();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewProduct(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleImageChange = (e) => {
        setNewProduct(prev => ({
            ...prev,
            image: e.target.files[0]
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await profileService.addProduct(newProduct); // Используем сервис
            setProducts([...products, response]);
            setIsAddingProduct(false);
            setNewProduct({ name: '', description: '', price: '', image: null });
        } catch (error) {
            console.error('Ошибка при добавлении продукта:', error);
        }
    };

    const handleDelete = async (productId) => {
        try {
            await profileService.deleteProduct(productId); // Используем сервис
            setProducts(products.filter(product => product.id !== productId));
        } catch (error) {
            console.error('Ошибка при удалении продукта:', error);
        }
    };

    return (
        <div>
            <div className="catalog-header">
                <div className='detail-title ctl'>Каталог продуктов  <AddIcon className="add" onClick={() => setIsAddingProduct(!isAddingProduct)}/></div>        
            </div>

            {isAddingProduct ? (
                <form onSubmit={handleSubmit} className="add-product-form">
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        required
                    />
                    <input
                        type="text"
                        name="name"
                        value={newProduct.name}
                        onChange={handleInputChange}
                        placeholder="Название товара"
                        required
                    />
                    <textarea
                        name="description"
                        value={newProduct.description}
                        onChange={handleInputChange}
                        placeholder="Описание товара"
                        required
                    />
                    <input
                        type="number"
                        name="price"
                        value={newProduct.price}
                        onChange={handleInputChange}
                        placeholder="Цена"
                        required
                    />
                    <button type="submit">Сохранить товар</button>
                </form>
            ) : (
                <div className="product-list">
                    {products.length === 0 ? (
                        <p>Нет доступных продуктов.</p>
                    ) : (
                        products.map((product) => (
                            <div key={product.id} className="product-item">
                                <div className="product-content">
                                    <h3>{product.name}</h3>
                                    <p>{product.description}</p>
                                    <p>Цена: {product.price} ₽</p>
                                </div>
                                <div className="product-actions">
                                    <IconButton className="icon-button edit">
                                        <EditIcon />
                                    </IconButton>
                                    <IconButton className="icon-button delete" onClick={() => handleDelete(product.id)}>
                                        <DeleteIcon />
                                    </IconButton>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            )}
        </div>
    );
};

const Basket = () => {
    const { user } = useAuth();
    const [basketItems, setBasketItems] = useState([]);

    useEffect(() => {
        const fetchBasket = async () => {
            try {
                const basketData = await profileService.fetchBasket(user.id); // Используем сервис
                setBasketItems(basketData);
            } catch (error) {
                console.error('Ошибка при получении корзины:', error);
            }
        };
        
        if (user && user.id) {
            fetchBasket();
        }
    }, [user]);

    const incrementQuantity = async (productId) => {
        try {
            const response = await profileService.incrementQuantity(user.id, productId); // Используем сервис
            if (response) {
                setBasketItems(prevItems => 
                    prevItems.map(item => 
                        item.productId === productId 
                        ? {
                            ...item,
                            quantity: response.quantity,
                            totalAmount: response.quantity * item.Product.price
                        } 
                        : item
                    )
                );
            }
        } catch (error) {
            console.error('Ошибка прибавления колличества:', error);
        }
    };
    
    const decrementQuantity = async (productId) => {
        try {
            const response = await profileService.decrementQuantity(user.id, productId); // Используем сервис
            if (response) {
                setBasketItems(prevItems => 
                    prevItems.map(item => 
                        item.productId === productId 
                        ? {
                            ...item,
                            quantity: response.quantity,
                            totalAmount: response.quantity * item.Product.price
                        } 
                        : item
                    )
                );
            }
        } catch (error) {
            console.error('Ошибка вычитания колличества:', error);
        }
    };

    const removeFromCart = async (productId) => {
        try {
            await profileService.removeFromCart(user.id, productId); // Используем сервис
            setBasketItems(basketItems.filter(item => item.productId !== productId));
        } catch (error) {
            console.error('Error removing from cart:', error);
        }
    };

    return (
        <div className="basket-container">
            <div className='detail-title'>Корзина</div>
            <div className="basket-items">
                {basketItems.length === 0 ? (
                    <p>Ваша корзина пуста</p>
                ) : (
                    <>
                        {basketItems.map((item) => (
                            <div key={item.id} className="basket-item">
                                <div className="basket-content">
                                    <h3>{item?.Product?.name || 'Название отсутствует'}</h3>
                                    <p>{item?.Product?.description || 'Описание отсутствует'}</p>
                                    <div className="basket-quantity">
                                        <button 
                                            className="quantity-btn"
                                            onClick={() => decrementQuantity(item.productId)}
                                        >-</button>
                                        <span>Количество: {item.quantity}</span>
                                        <button 
                                            className="quantity-btn"
                                            onClick={() => incrementQuantity(item.productId)}
                                        >+</button>
                                    </div>
                                    <p>Цена: {item.totalAmount} ₽</p>
                                </div>
                                <div className="basket-actions">
                                    <IconButton className="icon-button delete">
                                        <DeleteIcon onClick={() => removeFromCart(item.productId)} />
                                    </IconButton>
                                </div>
                            </div>
                        ))}
                        <div className="basket-total">
                            Итого: {basketItems.reduce((sum, item) => sum + item.totalAmount, 0)} ₽
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}

const Orders = ({ user }) => {
    const [orders, setOrders] = useState([]);
    return (
        <div className="detail-card">
            <h3 className="detail-title">Заказы</h3>
            <div className="detail-content">
                {orders.length === 0 ? (
                    <p>У вас пока нет заказов</p>
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
                                <div className="order-details">
                                    {order.items.map(item => (
                                        <div key={item.name} className="order-item-detail">
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

const Profile = () => {
    const { user } = useAuth();
    const [activeView, setActiveView] = useState('profile');

    const renderContent = () => {
        switch(activeView) {
            case 'profile':
                return (
                    <div className='profile-details'>
                        <ProfileInfo user={user} />
                        <AdminInfo user={user} />
                    </div>
                );
            case 'basket':
                return <Basket />;
            case 'catalog':
                return <Catalog />;
            case 'sells':
                return <Sells />;
            case 'orders':
                return <Orders user={user} />;
            default:
                return null;
        }
    };

    return (
        <div>
            <Navbar setActiveView={setActiveView} />
            <div className="profile-container">
                <div className="profile-details">
                    {renderContent()}
                </div>
            </div>
        </div>
    );
};

export default Profile;

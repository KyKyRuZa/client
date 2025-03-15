import React, { useEffect, useState } from 'react';
import { useAuth } from '../components/Auth/Auth';
import Navbar from '../components/UI/NavbarProfile';
import productService from '../api/product'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faPlus,faTimes  } from '@fortawesome/free-solid-svg-icons';
import { IconButton } from '@mui/material';

import '../styles/main.css';
const ProfileInfo = ({user}) => (
    <>
        <div className="profile-card">
            <div className="user-card">
                <div className="profile-name">{user?.firstName || ''} {user?.lastName || ''}</div>
                <div>{new Date(user?.createdAt).toLocaleDateString()}</div>

                <div className="profile-content">
                    <div className='profile-title'> Контактные данные</div>
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
            
        
        {user?.role === 'администратор' && (
            <div className="admin-card">
                
                <div className="profile-content">
                    <div className="profile-title">Дополнительная информация</div>
                    <div className='profile-info'> 
                        <div>Статус</div>
                        <div className='right'>{user?.status}</div > 
                    </div>
                    <div className='profile-info'> 
                        <div>Последний вход</div>
                        <div className='right'>{user?.lastLogin ? new Date(user?.lastLogin).toLocaleString() : 'Не указано'}</div>
                    </div>
                </div>
            </div>
        )}

        </div>
    </>
);

const Catalog = () => {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchStatus, setSearchStatus] = useState('');
    const [isAddingProduct, setIsAddingProduct] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);
    const [newProduct, setNewProduct] = useState({
        name: '',
        description: '',
        price: '',
        img: null,
        category: '',
        status: 'active',
        paymentStatus: 'unpaid'
    });

    useEffect(() => {
        loadProducts();
    }, []);

    const loadProducts = async () => {
        try {
            const productsData = await productService.fetchProducts();
            setProducts(productsData);
            setFilteredProducts(productsData);
        } catch (error) {
            console.error('Ошибка прогрузки товаров:', error);
        }
    };

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
            if (newProduct.id) {
                await productService.updateProduct(newProduct.id, newProduct);
            } else {
                await productService.addProduct(newProduct);
            }
            loadProducts();
            setIsAddingProduct(false);
            setNewProduct({
                name: '',
                description: '',
                price: '',
                img: null,
                category: '',
                status: 'active',
                paymentStatus: 'unpaid'
            });
        } catch (error) {
            console.error('Ошибка сохранения товара:', error);
        }
    };

    const handleDelete = async (productId) => {
        try {
            await productService.deleteProduct(productId); 
            setProducts(products.filter(product => product.id !== productId));
        } catch (error) {
            console.error('Ошибка при удалении продукта:', error);
        }
    };
    const handleEdit = (product) => {
        setEditingProduct(product);
        setNewProduct({
            id: product.id,
            name: product.name,
            description: product.description,
            price: product.price,
            category: product.category,
            image: null
        });
        setIsAddingProduct(true);
    };
    const handleSearch = (e) => {
        const term = e.target.value;
        setSearchTerm(term);
    
        if (!term.trim()) {
            setFilteredProducts(products);
            setSearchStatus('');
            return;
        }
    
        let filtered = products.filter(product => 
            product.id.toString().includes(term)
        );
    
        filtered = filtered.sort((a, b) => {
            const indexA = products.indexOf(a);
            const indexB = products.indexOf(b);
            return indexA - indexB;
        });
    
        setFilteredProducts(filtered);
        setSearchStatus(filtered.length ? 'found' : 'not-found');
    };


    return (
        <>
            <div className="catalog-header">
                <div className='catalog-title ctl'>Каталог продуктов</div>
                <div className="search-container">
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={handleSearch}
                        placeholder="Поиск по ID"
                        className="search-input"
                    />
                    {searchStatus === 'not-found' && (
                            <div className="search-feedback">Ничего не найдено</div>
                        )}
                </div>
            </div>
            <FontAwesomeIcon 
                icon={faPlus}  
                className={`btn-add ${isAddingProduct ? 'rotate' : ''}`} 
                onClick={() => {
                    setIsAddingProduct(!isAddingProduct);
                    setEditingProduct(null);
                    setNewProduct({
                        name: '',
                        description: '',
                        price: '',
                        image: null,
                        category: '',
                        status: 'active',
                        paymentStatus: 'unpaid'
                    });
                }}
            /> 

            {isAddingProduct ? (
                <form onSubmit={handleSubmit} className="add-product-form">
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        required = {!newProduct.id}
                    />
                    <select 
                        value={newProduct.category} 
                        onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })} 
                        required
                    >
                        <option value="">Выберите категорию</option>
                        <option value="Авто краски">Авто краски</option>
                        <option value="Аэрозольные краски">Аэрозольные краски</option>
                        <option value="Аэрозольные краски RAL/NCS/PANTONE">Аэрозольные краски RAL/NCS/PANTONE</option>
                        <option value="Термостойкие краски">Термостойкие краски</option>
                        <option value="Автоэмаль с кисточкой">Автоэмаль с кисточкой</option>
                        <option value="Аэрозольные лаки">Аэрозольные лаки</option>
                        <option value="Аэрозольные грунты">Аэрозольные грунты</option>
                    </select>
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
                    <button type="submit" className='ctlbtn'>
                        {editingProduct ? 'Изменить товар' : 'Сохранить товар'}
                    </button>
                </form>
            ) : (
                <div className="product-list">
                    {filteredProducts.length === 0 ? (
                        <p>Нет доступных продуктов.</p>
                    ) : (
                        <table className="admin-table">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Название</th>
                                    <th>Категория</th>
                                    <th>Описание</th>
                                    <th>Цена (₽)</th>
                                    <th>Действия</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredProducts.map((product) => (
                                    <tr key={product.id}>
                                        <td>{product.id}</td>
                                        <td>{product.name}</td>
                                        <td>{product.category}</td>
                                        <td>{product.description}</td>
                                        <td>{product.price}</td>
                                        <td>
                                            <IconButton className="icon-button edit" onClick={() => handleEdit(product)}>
                                                <FontAwesomeIcon icon={faEdit} />
                                            </IconButton>
                                            <IconButton className="icon-button delete" onClick={() => handleDelete(product.id)}>
                                                <FontAwesomeIcon icon={faTrash} />
                                            </IconButton>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            )}
        </>
    );
};

const Orders = () => {
    const [orders, setOrders] = useState([]);
    return (
        <div className="order-card">
            <h3 className="order-title">Заказы</h3>
            <div className="order-content">
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

const Basket = () => {
    const { user } = useAuth();
    const [basketItems, setBasketItems] = useState([]);

    useEffect(() => {
        const fetchBasket = async () => {
            try {
                const basketData = await productService.fetchBasket(user.id); // Используем сервис
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
            const response = await productService.incrementQuantity(user.id, productId);
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
            console.error('Error incrementing quantity:', error);
        }
    };
    
    const decrementQuantity = async (productId) => {
        try {
            const response = await productService.decrementQuantity(user.id, productId);
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
            console.error('Error decrementing quantity:', error);
        }
    };
    
    const removeFromCart = async (productId) => {
        try {
            await productService.removeFromCart(user.id, productId); // Используем сервис
            setBasketItems(basketItems.filter(item => item.productId !== productId));
        } catch (error) {
            console.error('Error removing from cart:', error);
        }
    };

    return (
        <div className="basket-container">
            <div className='basket-title'>Корзина</div>
            <div className="basket-items">
                {basketItems.length === 0 ? (
                    <p>Ваша корзина пуста</p>
                ) : (
                    <>
                        {basketItems.map((item) => (
                           <div key={item.id} className="basket-item">
                           <div className="basket-content">
                            <div className="basket-img-container">
                               <img 
                                   src={`${item.Product.imageUrl}`} 
                                   className="basket-img"
                               />
                               <div className='basket-subtitle'>{item.Product.name}</div>
                               <div className="basket-category">{item.Product.category}</div>
                            </div>
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
                               <p className='amount'>Цена: {item.totalAmount} ₽</p>
                           </div>
                           <div className="basket-actions">
                               <IconButton className="icon-button delete">
                                   <FontAwesomeIcon icon={faTrash} onClick={() => removeFromCart(item.productId)} />
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

const Sells = () => {
    const [sales, setSales] = useState([]);

    return (
        <div className="profile-card">
            <h3 className="profile-title">Продажи</h3>
            <div className="profile-content">
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

const Profile = () => {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const { user } = useAuth();
    const [activeView, setActiveView] = useState('profile');

    const renderContent = () => {
        switch(activeView) {
            case 'profile':
                return <ProfileInfo user = {user} />;
            case 'basket':
                return <Basket />;
            case 'catalog':
                return <Catalog />;
            case 'sells':
                return <Sells />;
            case 'orders':
                return <Orders/>;
            default:
                return null;
        }
    };

    return (
        <div className="profile-container">
        <Navbar setActiveView={setActiveView} onCollapse={setIsCollapsed}  />
        <main className={`main-content ${isCollapsed ? 'collapsed' : ''}`}>
            <div className="dashboard-container">
                {renderContent()}
            </div>
        </main>
    </div>
    );
};

export default Profile;

import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBoxOpen, faPlus, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { IconButton } from '@mui/material';
import InfoMessage from '../../components/UI/InfoMessage';
import productService from '../../api/product';

const MAX_FILE_SIZE = 2 * 1024 * 1024;

export const AdminCatalog = () => {
    const [imageError, setImageError] = useState('');
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
        quantity: '',
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

    const handleProductUpdate = async () => {
        await loadProducts(); 
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewProduct(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (file.size > MAX_FILE_SIZE) {
                setImageError('Размер файла превышает допустимый лимит (2 MB).');
                setNewProduct(prev => ({ ...prev, image: null })); 
            } else {
                setImageError(''); 
                setNewProduct(prev => ({ ...prev, image: file })); 
            }
        }
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
            await handleProductUpdate();
            setIsAddingProduct(false);
            setNewProduct({
                name: '',
                description: '',
                price: '',
                img: null,
                category: '',
                quantity: '',
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
            await handleProductUpdate();
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
            quantity: product.quantity,
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
            <div className='catalog-title'>Каталог продуктов</div>
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
                        quantity: '',
                        category: '',
                        status: 'active',
                        paymentStatus: 'unpaid'
                    });
                }}
            /> 
            {isAddingProduct ? (
                <form onSubmit={handleSubmit} className="add-product-form">
                    <input type="file" accept="image/*" onChange={handleImageChange} required={!newProduct.id} />
                    <small style={{ color: '#888', fontSize: '12px'}}>
                        Допустимый формат: JPG, PNG. Максимальный размер: 2 MB. Разрешение: 300x300.
                    </small>
                    {imageError && <p style={{ color: 'red', fontSize: '12px' }}>{imageError}</p>}
                    <select value={newProduct.category} onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })} required >
                        <option value="">Выберите категорию</option>
                        <option value="Авто краски">Авто краски</option>
                        <option value="Аэрозольные краски">Аэрозольные краски</option>
                        <option value="Аэрозольные краски RAL/NCS/PANTONE">Аэрозольные краски RAL/NCS/PANTONE</option>
                        <option value="Термостойкие краски">Термостойкие краски</option>
                        <option value="Автоэмаль с кисточкой">Автоэмаль с кисточкой</option>
                        <option value="Аэрозольные лаки">Аэрозольные лаки</option>
                        <option value="Аэрозольные грунты">Аэрозольные грунты</option>
                    </select>
                    <input type="text" name="name" value={newProduct.name} onChange={handleInputChange} placeholder="Название товара"required />
                    <textarea name="description" value={newProduct.description} onChange={handleInputChange} placeholder="Описание товара" required />
                    <input type="number" name="quantity" value={newProduct.quantity} onChange={handleInputChange} placeholder="Количество" required />
                    <input type="number" name="price" value={newProduct.price} onChange={handleInputChange} placeholder="Цена" required />
                    <button type="submit">
                        {editingProduct ? 'Изменить товар' : 'Сохранить товар'}
                    </button>
                </form>
            ) : (
                <div className="product-list">
                    {filteredProducts.length === 0 ? (
                        <InfoMessage 
                            icon={<FontAwesomeIcon icon={faBoxOpen} />}
                            message="Нет доступных продуктов"
                        />
                    ) : (
                        <table className="admin-table">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Название</th>
                                    <th>Категория</th>
                                    <th>Описание</th>
                                    <th>Кол</th>
                                    <th>₽</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredProducts.map((product) => (
                                    <tr key={product.id}>
                                        <td>{product.id}</td>
                                        <td>{product.name}</td>
                                        <td>{product.category}</td>
                                        <td>{product.description}</td>
                                        <td>{product.quantity}</td>
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
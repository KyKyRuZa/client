import React, { useState, useEffect } from "react";
import { Link,useNavigate } from "react-router-dom"
import { useAuth } from "../components/Auth/Auth";
import "../styles/dashboard.css";
import "../styles/global.css";
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import catalogService from '../api/catalog'; 
import Navbar from "../components/UI/Navbar";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBasketShopping } from '@fortawesome/free-solid-svg-icons'



const Catalog = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [addedProducts, setAddedProducts] = useState(new Set());
  const [error, setError] = useState('');

  const categories = [
    "Авто краски",
    "Аэрозольные краски",
    "Аэрозольные краски RAL/NCS/PANTONE",
    "Термостойкие краски",
    "Автоэмаль с кисточкой",
    "Аэрозольные лаки",
    "Аэрозольные грунты"
  ];

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productsData = await catalogService.fetchProducts();
        setProducts(productsData);
        setFilteredProducts(productsData);
      } catch (error) {
        console.error("Ошибка при загрузке продуктов:", error);
        setError("Ошибка при загрузке продуктов");
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    if (selectedCategory) {
      const filtered = products.filter(product => product.category === selectedCategory);
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts(products);
    }
  }, [selectedCategory, products]);

  const handleAddToBasket = async (productId) => {
      if (!user) {
        navigate('/login');
        return;
    }
    try {
        await catalogService.addToBasket(user.id, productId);
        setAddedProducts(prev => new Set(prev).add(productId));
    } catch (error) {
        console.error('Ошибка добавления товара:', error);
    }
  };

  return (
    <>
    <Navbar/>
    <main>
      <div className="catalog-container">
        <div className="title-primary">Каталог</div>

         <select 
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="category-select"
        >
          <option value="">Все категории</option>
          {categories.map(category => (
            <option key={category} value={category}>{category}</option>
          ))}
        </select>

        {filteredProducts.length === 0 ? (
          <p>Нет доступных продуктов.</p>
        ) : (
          <div className="catalog-grid">
            {filteredProducts.map((product) => (
              <div key={product.id} className="catalog-card ">
                <Link to={`/product/${product.id}`}
                  className="catalog-img"
                  style={{
                    backgroundImage: `url(${product.imageUrl})`,
                  }}
                ></Link>
                <Link to={`/product/${product.id}`} className="catalog-title">{product.name}</Link>
                <div className="catalog-subtitle">{product.description}</div>
                <div className="catalog-price-container">
                  <div className="catalog-price">{product.price} ₽</div>
                  <div className="btn-container">
                    <button className="buy-button">Купить</button>
                    <button className="basket-button" onClick={() => handleAddToBasket(product.id)} >
                      {addedProducts.has(product.id) ? <FontAwesomeIcon icon={faCheck} size="lg"/> : <FontAwesomeIcon icon={faBasketShopping} size="lg"/>} 
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
    </>
  );
};

export default Catalog;
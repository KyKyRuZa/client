import React, { useState, useEffect } from "react";
import { useAuth } from "../components/Auth/Auth";
import "../styles/dashboard.css";
import "../styles/global.css";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import catalogService from '../api/catalog'; 
import Navbar from "../components/UI/Navbar";

const Catalog = () => {
  const { user } = useAuth();
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
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
    try {
        await catalogService.addToBasket(user.id, productId);
        console.log('Успешно добавлено в корзину');
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
              <div key={product.id} className="card-catalog ">
                <div
                  className="catalog-img"
                  style={{
                    backgroundImage: `url(${product.imageUrl})`,
                  }}
                ></div>
                <div className="title-catalog">{product.name}</div>
                <div className="subtitle-catalog">{product.description}</div>
                <div className="catalog-price-container">
                  <div className="catalog-price">{product.price} ₽</div>
                  <button 
                    className="add-to-cart-btn" 
                    onClick={() => handleAddToBasket(product.id)} 
                  >
                    <ShoppingCartIcon />
                    <span>Добавить в корзину</span>
                  </button>
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
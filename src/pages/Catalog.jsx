import React, { useState, useEffect } from "react";
import { useAuth } from "../components/Auth/Auth";
import "../styles/dashboard.css";
import "../styles/global.css";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import catalogService from '../api/catalog'; 


const Catalog = () => {
  const { user } = useAuth();
  const [products, setProducts] = useState([]);
  const [error, setError] = useState('');


  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productsData = await catalogService.fetchProducts();
        setProducts(productsData);
      } catch (error) {
        console.error("Ошибка при загрузке продуктов:", error);
        setError("Ошибка при загрузке продуктов");
      }
    };
    fetchProducts();
  }, []);
  
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
    <main>
      {/* Каталог */}
      <div className="catalog-container">
        <div className="title-primary">Каталог</div>

        {products.length === 0 ? (
          <p>Нет доступных продуктов.</p>
        ) : (
          <div className="catalog-grid">
            {products.map((product) => (
              <div key={product.id} className="card-catalog">
                {/* Изображение продукта */}
                <div
                  className="card-img"
                  style={{
                    backgroundImage: product.imageUrl
                      ? `url(http://213.108.198.68:5000${product.imageUrl})`
                      : "url(https://via.placeholder.com/150)",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                ></div>
                  

                {/* Название продукта */}
                <div className="card-title">{product.name}</div>

                {/* Описание продукта */}
                <div className="card-subtitle">{product.description}</div>

                {/* Цена продукта */}
                <div className="card-price">{product.price} руб</div>

                {/* Кнопка покупки */}
                <div className="btnn"><button className="card-btn">Купить</button><button className="add-to-cart-btn" onClick={() => handleAddToBasket(product.id)}> <ShoppingCartIcon /></button></div>
                
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
import React, { useState }from 'react';
import Navbar from '../components/UI/Navbar';
import Footer from '../components/UI/Footer';
import { ReactComponent as ForwardArrow }  from '../styles/assets/icons/arrow_forward.svg';
import { ReactComponent as Car }  from '../styles/assets/icons/car.svg';
import '../styles/dashboard.css';
import '../styles/advantage.css';
import '../styles/global.css';
import Catalog from './Catalog';


const DashBoard = () => { 
  return (
    <>
        <Navbar />
        <main> {/* Основной */}
          <div className='main-container'>
            <div>
              <div className='title'>Ваш автомобиль наш цвет</div>
              <div className="subtitle">Мы предлагаем услуги опытного колориста и широкий ассортимент высококачественных автомобильных красок, которые помогут вернуть вашему авто первозданный блеск или придать ему совершенно новый облик.</div>
              <button className='btn'> <p className='text'> Каталог <ForwardArrow className="arw"/></p> </button>
            </div>
              <Car className='car'/>
          </div>
        </main>
        <main> {/* Преемущества */}
          <div className="advantage-container">
            <div className="title-primary">Почему именно мы?</div>
            <div className="advantage-cards">
              <div className="advantage-card">
                <div className="card-num">#01</div>
                <div>
                  <div className="card-title">Профессионализм</div>
                  <div className="card-subtitle">Наши колористы проходят регулярное обучение и следят за новейшими тенденциями в области автокрасок</div>
                </div>
              </div>
              <div className="advantage-card">
                <div className="card-num">#02</div>
                <div>
                  <div className="card-title">Качество материалов</div>
                  <div className="card-subtitle">Мы работаем только с проверенными производителями, чьи продукты соответствуют мировым стандартам</div>
                </div>
              </div>
              <div className="advantage-card">
                <div className="card-num">#03</div>
                <div>
                  <div className="card-title">Широкий ассортимент </div>
                  <div className="card-subtitle">У нас представлены краски для любых типов автомобилей: от классических моделей до современных электрокаров</div>
                </div>
              </div>
              <div className="advantage-card">
                <div className="card-num">#04</div>
                <div>
                  <div className="card-title">Индивидуальный подход</div>
                  <div className="card-subtitle">Каждый клиент для нас особенный, поэтому мы учитываем все ваши пожелания и требования</div>
                </div>
              </div>
            </div>
            
          </div>
        </main>
        <main>
          <Catalog />
        </main>
        <main> {/* Услуги */}
          <div className="services-container">
            <div className="title-primary">Услуги</div>
              <div className='services'> 
                <div className='services-card'> Заправка балончиков</div>
                <div className='services-card'> Подбор автоэмали</div>
                <div className='services-card'> Флаконы для подкрашивания кузовных элементов</div>

              </div>
          </div>
        </main>
        <main> {/* Контакнты */}
          <div className='contact-container'>
            <div className='title-primary'>Контактная информация</div>
            <div className="contact-info">
              <div className="card-info">
                  <div className='card-title'>Телефон</div>
                  <p>+7 (917) 276-27-68</p>
              </div>
              <div className="card-info">
                <div className='card-title'>Email</div>
                <p>info@delron.ru</p>
                <p>support@delron.ru</p>
              </div>
              <div className="card-info">
                <div className='card-title'>Режим работы</div>
                <p>Пн-Пт: 9:00 - 18:00</p>
              </div>
            </div>
            <div className="map">
              <iframe src="https://yandex.ru/map-widget/v1/?ll=49.070500%2C55.843879&mode=whatshere&utm_source=share&whatshere%5Bpoint%5D=49.070499%2C55.843879&whatshere%5Bzoom%5D=17&z=16"
                  width="100%" 
                  height="450" 
                  frameborder="0" 
                  allowfullscreen="true">
              </iframe>
            </div>
          </div>
        </main>
        <Footer />
    </>
  );
};

export default DashBoard;

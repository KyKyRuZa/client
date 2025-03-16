import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import authService from '../../api/auth';
import '../../styles/auth.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

const ForgotPassword = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [messageType, setMessageType] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const checkEmail = await authService.checkEmail(email);
            
            if (!checkEmail.exists) {
                setMessage('Пользователь с таким email не найден');
                setMessageType('error');
                return;
            }
            await authService.sendResetEmail(email);

            setMessage('Инструкции по восстановлению пароля отправлены на вашу почту');
            setMessageType('success');
            
            setEmail('');
            
            setTimeout(() => {
                navigate('/login');
            }, 3000);
    
        } catch (error) {
            setMessage('Произошла ошибка при отправке. Попробуйте позже');
            setMessageType('error');
        }
    };
    

    return (
        <div className="auth-container">
            <div className="auth-form">
                           <FontAwesomeIcon icon={faArrowLeft} onClick={() => navigate(-1)} className='back-icon' />
               
                <div className="auth-header">
                    <p>Восстановление пароля</p>
                </div>

                {message && (
                    <div className={`message ${messageType}`}>
                        {message}
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="email">Электронная почта</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <button type="submit" className="auth-button">
                        Отправить
                    </button>
                </form>

                <div className="auth-links">
                    <p>
                        Вспомнили пароль?{' '}
                        <Link to="/login">Войти</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;

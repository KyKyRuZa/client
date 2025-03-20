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
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        
        try {
            const response = await authService.checkEmail(email);
        
            if (!response.data.exists) {
                setMessage('Пользователь с таким email не найден');
                setMessageType('error');
                return;
            }

            const resetResponse = await authService.sendResetEmail(email);
        
            if (resetResponse.data.message) {
                setMessage('Инструкции по восстановлению пароля отправлены на вашу почту');
                setMessageType('success');
                
                setTimeout(() => {
                    navigate('/login');
                }, 3000);
            }
            
        } catch (error) {
            setMessage(error.response?.data?.message || 'Произошла ошибка при отправке. Попробуйте позже');
            setMessageType('error');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-form">
                <FontAwesomeIcon 
                    icon={faArrowLeft} 
                    onClick={() => navigate(-1)} 
                    className='back-icon' 
                />
               
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
                            disabled={isLoading}
                        />
                    </div>

                    <button 
                        type="submit" 
                        className="auth-button"
                        disabled={isLoading}
                    >
                        {isLoading ? 'Отправка...' : 'Отправить'}
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

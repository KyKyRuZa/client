import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import authService from '../../api/auth';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import '../../styles/auth/auth.css';

const ResetPassword = () => {
    const { token } = useParams();
    const navigate = useNavigate();
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');
    const [messageType, setMessageType] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        if (newPassword !== confirmPassword) {
            setMessage('Пароли не совпадают');
            setMessageType('error');
            setIsLoading(false);
            return;
        }

        try {
            const response = await authService.resetPassword(token, newPassword);
            
            if (response.data.message) {
                setMessage('Пароль успешно изменен');
                setMessageType('success');
                
                setTimeout(() => {
                    navigate('/login');
                }, 3000);
            }
        } catch (error) {
            setMessage(error.response?.data?.message || 'Ошибка при смене пароля');
            setMessageType('error');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-form">
                <div className="auth-header">
                    <p>Создание нового пароля</p>
                </div>

                {message && (
                    <div className={`message ${messageType}`}>
                        {message}
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="newPassword">Новый пароль</label>
                        <div className="password-input">
                            <input
                                type={showPassword ? "text" : "password"}
                                id="newPassword"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                required
                                minLength="6"
                            />
                            <FontAwesomeIcon
                                icon={showPassword ? faEyeSlash : faEye}
                                onClick={() => setShowPassword(!showPassword)}
                                className="password-toggle"
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="confirmPassword">Подтвердите пароль</label>
                        <div className="password-input">
                            <input
                                type={showPassword ? "text" : "password"}
                                id="confirmPassword"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                                minLength="6"
                            />
                        </div>
                    </div>

                    <button 
                        type="submit" 
                        className="auth-button"
                        disabled={isLoading}
                    >
                        {isLoading ? 'Обновление...' : 'Обновить пароль'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ResetPassword;

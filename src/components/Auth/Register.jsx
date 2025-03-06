import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from './Auth';
import '../../styles/auth.css'
import { ReactComponent as BackArrow }  from '../../styles/assets/icons/arrow_back.svg';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { IconButton } from '@mui/material';

const Register = () => {
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState('');
    const [severity, setSeverity] = useState('success');
    const navigate = useNavigate();
    const { register } = useAuth();
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        confirmPassword: '',
        firstName: '',
        lastName: '',
    });
    const [error, setError] = useState('');
    const handleAcceptTerms = (e) => {
        setAccepted(e.target.checked);
    };
    const [accepted, setAccepted] = useState(false);
    const handleSubmit = async (event)=> {
        event.preventDefault();
        if (!accepted) {
            setMessage('Вы должны принять условия использования');
            setSeverity('error');
        }
        if (formData.password !== formData.confirmPassword) {
            setMessage('Пароли не совпадают');
            setSeverity('error');           
        }
        try {
            await register(formData);
            setMessage('Регистрация прошла успешно!');
            setSeverity('success');
            navigate('/profile');
        } catch (error) {
            setMessage('Ошибка при регистрации');
            setSeverity('error');
        }
        setOpen(true);
    };
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    return (
        <div className="auth-container">
            <div className="auth-form">
                <BackArrow className="back-arrow" onClick={() => navigate('/')} />
                <div className="auth-header">
                    <p>Создать аккаунт</p>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="firstName">Имя</label>
                        <input
                            type="text"
                            id="firstName"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="lastName">Фамилия</label>
                        <input
                            type="text"
                            id="lastName"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Электронная почта</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Пароль</label>
                        <input
                            type={showPassword ? "text" : "password"}
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                            minLength="6"
                        />
                        <IconButton 
                            onClick={togglePasswordVisibility}
                            className="visibility-toggle"
                        >
                            {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                        </IconButton>
                    </div>

                    <div className="form-group">
                        <label htmlFor="confirmPassword">Подтвердите пароль</label>
                        <input
                            type={showPassword ? "text" : "password"}
                            id="confirmPassword"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            required
                        />
                        <IconButton 
                            onClick={togglePasswordVisibility}
                            className="visibility-toggle"
                        >
                            {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                        </IconButton>
                    </div>
                    <div className="form-group checkbox-group">
                        <label className="checkbox-label">
                            <input
                                type="checkbox"
                                checked={accepted}
                                onChange={handleAcceptTerms}
                            />
                            <span>
                                Я принимаю{' '} <Link to="/terms">пользовательское соглашение</Link>
                            </span>
                        </label>
                    </div>
                    <button type="submit" className="auth-button">
                        Зарегистрироваться
                    </button>
                </form>

                <div className="auth-links">
                    <p>
                        Уже есть акаунт?{' '}
                        <Link to="/login">Войти</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Register;

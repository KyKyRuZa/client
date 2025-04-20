import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from './Auth';
import '../../styles/auth/auth.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft,faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';


const Register = () => {
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState('');
    const [severity, setSeverity] = useState('success');
    const navigate = useNavigate();
    const { register } = useAuth();
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        confirmPassword: '',
        firstName: '',
        lastName: '',
    });
    const [errors, setErrors] = useState({
        email: '',
        password: '',
        confirmPassword: '',
        firstName: '',
        lastName: ''
    });
    const handleAcceptTerms = (e) => {
        setAccepted(e.target.checked);
    };
    const [accepted, setAccepted] = useState(false);
    
    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!accepted) {
            setErrors(prev => ({...prev, terms: 'Вы должны принять условия соглашения'}));
            return;
        }
        if (formData.password !== formData.confirmPassword) {
            setErrors(prev => ({...prev, confirmPassword: 'Пароли не совпадают'}));
            return;
        }
        try {
            await register(formData);
            navigate('/profile');
        } catch (err) {
            if (err.response?.data?.errors) {
                setErrors(err.response.data.errors);
            }
        }
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    return (
        <div className="auth-container">
            <div className="auth-form">
            <FontAwesomeIcon icon={faArrowLeft} onClick={() => navigate('/')} className='back-icon' />
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
                    {errors.firstName && <div className="error-message">{errors.firstName}</div>}
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
                    {errors.lastName && <div className="error-message">{errors.lastName}</div>}
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
                    {errors.email && <div className="error-message">{errors.email}</div>}
                </div>

                <div className="form-group">
                    <label htmlFor="password">Пароль</label>
                    <div className="password-input-container">
                        <input
                            type={showPassword ? "text" : "password"}
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                            minLength="6"
                        />
                        <FontAwesomeIcon 
                            icon={showPassword ? faEyeSlash : faEye}
                            onClick={() => setShowPassword(!showPassword)}
                            className="password-toggle-icon"
                        />
                    </div>
                    {errors.password && <div className="error-message">{errors.password}</div>}
                </div>

                <div className="form-group">
                    <label htmlFor="confirmPassword">Подтвердите пароль</label>
                    <div className="password-input-container">
                        <input
                            type={showConfirmPassword ? "text" : "password"}
                            id="confirmPassword"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            required
                        />
                        <FontAwesomeIcon 
                            icon={showConfirmPassword ? faEyeSlash : faEye}
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            className="password-toggle-icon"
                        />
                    </div>
                    {errors.confirmPassword && <div className="error-message">{errors.confirmPassword}</div>}
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
                    {errors.terms && <div className="error-message">{errors.terms}</div>}
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

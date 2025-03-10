import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from './Auth';
import '../../styles/auth.css'
import { ReactComponent as BackArrow }  from '../../styles/assets/icons/arrow_back.svg';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { IconButton } from '@mui/material';

const Login = () => {
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState('');
    const navigate = useNavigate();
    const { login } = useAuth();
    const [showPassword, setShowPassword] = useState(false);
    
        const togglePasswordVisibility = () => {
            setShowPassword(!showPassword);
        };
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await login(formData);
            setMessage('Успешный вход!');
            navigate('/profile');
        } catch (err) {
            setMessage('Ошибка при входе :(');
        }
        setOpen(true);
    };
    return (
        <div className="auth-container">
            <div className="auth-form">
                <BackArrow className="back-arrow" onClick={() => navigate('/')} />
                <div className="auth-header">
                    <p>Войти в аккаунт</p>
                </div>

                <form onSubmit={handleSubmit}>
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
                        />
                        <IconButton  onClick={togglePasswordVisibility} className="visibility-toggle">
                            {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                        </IconButton>
                    </div>

                    

                    <button type="submit" className="auth-button">
                        Войти
                    </button>
                </form>
                <div className="auth-links">                   
                    <p>
                        Нет аккаунта ?{' '}
                        <Link to={'/register'}>Зарегистрироваться</Link>
                    </p> 
                    <p>
                        <Link to="/forgot-password">Забыли пароль ?</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;

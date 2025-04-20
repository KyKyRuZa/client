import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from './Auth';
import '../../styles/auth/auth.css'
import '../../styles/global.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faEye, faEyeSlash  } from '@fortawesome/free-solid-svg-icons';



const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState('');
    const [severity, setSeverity] = useState('success');
    const navigate = useNavigate();
    const { login } = useAuth();
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [errors, setErrors] = useState({
        email: '',
        password: ''
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            const response = await login(formData);
            const user = JSON.parse(localStorage.getItem('user'));
            setMessage('Успешный вход!');
            setSeverity('success');
            if (user && user.role && user.id) {
                navigate(`/profile/${user?.role}/${user?.id}`);
            }
        } catch (err) {
            if (err.response?.data?.errors) {
                setErrors(err.response.data.errors);
            } else {
                setErrors({
                    email: 'Неверный email или пароль',
                    password: 'Неверный email или пароль'
                });
            }
        }
    };


    return (
        <div className="auth-container">
            <div className="auth-form">
            <FontAwesomeIcon icon={faArrowLeft} onClick={() => navigate('/')} className='back-icon' />
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
                        <div className="password-input-container">
                            <input
                                type={showPassword ? "text" : "password"}
                                id="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                            />
                            <FontAwesomeIcon 
                                icon={showPassword ? faEyeSlash : faEye}
                                onClick={() => setShowPassword(!showPassword)}
                                className="password-toggle-icon"
                            />
                        </div>
                    </div>
                    {errors.email && <div className="error-message">{errors.email}</div>}

                    

                    <button type="submit" className="auth-button" onClick={handleSubmit}>
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

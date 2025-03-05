import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from './Auth';
import '../../styles/auth.css'
import '../../styles/global.css'
import { ReactComponent as BackArrow }  from '../../styles/assets/icons/arrow_back.svg';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});


const Login = () => {
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState('');
    const [severity, setSeverity] = useState('success');
    const navigate = useNavigate();
    const { login } = useAuth();
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
            setSeverity('success');
            navigate('/profile');
        } catch (err) {
            setMessage('Ошибка при входе :(');
            setSeverity('error');
        }
        setOpen(true);
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
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    

                    <button type="submit" className="auth-button">
                        Войти
                    </button>
                </form>
                <Snackbar open={open} autoHideDuration={6000} onClose={handleClose} anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
                    <Alert onClose={handleClose} severity={severity} sx={{ width: '100%' }}>
                        {message}
                    </Alert>
                </Snackbar>
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

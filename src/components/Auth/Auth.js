import React, { createContext, useState, useContext, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import authService from '../../api/auth';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const location = useLocation();

    const protectedRoutes = [
        '/profile',
        '/admin-catalog',
        '/orders',
        '/basket',
        '/sells',
        '/settings',
        'logs'
    ];

    useEffect(() => {
        const user = authService.getCurrentUser();
        setUser(user);
        setLoading(false);

        const isProtectedRoute = protectedRoutes.some(route => 
            location.pathname.startsWith(route)
        );

        if (isProtectedRoute && !user) {
            navigate('/');
        }
    }, [location, navigate]);

    const login = async (credentials) => {
        const response = await authService.login(credentials);
        setUser(response.user);
        return response;
    };

    const register = async (userData) => {
        const response = await authService.register(userData);
        setUser(response.user);
        return response;
    };

    const logout = () => {
        authService.logout();
        setUser(null);
        navigate('/login');
    };

    const value = {
        user,
        login,
        register,
        logout,
        loading
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

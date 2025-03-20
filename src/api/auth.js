import axios from 'axios';

const API_URL = 'https://delron.ru/api/auth';

const authService = {
    async register(userData) {
        const response = await axios.post(`${API_URL}/register`, userData);
        if (response.data.token) {
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('user', JSON.stringify(response.data.user));
        }
        return response.data;
    },

    async login(credentials) {
        const response = await axios.post(`${API_URL}/login`, credentials);
        if (response.data.token) {
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('user', JSON.stringify(response.data.user));
        }
        return response.data;
    },
    checkEmail(email) {
        return axios.post(`${API_URL}/check-email`, { email });
    },
    
    sendResetEmail(email) {
        return axios.post(`${API_URL}/forgot-password`, { email });
    },

    resetPassword(token, newPassword) {
        return axios.post(`${API_URL}/reset-password`, { token, newPassword });
    },
    
    logout() {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
    },

    getCurrentUser() {
        return JSON.parse(localStorage.getItem('user'));
    },

    getToken() {
        return localStorage.getItem('token');
    },
    

};

export default authService;

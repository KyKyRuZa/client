import axios from 'axios';

const API_URL = 'https://delron.ru/api/profile/settings';
const API_URL_STATS = 'https://delron.ru/api/profile/statistics';
const API_URL_USERS = 'https://delron.ru/api/profile/users';

const getAuthHeader = () => {
    const token = localStorage.getItem('token');
    return {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };
};

const profileService = {
    
    updateUserProfile(userId, userData) {
        return axios.put(`${API_URL_SETTING}/update/${userId}`, userData, getAuthHeader());
    },

    updatePassword(userId, passwordData) {
        return axios.put(`${API_URL_SETTING}/password/${userId}`, passwordData, getAuthHeader());
    },

    updatePersonalInfo(userId, personalData) {
        return axios.put(`${API_URL_SETTING}/personal/${userId}`, personalData, getAuthHeader());
    },

    getUserProfile(userId) {
        return axios.get(`${API_URL_SETTING}/${userId}`, getAuthHeader());
    },
    getStatistics() {
        return axios.get(API_URL_STATS, getAuthHeader());
    },
    getAllUsers() {
        return axios.get(`${API_URL_USERS}`, getAuthHeader());
    },
 
};

export default profileService;

import axios from 'axios';

const API_URL = 'https://delron.ru/api/profile/settings';

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
        return axios.put(`${API_URL}/update/${userId}`, userData, getAuthHeader());
    },

    updatePassword(userId, passwordData) {
        return axios.put(`${API_URL}/password/${userId}`, passwordData, getAuthHeader());
    },

    updatePersonalInfo(userId, personalData) {
        return axios.put(`${API_URL}/personal/${userId}`, personalData, getAuthHeader());
    },

    getUserProfile(userId) {
        return axios.get(`${API_URL}/${userId}`, getAuthHeader());
    }
};

export default profileService;

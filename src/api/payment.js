import axios from 'axios';
const API_URL = 'https://delron.ru/api/payment';

const payment = {
    createPayment: async (productId) => {
        const response = await axios.post(`${API_URL}/create`, { productId });
        return response.data;
    },

    getPaymentStatus: async (orderId) => {
        const response = await axios.get(`${API_URL}/status/${orderId}`);
        return response.data;
    },

    getUserPayments: async () => {
        const response = await axios.get(`${API_URL}/history`);
        return response.data;
    }
};

export default payment;

import axios from 'axios';

const API_URL = 'https://delron.ru/api/profile/basket';

const basketService = {
    async fetchBasket(userId) {
            const response = await axios.get(`${API_URL}/${userId}`);
            return response.data;
        },

        async incrementQuantity(userId, productId) {
            const response = await axios.put(`${API_URL}/increment`, {userId, productId});
            return response.data;
        },
    
        async decrementQuantity(userId, productId) {
            const response = await axios.put(`${API_URL}/decrement`, {userId, productId});
            return response.data;
        },
        
        async removeFromCart(userId, productId) {
            await axios.delete(`${API_URL}/${userId}/${productId}`);
        }
};


export default basketService;
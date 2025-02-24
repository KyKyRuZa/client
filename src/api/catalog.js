import axios from 'axios';

const API_URL = 'http://213.108.198.68:5000/api';

const catalogService = {
    async fetchProducts() {
        const response = await axios.get(`${API_URL}/profile`);
        return response.data;
    },

    async addToBasket(userId, productId) {
        await axios.post(`${API_URL}/profile/add`, {
            userId: userId,
            productId: productId,
            quantity: 1
        });
    }
};

export default catalogService;

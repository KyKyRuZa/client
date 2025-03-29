import axios from 'axios';

const API_URL = 'https://delron.ru/api/profile/admin-catalog';
const API_URL_BASKET = 'https://delron.ru/api/profile/basket';

const catalogService = {
    async fetchProducts() {
        const response = await axios.get(API_URL);
        return response.data;
    },

    async addToBasket(userId, productId) {
        await axios.post(`${API_URL_BASKET}/add`, {
            userId: userId,
            productId: productId,
            quantity: 1,
        });
    }
};

export default catalogService;

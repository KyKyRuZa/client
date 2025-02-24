import axios from 'axios';

const API_URL = 'http://213.108.198.68:5000/api';

const profileService = {
    async fetchProducts() {
        const response = await axios.get(`${API_URL}/profile`);
        return response.data;
    },

    async addProduct(productData) {
        const formData = new FormData();
        formData.append('name', productData.name);
        formData.append('description', productData.description);
        formData.append('price', productData.price);
        formData.append('image', productData.image);

        const response = await axios.post(`${API_URL}/profile`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        return response.data;
    },

    async deleteProduct(productId) {
        await axios.delete(`${API_URL}/profile/${productId}`);
    },

    async fetchBasket(userId) {
        const response = await axios.get(`${API_URL}/profile/${userId}`);
        return response.data;
    },

    async incrementQuantity(userId, productId) {
        const response = await axios.put(`${API_URL}/profile/increment`, {
            userId: userId,
            productId: productId
        });
        return response.data;
    },

    async decrementQuantity(userId, productId) {
        const response = await axios.put(`${API_URL}/profile/decrement`, {
            userId: userId,
            productId: productId
        });
        return response.data;
    },

    async removeFromCart(userId, productId) {
        await axios.delete(`${API_URL}/profile/${userId}/${productId}`);
    }
};

export default profileService;

import axios from 'axios';

const API_URL = 'https://delron.ru/api';

const profileService = {
    // Операции с продуктом
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

    async editProduct(productId, productData) {
        const formData = new FormData();
        formData.append('name', productData.name); 
        formData.append('description', productData.description);
        formData.append('price', productData.price);
        formData.append('image', productData.image);

        const response = await axios.put(`${API_URL}/profile/${productId}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        return response.data;
    },

    async deleteProduct(productId) {
        await axios.delete(`${API_URL}/profile/${productId}`);
    },
    
    // Операции с корзиной
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

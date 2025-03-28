import axios from 'axios';

const API_URL = 'https://delron.ru/api/profile';

const productService = {
    // Операции с продуктом
    async fetchProducts() {
        const response = await axios.get(API_URL);
        return response.data;
    },

    async addProduct(productData) {
        const formData = new FormData();
        formData.append('name', productData.name);
        formData.append('description', productData.description);
        formData.append('price', Math.floor(productData.price));
        formData.append('image', productData.image);
        formData.append('category', productData.category);
        formData.append('quantity', productData.quantity);

    
        const response = await axios.post(API_URL, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        return response.data;
    },

    async updateProduct(productId, productData) {
        const formData = new FormData();
        formData.append('name', productData.name);
        formData.append('description', productData.description);
        formData.append('price', Math.floor(productData.price));
        formData.append('category', productData.category);
        formData.append('quantity', productData.quantity);
        formData.append('image', productData.image);
    
        const response = await axios.put(`${API_URL}/${productId}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        return response.data;
    },

    async deleteProduct(productId) {
        await axios.delete(`${API_URL}/${productId}`);
    },
    
    // Операции с корзиной
    async fetchBasket(userId) {
        const response = await axios.get(`${API_URL}/${userId}`);
        return response.data;
    },

    // Add these methods inside productService
    async incrementQuantity(userId, productId) {
        const response = await axios.put(`${API_URL}/basket/increment`, {userId, productId});
        return response.data;
    },
    
    async decrementQuantity(userId, productId) {
        const response = await axios.put(`${API_URL}/basket/decrement`, {userId, productId});
        return response.data;
    },


    async removeFromCart(userId, productId) {
        await axios.delete(`${API_URL}/${userId}/${productId}`);
    }
};

export default productService;

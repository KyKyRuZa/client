import axios from 'axios';

const API_URL = 'https://delron.ru/api/profile/admin-catalog/';

const productService = {
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
    
};

export default productService;

import axios from 'axios';

const API_URL = 'https://delron.ru:5000/api';

const productService = {
    async createProduct(productData) {    
        const response = await axios.post(`${API_URL}/profile`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        return response.data;
    }
}

export default productService;
import axios from 'axios';

const API_URL = 'http://213.108.198.68:5000/api/auth';

class UserService {
  async getUserProfile() {
    const token = localStorage.getItem('token');
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    };

    const response = await axios.get(`${API_URL}/profile`, config);
    return response.data;
  }
}

export default new UserService();

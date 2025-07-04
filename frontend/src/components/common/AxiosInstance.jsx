
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:5172', 
});

export default axiosInstance;
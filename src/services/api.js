import axios from 'axios';

// export const API_URL = 'https://thesnay-snayfin.hf.space/api';
export const API_URL = 'http://localhost:5000/api';


export const login = (credentials) => axios.post(`${API_URL}/users/login`, credentials);
export const register = (data) => axios.post(`${API_URL}/users/register`, data);
export const addTransaction = (data) => axios.post(`${API_URL}/transactions`, data);
export const getTransactions = (userId) => axios.get(`${API_URL}/transactions/${userId}`);
// Add other API calls as needed

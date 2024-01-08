import axios from 'axios';

export const axiosClient = axios.create({
    baseURL: process.env.API_URL || 'http://127.0.0.1:5000/api/v1',
    headers: {
        'Content-Type': 'application/json',
    },
});

import axios from 'axios';

export const Axios = axios.create({
    baseURL: '/api',
    timeout: 60000,

    headers: {
        'content-type': 'application/json'
    }
});

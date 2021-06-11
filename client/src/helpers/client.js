import axios from 'axios';
import { BACKEND_URL } from '../assets/constants/BaseURL';

import Cookies from 'universal-cookie';

const cookies = new Cookies();

const fetchClient = () => {
    const defaultOptions = {
        baseURL: `${BACKEND_URL}`,
        withCredentials: true
    };

    let instance = axios.create(defaultOptions);

    instance.interceptors.request.use((req) => {
        const token = cookies.get('token');
        if (token) req.headers['Authorization'] = `bearer ${token}`;
        return req;
    });

    return instance;
};

export default fetchClient();

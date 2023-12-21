import axios from 'axios'
import { constant } from '../utils/constants'
import { EmptyLocalStorage, GetTokenLocalStorage } from './localStorage/localStorage';

axios.defaults.baseURL = constant.BASE_URL;

const api = axios.create({
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
})

api.interceptors.request.use(function (config) {
    const token = GetTokenLocalStorage();
    config.headers.Authorization = token ? `token ${token}` : '';
    return config;
});

api.interceptors.response.use(
    response => response,
    error => {
        if (error.response.status === 401) {
            setTimeout(() => {
                EmptyLocalStorage()
                window.location.href = '/signin';
            }, 1500)
        }
        return Promise.reject(error);
    });

export default api


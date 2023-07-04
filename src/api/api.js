import axios from 'axios';

axios.defaults.withCredentials = true

const baseURL = 'http://127.0.0.1:8000/app/'

const api = axios.create({
    baseURL: baseURL
})

export default api;
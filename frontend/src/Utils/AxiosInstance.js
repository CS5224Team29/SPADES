import axios from 'axios';
import { GATEWAY_BASE_URL } from './Parameter';


export const axiosInstance = axios.create({
    baseURL: GATEWAY_BASE_URL,
});
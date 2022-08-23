import { API } from '../constants';
import axios from 'axios';

export const getProducts = async () => {
    const response = axios.get(`${API.PRODUCTS}`);
    return response;
}
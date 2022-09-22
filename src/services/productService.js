import { API } from '../constants';
import axios from 'axios';

export const getProducts = async () => {
    const response = axios.get(`${API.PRODUCTS}`);
    return response;
}

export const getProductsAvailability = async () => {
    const response = axios.get(`${API.PRODUCTS_AVAILABILITY}`);
    return response;
}
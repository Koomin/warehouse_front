import { API } from '../constants';
import axios from 'axios';

export const getStores = async () => {
    const response = axios.get(`${API.STORES}`);
    return response;
}
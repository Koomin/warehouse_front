import { API } from '../constants';
import axios from 'axios';

export const getDocuments = async () => {
    const response = axios.get(`${API.DOCUMENTS}`);
    return response;
}

export const getOrders = async () => {
    const response = axios.get(`${API.ORDERS}`);
    return response;
}

export const getDocumentItems = async (id) => {
    const response = axios.get(`${API.DOCUMENT_ITEM}${id}/document/`);
    return response
}

export const getDocumentTypes = async () => {
    const response = axios.get(`${API.DOCUMENT_TYPES}`);
    return response
}

export const getDocumentsByType =  async (id) => {
    const response = axios.get(`${API.DOCUMENTS}${id}/type/`);
    return response
}

export const getOrdersByType =  async (id) => {
    const response = axios.get(`${API.ORDERS}${id}/type/`);
    return response
}


export const uploadDocument = async (details) => {
    const response = axios.post(`${API.DOCUMENTS}`, details);
    return response
}

export const uploadDocumentItems = async (details) => {
    const response = axios.post(`${API.DOCUMENT_ITEM}`, details);
    return response
}

export const updateDocument = async (id, details) => {
    const response = axios.put(`${API.DOCUMENTS}${id}/`, details);
    return response
}
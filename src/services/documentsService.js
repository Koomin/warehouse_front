import { API } from '../constants';
import axios from 'axios';

export const getDocuments = async () => {
    const response = axios.get(`${API.DOCUMENTS}`);
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
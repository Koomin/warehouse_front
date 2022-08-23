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
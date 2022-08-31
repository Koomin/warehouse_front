const PREFIXES = {
    DOCKER: "http://0.0.0.0:8000",
    LOCAL: "http://127.0.0.1:8000",
  };
  
  const PREFIX = PREFIXES.DOCKER + '/api';
  

export const API = {
    AUTH: `${PREFIX}/token/`,
    REFRESH: `${PREFIX}/token/refresh/`,
    PRODUCTS: `${PREFIX}/products/`,
    DOCUMENTS: `${PREFIX}/documents/`,
    DOCUMENT_ITEM: `${PREFIX}/document-item/`,
    DOCUMENT_TYPES: `${PREFIX}/document-types/`,
    STORES: `${PREFIX}/store/`,
}
const PREFIXES = {
    DOCKER: "http://0.0.0.0:8000",
    LOCAL: "http://127.0.0.1:8000",
  };
  
  const PREFIX = PREFIXES.LOCAL + '/api/v1';
  

export const API = {
    AUTH: `${PREFIX}/token/`,
    REFRESH: `${PREFIX}/token/refresh/`,
    PRODUCTS: `${PREFIX}/products/`,
    PRODUCTS_AVAILABILITY: `${PREFIX}/products-availability/`,
    DOCUMENTS: `${PREFIX}/documents/`,
    DOCUMENT_ITEM: `${PREFIX}/document-item/`,
    DOCUMENT_TYPES: `${PREFIX}/document-types/`,
    ORDERS: `${PREFIX}/orders/`,
    ORDER_ITEM: `${PREFIX}/order-item/`,
    STORES: `${PREFIX}/stores/`,
}
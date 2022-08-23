const PREFIXES = {
    DOCKER: "http://0.0.0.0:8000",
    LOCAL: "http://127.0.0.1:8000",
  };
  
  const PREFIX = PREFIXES.LOCAL;
  

export const API = {
    PRODUCTS: `${PREFIX}/api/products/`,
    DOCUMENTS: `${PREFIX}/api/documents/`,
    DOCUMENT_ITEM: `${PREFIX}/api/document-item/`,
}
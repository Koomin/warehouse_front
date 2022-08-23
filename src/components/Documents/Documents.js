import React, { useEffect, useState } from "react";
import { getDocuments } from "../../services/documentsService";

import { DocumentsTable } from "./DocumentsTable";

function Documents() {
    const [documents, setDocuments] = useState([]);
    const [isOpenDocumentDialog, setOpenDocumentDialog] = useState(false);

    const fetchDocuments = async () => {
        const response = await getDocuments();
        const documents = response.data;
        setDocuments(documents);
    };

    useEffect(() => {
        fetchDocuments();
    }, []);

    return (
        <DocumentsTable 
            documents={documents}
            isOpenDocumentDialog={isOpenDocumentDialog}
            fetchDocuments={fetchDocuments}
            setOpenDocumentDialog={setOpenDocumentDialog}
        />
    );
}

export default Documents;
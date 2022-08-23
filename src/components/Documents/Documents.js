import MaterialTable from "material-table";
import React, { useEffect, useState } from "react";
import { getDocumentItems, getDocuments } from "../../services/documentsService";
import { DocumentDialog } from "./DocumentDialog";

function Documents({handleChangePage,handleChangeRowsPerPage}) {
    const [documents, setDocuments] = useState([]);
    const [documentItems, setDocumentItems] = useState([]);
    const [documentsData, setDocumentsData] = useState([]);
    const [isOpenDocumentDialog, setOpenDocumentDialog] = useState(false);

    const fetchDocuments = async () => {
        const response = await getDocuments();
        const documents = response.data;
        setDocuments(documents);
    };

    const fetchDocumentItems = async (id) => {
        const response = await getDocumentItems(id);
        const documentItems = response.data;
        setDocumentItems(documentItems);
    };

    const handleClickOpen = async (event, data) => {
        if( data)
        await setDocumentsData(data);
        await fetchDocumentItems(data.id);
        setOpenDocumentDialog(true);
    };

    const handleClose = (shouldFetch = false) => {
        setOpenDocumentDialog(false);
        setDocumentsData([]);
        setDocumentItems([]);
        if (shouldFetch) {
          fetchDocuments();
        }
      };

    useEffect(() => {
        fetchDocuments();
    }, []);

    return (
        <div>
            <MaterialTable 
            columns = {[
                {title: "Numer Optima", field: "optima_full_number"},
                {title: "Wartość Netto", field: "value_net"},
                {title: "Wartość Brutto", field: "value_gross"},
                {title: "Magazyn źródłowy", field: "source_store"},
                {title: "Magazyn docelowy", field: "destination_store"},
                {title: "Grupa dokumentu", field: "document_group"},
                {title: "Typ dokumentu", field: "document_type"},
                {title: "Wyeksportowane", field: "exported"},
            ]}
            options={{
                pageSize: 10,
                pageSizeOptions: [ 10 ]
            }}
            onRowClick={handleClickOpen}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
            data={documents}
            title="Dokumenty"
            />
            <DocumentDialog
                handleClose={() => handleClose(false)}
                documentsData={documentsData}
                documentItems={documentItems}
                open={isOpenDocumentDialog}
            />
        </div>  
    );
}

export default Documents;
import React, { useEffect, useState } from "react";
import { getDocuments, getDocumentItems, getDocumentsByType } from "../../services/documentsService";
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { DocumentsTable } from "./DocumentsTable";
import { styled } from '@mui/material/styles';
import { DocumentDialog } from "./DocumentDialog";
import { DocumentButtons } from "./DocumentsButtons";
import { getDocumentTypes } from "../../services/documentsService";

export const Item = styled(Paper)(({ theme }) => ({
    backgroundImage: null,
    padding: theme.spacing(1),
    textAlign: 'center',
  }));


function Documents() {
    const [documents, setDocuments] = useState([]);
    const [isOpenDocumentDialog, setOpenDocumentDialog] = useState(false);
    const [documentsData, setDocumentsData] = useState([]);
    const [documentItems, setDocumentItems] = useState([]);
    const [documentTypes, setDocumentTypes] = useState([]);
    const [tableTitle, setTableTitle] = useState('Dokumenty');

    const fetchDocumentItems = async (id) => {
        const response = await getDocumentItems(id);
        const documentItems = response.data;
        setDocumentItems(documentItems);
    };

    const fetchDocuments = async (type=null) => {
        let response = null;
        if (!type || type === 0) {
            response = await getDocuments();
        }
        else {
            response = await getDocumentsByType(type);
        }
        const documents = response.data;
        setDocuments(documents);
    };

    const handleClickOpen = async (event, data) => {
        await setDocumentsData(data);
        await fetchDocumentItems(data.id);
        setOpenDocumentDialog(true);
    };

    const handleButtonClick = async (data) => {
        const title = data.typeId !== 0 ? "Dokumenty " + data.typeName : "Dokumenty"
        setTableTitle(title);
        await fetchDocuments(data.typeId);
    };

    const handleClose = (shouldFetch = false) => {
        setOpenDocumentDialog(false);
        setDocumentsData([]);
        setDocumentItems([]);
        if (shouldFetch) {
          fetchDocuments();
        }
      };

    const fetchDocumentTypes = async () => {
        const response = await getDocumentTypes();
        const types = response.data;
        setDocumentTypes(types);
    };

    useEffect(() => {
        fetchDocuments();
        fetchDocumentTypes();
    }, []);


    return (
        <div>
        <Stack spacing={2}>
        <DocumentButtons 
            handleButtonClick={handleButtonClick} 
            documentTypes={documentTypes}
        />
        <DocumentsTable 
            documents={documents}   
            isOpenDocumentDialog={isOpenDocumentDialog}
            fetchDocuments={fetchDocuments}
            setOpenDocumentDialog={setOpenDocumentDialog}
            handleClickOpen={handleClickOpen}
            tableTitle={tableTitle}
        />
        </Stack>
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
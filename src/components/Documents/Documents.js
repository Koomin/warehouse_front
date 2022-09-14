import React, { useEffect, useState } from "react";
import { getDocuments, getDocumentItems, getDocumentsByType, uploadDocument, uploadDocumentItems } from "../../services/documentsService";
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { DocumentsTable } from "./DocumentsTable";
import { styled } from '@mui/material/styles';
import { DocumentDialog } from "./DocumentDialog";
import { DocumentButtons } from "./DocumentsButtons";
import { getDocumentTypes } from "../../services/documentsService";
import { getStores } from "../../services/storesService";
import { DocumentItemTable } from "./DocumentItemTable";

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
    const [documentItemsTable, setDocumentItemsTable] = useState([]);
    const [tableTitle, setTableTitle] = useState('Dokumenty');
    const [isOpenProductionDialog, setOpenProductionDialog] = useState(false);
    const [stores, setStores] = useState();
    const [selectedStore, setSelectedStore] = useState();

    const fetchStores = async () => {
        const response = await getStores();
        setStores(response.data);
    };

    const handleStoreChange = async () => {

    };

    function incrementQuantity(uuid, unit) {
        let item = documentItemsTable[uuid];
        if(unit === 'kg'){
            item['quantity'] = String((parseFloat(item['quantity']) * 10  + 1)/10);
        }
        else {
            item['quantity'] = String(parseFloat(item['quantity']) + 1);
        }
        documentItemsTable[uuid] = item;
        setDocumentItems([]);
        let newItems = Object.keys(documentItemsTable).map((key, value) => documentItemsTable[key]);
        setDocumentItems(newItems);
    };

    function decrementQuantity(uuid, unit) {
        let item = documentItemsTable[uuid];
        if(unit === 'kg'){
            item['quantity'] = String((parseFloat(item['quantity']) * 10  - 1)/10);
        }
        else {
            item['quantity'] = String(parseFloat(item['quantity']) - 1);
        }
        documentItemsTable[uuid] = item;
        setDocumentItems([]);
        let newItems = Object.keys(documentItemsTable).map((key, value) => documentItemsTable[key]);
        setDocumentItems(newItems);
    };

    const handleSaveButton = async (uuid) => {

        const newDocument = {};
        newDocument['source_store'] = documentsData['source_store'];
        newDocument['destination_store'] = selectedStore.uuid
        newDocument['document_type'] = documentTypes.find(x => x.short_name === 'PW').uuid;
        const response = await uploadDocument(newDocument);
        const documentUUID = response.data['uuid'];
        const newDocumentItems = documentItems.map((value) => ({...value, document: documentUUID}));
        const itemsResponse = await uploadDocumentItems(newDocumentItems);
    };

    const handleProductionClick = async () => {
        await fetchStores();
        setOpenProductionDialog(true);
    };

    const fetchDocumentItems = async (uuid) => {
        const response = await getDocumentItems(uuid);
        const documentItems = response.data;
        setDocumentItems(documentItems);
        documentItems.forEach((row) => {setDocumentItemsTable(state => ({ ...state, [row.uuid]: row}))});
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
        await fetchDocumentItems(data.uuid);
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
        setDocumentItemsTable([]);
        setOpenProductionDialog(false);
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
            handleProductionClick={handleProductionClick}
            isOpenProductionDialog={isOpenProductionDialog}
            handleSaveButton={handleSaveButton}
            incrementQuantity={incrementQuantity}
            decrementQuantity={decrementQuantity}
            stores={stores}
            selectedStore={selectedStore}
            setSelectedStore={setSelectedStore}
        />
    </div>
    );
}

export default Documents;
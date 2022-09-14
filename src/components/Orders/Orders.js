import React, { useEffect, useState } from "react";
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import { getDocumentTypes, getDocumentsByType } from "../../services/documentsService";
import {getOrders} from '../../services/documentsService';
import { OrdersTable } from "./OrdersTable";
import {OrdersButtons} from "./OrdersButtons";

export const Item = styled(Paper)(({ theme }) => ({
    backgroundImage: null,
    padding: theme.spacing(1),
    textAlign: 'center',
  }));

function Orders() {
    const [orders, setOrders] = useState([]);
    const [documentTypes, setDocumentTypes] = useState([]);
    const [tableTitle, setTableTitle] = useState('Zamówienia');

    const fetchDocumentTypes = async () => {
        const response = await getDocumentTypes();
        const types = response.data;
        setDocumentTypes(types);
    };

    const fetchOrders = async (type=null) => {
        let response = null;
        if (!type || type === 0) {
            response = await getOrders();
        }
        else {
            response = await getDocumentsByType(type);
        }
        setOrders(response.data);
    };

    const handleButtonClick = async (data) => {
        const title = data.typeId !== 0 ? "Zamówienia " + data.typeName : "Zamówienia"
        setTableTitle(title);
        await fetchOrders(data.typeId);
    };

    useEffect(() => {
        fetchOrders();
        fetchDocumentTypes();
    }, []);

    return (
        <div>
        <Stack spacing={2}>
        <OrdersButtons 
            handleButtonClick={handleButtonClick} 
            documentTypes={documentTypes}
        />
        <OrdersTable 
            orders={orders}   
            // isOpenDocumentDialog={isOpenDocumentDialog}
            // fetchDocuments={fetchDocuments}
            // setOpenDocumentDialog={setOpenDocumentDialog}
            // handleClickOpen={handleClickOpen}
            tableTitle={tableTitle}
        />
        </Stack>
        {/* <DocumentDialog
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
        /> */}
    </div>
    )
}
export default Orders;
import React, { useEffect, useState } from "react";
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import { getDocumentTypes, getDocumentsByType } from "../../services/documentsService";
import {getOrders} from '../../services/documentsService';
import { OrdersTable } from "./OrdersTable";
import {OrdersButtons} from "./OrdersButtons";
import { format } from 'date-fns';

export const Item = styled(Paper)(({ theme }) => ({
    backgroundImage: null,
    padding: theme.spacing(1),
    textAlign: 'center',
  }));

function Orders() {
    const [orders, setOrders] = useState([]);
    const [ordersData, setOrdersData] = useState();
    const [documentTypes, setDocumentTypes] = useState([]);
    const [tableTitle, setTableTitle] = useState('Zamówienia');
    const [documentDate, setDocumentDate] = useState(null);

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
        await setOrders(response.data);
        await setOrdersData(response.data);
    };

    const handleButtonClick = async (data) => {
        const title = data.typeId !== 0 ? "Zamówienia " + data.typeName : "Zamówienia"
        setTableTitle(title);
        await fetchOrders(data.typeId);
        setDocumentDate(null);
    };

    const handleChangeDate = async(date) => {
        await setDocumentDate(date);
        await setOrdersData(orders.filter((row) => row.document_date.includes(format(new Date(date), 'dd-MM-yyyy'))));
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
            documentDate={documentDate}
            handleChangeDate={handleChangeDate}
            setDocumentDate={setDocumentDate}
        />
        <OrdersTable 
            orders={ordersData}
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
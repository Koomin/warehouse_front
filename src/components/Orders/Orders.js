import React, { useEffect, useState } from "react";
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import {
    getDocumentTypes,
    getDocumentsByType,
    getDocumentItems,
    uploadDocument,
    uploadDocumentItems
} from "../../services/documentsService";
import {getOrders} from '../../services/documentsService';
import { OrdersTable } from "./OrdersTable";
import {OrdersButtons} from "./OrdersButtons";
import { format } from 'date-fns';
import {OrderDialog} from "./OrderDialog";
import {getStores} from "../../services/storesService";

export const Item = styled(Paper)(({ theme }) => ({
    backgroundImage: null,
    padding: theme.spacing(1),
    textAlign: 'center',
  }));

function Orders() {
    const [orders, setOrders] = useState([]);
    const [ordersList, setOrdersList] = useState();
    const [ordersData, setOrdersData] = useState([]);
    const [orderItems, setOrderItems] = useState([]);
    const [orderItemsTable, setOrderItemsTable] = useState([]);
    const [documentTypes, setDocumentTypes] = useState([]);
    const [tableTitle, setTableTitle] = useState('Zamówienia');
    const [documentDate, setDocumentDate] = useState(null);
    const [isOpenOrderDialog, setOpenOrderDialog] = useState(false);
    const [isOpenProductionDialog, setOpenProductionDialog] = useState(false);
    const [stores, setStores] = useState();
    const [selectedStore, setSelectedStore] = useState();

    const fetchStores = async () => {
        const response = await getStores();
        setStores(response.data);
    };


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
        await setOrdersList(response.data);
    };

    const fetchOrderItems = async (uuid) => {
        const response = await getDocumentItems(uuid);
        const orderItems = response.data;
        setOrderItems(orderItems);
        orderItems.forEach((row) => {setOrderItemsTable(state => ({ ...state, [row.uuid]: row}))});
    };

    const handleButtonClick = async (data) => {
        const title = data.typeId !== 0 ? "Zamówienia " + data.typeName : "Zamówienia"
        setTableTitle(title);
        await fetchOrders(data.typeId);
        setDocumentDate(null);
    };

    const handleChangeDate = async(date) => {
        await setDocumentDate(date);
        await setOrdersList(orders.filter((row) => row.document_date.includes(format(new Date(date), 'dd-MM-yyyy'))));
    };

    const handleClickOpen = async (event, data) => {
        await setOrdersData(data);
        await fetchOrderItems(data.uuid);
        setOpenOrderDialog(true);
    };

    const handleClose = (shouldFetch = false) => {
        setOpenOrderDialog(false);
        setOrdersData([]);
        setOrderItems([]);
        setOrderItemsTable([]);
        setOpenProductionDialog(false);
        if (shouldFetch) {
          fetchOrders();
        }
    };

    const handleProductionClick = async () => {
        await fetchStores();
        setOpenProductionDialog(true);
    };

    const handleSaveButton = async (uuid) => {

        const newDocument = {};
        newDocument['source_store'] = ordersData['source_store'];
        newDocument['destination_store'] = selectedStore.uuid
        newDocument['document_type'] = documentTypes.find(x => x.short_name === 'PW').uuid;
        const response = await uploadDocument(newDocument);
        const documentUUID = response.data['uuid'];
        const newDocumentItems = orderItems.map((value) => ({...value, document: documentUUID}));
        const itemsResponse = await uploadDocumentItems(newDocumentItems);
    };

    function incrementQuantity(uuid, unit) {
        let item = orderItemsTable[uuid];
        if(unit === 'kg'){
            item['quantity'] = String((parseFloat(item['quantity']) * 10  + 1)/10);
        }
        else {
            item['quantity'] = String(parseFloat(item['quantity']) + 1);
        }
        orderItemsTable[uuid] = item;
        setOrderItems([]);
        let newItems = Object.keys(orderItemsTable).map((key, value) => orderItemsTable[key]);
        setOrderItems(newItems);
    };

    function decrementQuantity(uuid, unit) {
        let item = orderItemsTable[uuid];
        if(unit === 'kg'){
            item['quantity'] = String((parseFloat(item['quantity']) * 10  - 1)/10);
        }
        else {
            item['quantity'] = String(parseFloat(item['quantity']) - 1);
        }
        orderItemsTable[uuid] = item;
        setOrderItems([]);
        let newItems = Object.keys(orderItemsTable).map((key, value) => orderItemsTable[key]);
        setOrderItems(newItems);
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
            orders={ordersList}
            isOpenOrderDialog={isOpenOrderDialog}
            fetchOrders={fetchOrders}
            setOpenOrderDialog={setOpenOrderDialog}
            handleClickOpen={handleClickOpen}
            tableTitle={tableTitle}
        />
        </Stack>
        <OrderDialog
            handleClose={() => handleClose(false)}
            ordersData={ordersData}
            orderItems={orderItems}
            open={isOpenOrderDialog}
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
    )
}
export default Orders;
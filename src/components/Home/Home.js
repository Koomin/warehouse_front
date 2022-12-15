import React, {useEffect, useState} from "react";
import {Divider} from "@mui/material";
import {ThemeProvider} from "@emotion/react";
import {theme} from "../../theme";
import {HomeButtons} from "./HomeButtons";
import Box from "@mui/material/Box";
import {OrderItemTable} from "../Orders/OrderItemTable";
import {getDocumentItems, getOrderItems} from "../../services/documentsService";

function Home() {
    const [selectedType, setSelectedType] = useState();
    const [orderItems, setOrderItems] = useState([]);
    const [orderItemsTable, setOrderItemsTable] = useState([]);


    const handleButtonClick = async (data) => {
        setSelectedType(data.type);
        if (selectedType === 'order') {
            fetchOrderItems();
        }


    }

    const fetchOrderItems = async () => {
        const response = await getOrderItems();
        const orderItems = response.data;
        setOrderItems(orderItems);
        orderItems.forEach((row) => {
            setOrderItemsTable(state => ({...state, [row.uuid]: row}))
        });
    };
    useEffect(() => {
        fetchOrderItems();
        setSelectedType('order');
    }, [])

    return (
        <ThemeProvider theme={theme}>
            <HomeButtons handleButtonClick={handleButtonClick}
                         selectedType={selectedType}
            />
            <Divider style={{backgroundColor: 'rgba(255,102,0,0.86)'}}/>
            <Box sx={{paddingTop: "20px"}}>
                <OrderItemTable orderItems={orderItems} editable={false}/>
            </Box>


        </ThemeProvider>
    );
}

export default Home;


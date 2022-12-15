import React, {useEffect, useState} from "react";
import Slide from '@mui/material/Slide';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import {
    Dialog,
    Button,
    Grid,
    TextField,
} from '@material-ui/core';
import {Divider} from "@mui/material";
import Box from '@mui/material/Box';
import {OrderItemTable} from "./OrderItemTable";
import Autocomplete from '@mui/material/Autocomplete';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export const OrderDialog = ({
                                open,
                                handleClose,
                                ordersData,
                                orderItems,
                                handleSaveButton,
                                incrementQuantity,
                                decrementQuantity,
                                stores,
                                selectedMethod,
                                selectedStore,
                                setSelectedStore
                            }) => {

    return (
        <Dialog
            fullScreen
            open={open}
            onClose={handleClose}
            TransitionComponent={Transition}
            aria-labelledby="scroll-dialog-title"
            aria-describedby="scroll-dialog-description"
        >
            <AppBar sx={{position: 'relative', bgcolor: '#FF6600'}}>
                <Toolbar>
                    <IconButton
                        edge="start"
                        color="inherit"
                        onClick={handleClose}
                        aria-label="close"
                    >
                        <CloseIcon/>
                    </IconButton>
                    <Typography sx={{ml: 2, flex: 1}} variant="h6" component="div">
                        {ordersData.exported ? 'Dokument ' + ordersData.optima_full_number : 'Dokument niewysłany'}
                    </Typography>
                     <Button autoFocus color="inherit" onClick={handleSaveButton}>
                          {selectedMethod === 'production' ?  'Zapisz produkcje' : 'Zapisz wydanie'}
                     </Button>
                </Toolbar>
            </AppBar>
            <Box sx={{padding: '40px'}}>
                <Box sx={{paddingBottom: "20px"}}>
                    <Grid container spacing={2}>
                        <Grid item xs={4}>
                            <TextField id="outlined-basic" label="Numer Optima" variant="outlined" fullWidth disabled
                                       value={ordersData.optima_full_number}/>
                        </Grid>
                        <Grid item xs={4}>
                            <TextField id="outlined-basic" label="Typ dokumentu" variant="outlined" fullWidth disabled
                                       value={ordersData.document_type_name}/>
                        </Grid>
                        <Grid item xs={4}>
                            <TextField id="outlined-basic" label="Grupa" variant="outlined" fullWidth
                                       value={ordersData.document_group_name}/>
                        </Grid>
                        <Grid item xs={6}>
                            <TextField id="outlined-basic" label="Magazyn źródłówy" variant="outlined" fullWidth
                                       value={ordersData.source_store_name}/>
                        </Grid>
                        <Grid item xs={6}>
                            <Autocomplete
                                value={selectedStore}
                                onChange={(event, newValue) => {
                                    setSelectedStore(newValue)
                                }}
                                options={stores.map((row) => ({uuid: row.uuid, label: row.short_name}))}
                                id="controllable-states-demo"
                                renderInput={(params) => <TextField {...params} variant="outlined"
                                                                    label="Magazyn docelowy"/>}
                            />

                        </Grid>
                    </Grid>
                </Box>
                <Divider color="grey" fullWidth/>
                <Box sx={{paddingTop: "20px"}}>
                    <OrderItemTable orderItems={orderItems} incrementQuantity={incrementQuantity} decrementQuantity={decrementQuantity} editable={true}/>
                </Box>
            </Box>
        </Dialog>
    );
};
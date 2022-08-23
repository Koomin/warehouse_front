import React, { useEffect, useState } from "react";
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
import { Divider } from "@mui/material";
import Box from '@mui/material/Box';
import { DocumentItemTable } from "./DocumentItemTable";


const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

export const DocumentDialog = ({ open, handleClose, documentsData, documentItems }) => {
    return (
		<Dialog
            fullScreen
			open={open}
			onClose={handleClose}
			TransitionComponent={Transition}
			aria-labelledby="scroll-dialog-title"
			aria-describedby="scroll-dialog-description"
		>
        <AppBar sx={{ position: 'relative', bgcolor: '#FF6600' }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                {documentsData.exported ? 'Dokument ' + documentsData.optima_full_number : 'Dokument niewysłany'}
            </Typography>
            {/* <Button autoFocus color="inherit" onClick={handleClose}>
              save
            </Button> */}
          </Toolbar>
        </AppBar>
        <Box sx={{padding: '40px'}}>
            <Box sx={{paddingBottom:"20px"}}>
                <Grid container spacing={2}>
                    <Grid item xs={4}>
                        <TextField id="outlined-basic" label="Numer Optima" variant="outlined" fullWidth disabled value={documentsData.optima_full_number}/>
                    </Grid>
                    <Grid item xs={4}>
                        <TextField id="outlined-basic" label="Typ dokumentu" variant="outlined" fullWidth disabled value={documentsData.document_type}/>
                    </Grid>
                    <Grid item xs={4}>
                        <TextField id="outlined-basic" label="Grupa" variant="outlined" fullWidth disabled value={documentsData.document_group}/>
                    </Grid>
                    <Grid item xs={6}>
                        <TextField id="outlined-basic" label="Magazyn źródłówy" variant="outlined" fullWidth value={documentsData.source_store}/>
                    </Grid>
                    <Grid item xs={6}>
                        <TextField id="outlined-basic" label="Magazyn docelowy" variant="outlined" fullWidth value={documentsData.destination_store}/>
                    </Grid>
                    <Grid item xs={6}>
                        <TextField id="outlined-basic" label="Wartość netto" variant="outlined" fullWidth value={documentsData.value_net}/>
                    </Grid>
                    <Grid item xs={6}>
                        <TextField id="outlined-basic" label="Wartość brutto" variant="outlined" fullWidth value={documentsData.value_gross}/>
                    </Grid>
                </Grid>
            </Box>
            <Divider color="grey" fullWidth />
            <Box sx={{paddingTop:"20px"}}>
                <DocumentItemTable documentItems={documentItems} />
            </Box>
        </Box>
		</Dialog>
	);
};
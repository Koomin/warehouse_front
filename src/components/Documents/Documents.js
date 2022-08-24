import React, { useEffect, useState } from "react";
import { getDocuments } from "../../services/documentsService";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { DocumentsTable } from "./DocumentsTable";
import { styled } from '@mui/material/styles';

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
    const Item = styled(Paper)(({ theme }) => ({
        backgroundImage: null,
        padding: theme.spacing(1),
        textAlign: 'center',
      }));

    return (
        <Stack spacing={2}>
            <Item elevation={0}>
                <Grid container spacing={2}>
                    <Grid item xs={1}>
                        <Button fullWidth size='large' variant="outlined">Wszystkie</Button>
                    </Grid>
                    <Grid item xs={1}>
                        <Button fullWidth size='large' color='secondary' variant="outlined">Zamówienia</Button>
                    </Grid>
                    <Grid item xs={1}>
                        <Button fullWidth size='large' variant="outlined">MM</Button>
                    </Grid>
                    <Grid item xs={9}>
                    </Grid>
                </Grid>
            </Item>
            <Item elevation={0}>
                <DocumentsTable 
                    documents={documents}   
                    isOpenDocumentDialog={isOpenDocumentDialog}
                    fetchDocuments={fetchDocuments}
                    setOpenDocumentDialog={setOpenDocumentDialog}
                />
            </Item>
        </Stack>

    );
}

export default Documents;
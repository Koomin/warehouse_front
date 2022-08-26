import { Item } from "./Documents";
import React from "react";
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import { ThemeProvider } from "@emotion/react";
import { theme } from "../../theme";

export function DocumentButtons({handleButtonClick, documentTypes}) {

    const typesNames = {
        'PIEK' : 'Zam. piekarnia',
        'CUK' : 'Zam. cukiernia',
        'MM' : 'Przesuniecia MM'
    }
    return (
        <ThemeProvider theme={theme}>
        <Item elevation={0}>
        <Grid container spacing={2}>
            <Grid item xs={1}>
                <Button fullWidth size='large' variant="outlined" onClick={() => handleButtonClick({typeId: 0})}>Wszystkie</Button>
            </Grid>
            {documentTypes.map((type) => (
                <Grid item xs={2}>
                    <Button fullWidth size='large' variant="outlined" onClick={() => handleButtonClick({typeId: type.id, typeName: type.short_name })}> {typesNames[type.short_name]}</Button>
                </Grid>
            ))}
        </Grid>
        </Item>
        </ThemeProvider>
    );
};
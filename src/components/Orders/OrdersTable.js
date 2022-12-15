import React, {useEffect, useState} from "react";
import MaterialTable from "material-table";
import {Item} from "./Orders";
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import {theme} from "../../theme";
import {ThemeProvider} from "@emotion/react";

export function OrdersTable({
                                handleClickOpen,
                                orders,
                                tableTitle,
                                extended
                            }) {

    const [columns, setColumns] = useState();

    const prepareColumns = async () => {
        let defaultColumns = [
            {title: "Numer Optima", field: "optima_full_number"},
            {title: "Wartość Netto", field: "value_net"},
            {title: "Wartość Brutto", field: "value_gross"},
            {title: "Magazyn źródłowy", field: "source_store_name"},
            {title: "Magazyn docelowy", field: "destination_store_name"},
            {title: "Grupa dokumentu", field: "document_group_name"},
            {title: "Typ dokumentu", field: "document_type_name"},
            {title: "Data dokumentu", field: "document_date", defaultSort: 'asc'},
        ]
        let extendedColumns = [
            {
                title: "Wyeksportowane",
                field: "exported",
                type: "boolean",
                lookup: {true: true, false: false}
            },
            {
                title: "Akcje", field: "uuid", render: (rowData) => (
                    <ThemeProvider theme={theme}>
                        <Grid container spacing={2}>
                            <Grid item>
                                {!rowData.realized ?
                                    <Button fullWidth size='large' variant="outlined"
                                            onClick={(e) => handleClickOpen(e, rowData, 'production')}>Produkcja</Button>
                                    :
                                    <Button fullWidth size='large' variant="outlined" disabled>Produkcja</Button>
                                }
                            </Grid>
                            <Grid item>
                                {rowData.realized && !rowData.issued ?
                                    <Button fullWidth size='large' variant="outlined"
                                            onClick={(e) => handleClickOpen(e, rowData, 'issue')}>Wydanie</Button>
                                    :
                                    <Button fullWidth size='large' variant="outlined" disabled>Wydanie</Button>
                                }
                            </Grid>
                        </Grid>
                    </ThemeProvider>
                )
            },

        ]
        setColumns(extended ? (defaultColumns.concat(extendedColumns)) : defaultColumns)
    }
    useEffect(() => {
        prepareColumns();
    }, []);
    return (
        <div>
            <Item elevation={0}>
                <MaterialTable
                    columns={columns}
                    options={{
                        pageSize: 10,
                        pageSizeOptions: [10]
                    }}
                    // onRowClick={handleClickOpen}
                    // onChangePage={handleChangePage}
                    // onChangeRowsPerPage={handleChangeRowsPerPage}
                    data={orders}
                    title={tableTitle}
                />
            </Item>
        </div>
    );
};
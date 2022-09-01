import React from "react";
import MaterialTable from "material-table";
import { Item } from "./Documents";

export function DocumentsTable({
    handleChangePage,
    handleChangeRowsPerPage,
    handleClickOpen,
    documents,
    tableTitle}) {
        return (
            <div>        
                <Item elevation={0}>
                    <MaterialTable 
                    columns = {[
                        {title: "Numer Optima", field: "optima_full_number"},
                        {title: "Wartość Netto", field: "value_net"},
                        {title: "Wartość Brutto", field: "value_gross"},
                        {title: "Magazyn źródłowy", field: "source_store_name"},
                        {title: "Magazyn docelowy", field: "destination_store_name"},
                        {title: "Grupa dokumentu", field: "document_group_name"},
                        {title: "Typ dokumentu", field: "document_type_name"},
                        {title: "Wyeksportowane", field: "exported", type: "boolean", lookup: {true: true, false: false}},
                    ]}
                    options={{
                        pageSize: 10,
                        pageSizeOptions: [ 10 ]
                    }}
                    onRowClick={handleClickOpen}
                    onChangePage={handleChangePage}
                    onChangeRowsPerPage={handleChangeRowsPerPage}
                    data={documents}
                    title={tableTitle}
                    />
                </Item>
            </div>  
        );
};
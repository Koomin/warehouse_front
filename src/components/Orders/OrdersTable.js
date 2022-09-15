import React from "react";
import MaterialTable from "material-table";
import { Item } from "./Orders";

export function OrdersTable({
    // handleChangePage,
    // handleChangeRowsPerPage,
    handleClickOpen,
    orders,
    tableTitle
}) {
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
                        {title: "Data dokumentu", field: "document_date", defaultSort:'asc'},
                        {title: "Wyeksportowane", field: "exported", type: "boolean", lookup: {true: true, false: false}},
                    ]}
                    options={{
                        pageSize: 10,
                        pageSizeOptions: [ 10 ]
                    }}
                    onRowClick={handleClickOpen}
                    // onChangePage={handleChangePage}
                    // onChangeRowsPerPage={handleChangeRowsPerPage}
                    data={orders}
                    title={tableTitle}
                    />
                </Item>
            </div>  
        );
};
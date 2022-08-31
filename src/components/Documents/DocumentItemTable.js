import React from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow'
import { TextField } from "@mui/material";
import { Button } from '@material-ui/core';
export function DocumentItemTable ({documentItems, isOpenProductionDialog, incrementQuantity, decrementQuantity}) {
    return (
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead >
            <TableRow >
                <TableCell sx={{fontWeight: "bold"}}>Produkt</TableCell>
                <TableCell sx={{fontWeight: "bold"}} align="right">Ilość</TableCell>
                <TableCell sx={{fontWeight: "bold"}} align="right">J.M.</TableCell>
                { !isOpenProductionDialog ? <TableCell sx={{fontWeight: "bold"}} align="right">Cena jednostkowa</TableCell> : ''}
                { !isOpenProductionDialog ? <TableCell sx={{fontWeight: "bold"}} align="right">Netto</TableCell> : ''}
                { !isOpenProductionDialog ? <TableCell sx={{fontWeight: "bold"}} align="right">Brutto</TableCell> : ''}
            </TableRow>
            </TableHead>
            <TableBody>
            {documentItems.map((row) => (
                <TableRow
                key={row.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                <TableCell component="th" scope="row">
                    {row.product}
                </TableCell>
                <TableCell align="right"> {isOpenProductionDialog ? <div><Button onClick={() => incrementQuantity(row.id, row.product_unit)}>+</Button><TextField id="outlined-basic"  variant="standard" value={row.quantity} /><Button onClick={() => decrementQuantity(row.id, row.product_unit)}>-</Button></div>: <div> {row.quantity}</div>} </TableCell>
                <TableCell align="right">{row.product_unit}</TableCell>
                { !isOpenProductionDialog ? <TableCell align="right">{row.product_value}</TableCell> : ''}
                { !isOpenProductionDialog ? <TableCell align="right">{row.net_price}</TableCell> : ''}
                { !isOpenProductionDialog ?  <TableCell align="right">{row.gross_price}</TableCell> : ''} 
                </TableRow>
            ))}
            </TableBody>
        </Table>

);
}
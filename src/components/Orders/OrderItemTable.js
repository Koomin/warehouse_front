import React from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow'
import { TextField } from "@mui/material";
import { Button } from '@material-ui/core';
export function OrderItemTable ({orderItems, incrementQuantity, decrementQuantity}) {
    return (
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead >
            <TableRow >
                <TableCell sx={{fontWeight: "bold"}}>Produkt</TableCell>
                <TableCell sx={{fontWeight: "bold"}} align="right">Ilość</TableCell>
                <TableCell sx={{fontWeight: "bold"}} align="right">J.M.</TableCell>
            </TableRow>
            </TableHead>
            <TableBody>
            {orderItems.map((row) => (
                <TableRow
                key={row.uuid}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                <TableCell component="th" scope="row">
                    {row.product_name}
                </TableCell>
                <TableCell align="right"><div><Button onClick={() => incrementQuantity(row.uuid, row.product_unit)}>+</Button><TextField id="outlined-basic"  variant="standard" value={row.quantity} /><Button onClick={() => decrementQuantity(row.uuid, row.product_unit)}>-</Button></div></TableCell>
                <TableCell align="right">{row.product_unit}</TableCell>
                </TableRow>
            ))}
            </TableBody>
        </Table>

);
}
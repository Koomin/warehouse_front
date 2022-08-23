import React from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow'

export function DocumentItemTable ({documentItems}) {
    return (
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead >
            <TableRow >
                <TableCell sx={{fontWeight: "bold"}}>Produkt</TableCell>
                <TableCell sx={{fontWeight: "bold"}} align="right">Ilość</TableCell>
                <TableCell sx={{fontWeight: "bold"}} align="right">Netto</TableCell>
                <TableCell sx={{fontWeight: "bold"}} align="right">Brutto</TableCell>
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
                <TableCell align="right">{row.quantity}</TableCell>
                <TableCell align="right">{row.net_price}</TableCell>
                <TableCell align="right">{row.gross_price}</TableCell>
                </TableRow>
            ))}
            </TableBody>
        </Table>

);
}
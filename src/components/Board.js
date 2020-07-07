import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
    Table,
    Paper,
    TableRow,
    TableHead,
    TableContainer,
    TableCell,
    TableBody
} from '@material-ui/core';

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
});

const Board = ({ returns }) => {

    const classes = useStyles();
    const returnsArr = returns.map(r => r.totalReturn);
    const cumulative = (index) => {
        if (returnsArr.length === 1) { return returnsArr[0] }
        else {
            return returnsArr.slice(0, index + 1).reduce((a, b) => parseInt(a) + parseInt(b))
        }
    };

    const rows = returns.map((r, index) => {
        return <TableRow key={index}>
            <TableCell component='th' scope='row'>{r.year}</TableCell>
            <TableCell align='right'>{r.totalReturn}</TableCell>
            <TableCell align='right'>{cumulative(index)}</TableCell>
        </TableRow>
    });

    return (
        <TableContainer style={{ width: "60%", display: 'inline-block' }} component={Paper}>
            <Table className={classes.table} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Year</TableCell>
                        <TableCell align="right">Total Return</TableCell>
                        <TableCell align="right">Cumulative Return</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default Board;
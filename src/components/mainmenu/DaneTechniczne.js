import React from 'react';
import './DaneTechniczne.css';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const StyledTableCell = withStyles((theme) => ({
    head: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    body: {
      fontSize: 14,
    },
  }))(TableCell);
  
  const StyledTableRow = withStyles((theme) => ({
    root: {
      '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
      },
    },
  }))(TableRow);

const useStyles = makeStyles({
    table: {
      minWidth: 650,
    },
});

const DaneTechniczne = ({ carData }) => (
    <TableContainer component={Paper}>
      <Table className={useStyles().table} aria-label="simple table">
        <TableHead>
          <StyledTableRow>
            <StyledTableCell align="center" colSpan={2}>Silnik</StyledTableCell>
          </StyledTableRow>
        </TableHead>
        <TableBody>
            <StyledTableRow>
              <StyledTableCell component="th" scope="row">
              Typ:
              </StyledTableCell>
              <StyledTableCell align="right">{carData.technicalities.engine.type}</StyledTableCell>   
            </StyledTableRow>
            <StyledTableRow>
              <StyledTableCell component="th" scope="row">
              Moc:
              </StyledTableCell>
              <StyledTableCell align="right">{carData.technicalities.engine.power}</StyledTableCell>   
            </StyledTableRow>
        </TableBody>
        <TableHead>
          <StyledTableRow>
            <StyledTableCell align="center" colSpan={2}>Wymiary</StyledTableCell>
          </StyledTableRow>
        </TableHead>
        <TableBody>
            <StyledTableRow>
              <StyledTableCell component="th" scope="row">
              Długość:
              </StyledTableCell>
              <StyledTableCell align="right">{carData.technicalities.size.length}</StyledTableCell>   
            </StyledTableRow>
            <StyledTableRow>
              <StyledTableCell component="th" scope="row">
              Szerokość:
              </StyledTableCell>
              <StyledTableCell align="right">{carData.technicalities.size.width}</StyledTableCell>   
            </StyledTableRow>
        </TableBody>
      </Table>
    </TableContainer>
);

export default DaneTechniczne
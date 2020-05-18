import React from 'react';
import './Serwisy.css';
import Button from '@material-ui/core/Button'
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

class Serwisy extends React.Component {
    constructor(){
        super()
        this.state = {
            isLoading: true
        }
    }


    render(){
        const serviceList = this.props.carData.services.map((service,i) =>
        <TableBody> 
            <StyledTableRow key={i} className = "serviceList">
                <TableCell>{service.date}</TableCell>
                <TableCell align="right">{service.title}</TableCell>
            </StyledTableRow>
        </TableBody>
        )

        return(
            <TableContainer className="Serwisy">
                <Table className={useStyles().table} aria-label="simple table">
                <TableHead>
                    <StyledTableRow>
                        <StyledTableCell align="center" colSpan={2}>Ostatnie serwisy</StyledTableCell>
                    </StyledTableRow>
                </TableHead>
                    {serviceList}
                </Table>
            </TableContainer>
        )
    }
}

/*
const serviceList = this.props.carData.services.map((service,i) => 
            <div key={i} className = "serviceList">
                <table>
                    <tbody>
                        <tr>
                            <td>Data: </td><td>{service.date}</td>
                        </tr>
                        <tr>
                            <td>Tytuł: </td><td>{service.title} </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        )

        return(
            <div className="Serwisy">
                <table>
                    <thead><tr><td>Ostatnie Serwisy <Button>Dodaj</Button></td></tr></thead>
                    {serviceList}
                </table>
            </div>
        )
*/

export default Serwisy
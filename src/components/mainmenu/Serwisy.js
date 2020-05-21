import React from 'react';
import './Serwisy.css';
import AddButton from './AddButtonSerwisy';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import EditButton from './EditButton';
import Button from '@material-ui/core/Button';

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

class Serwisy extends React.Component {
    constructor(){
        super()
        this.state = {
            isLoading: true
        }
    }

    render(){
        const serviceList = this.props.carData.services.map((service,i) =>
        <StyledTableRow key={i} className = "serviceList">
            <StyledTableCell>{new Intl.DateTimeFormat('en-US', {hour: 'numeric', minute: 'numeric', second: 'numeric',year: 'numeric', month: 'numeric', day: 'numeric'}).format(service.date)}</StyledTableCell>
            <StyledTableCell align="right">{service.title}</StyledTableCell>
            <StyledTableCell align="center"><EditButton/></StyledTableCell>
        </StyledTableRow>
        )

        return(
            <TableContainer className="Serwisy" component={Paper}>
                <Table className="SerwisyTable" aria-label="simple table">
                <TableHead>
                    <StyledTableRow>
                        <StyledTableCell align="center" colSpan={3}>Zaplanowane serwisy</StyledTableCell>
                    </StyledTableRow>
                </TableHead>
                <TableBody>
                    <StyledTableRow>
                            <StyledTableCell>Data</StyledTableCell>
                            <StyledTableCell align="right">Tytuł</StyledTableCell>
                            <StyledTableCell align="center"><AddButton/></StyledTableCell>
                    </StyledTableRow>

                </TableBody>
                <TableHead>
                    <StyledTableRow>
                        <StyledTableCell align="center" colSpan={3}>Ostatnie serwisy</StyledTableCell>
                    </StyledTableRow>
                </TableHead>
                <TableBody>
                    <StyledTableRow>
                        <StyledTableCell>Data</StyledTableCell>
                        <StyledTableCell align="right">Tytuł</StyledTableCell>
                        <StyledTableCell align="center"><AddButton/></StyledTableCell>
                    </StyledTableRow>
                    {serviceList}
                    <StyledTableRow>
                        <StyledTableCell align="center" colSpan={3}><Button>Historia serwisów</Button></StyledTableCell>
                    </StyledTableRow>
                </TableBody>
                </Table>
            </TableContainer>
        )
    }
}

export default Serwisy
import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
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

class ProfileData extends React.Component {

    render(){
        return(
                <TableContainer className="ProfileData" component={Paper}>
                <Table className="SerwisyTable" aria-label="simple table">
                <TableHead>
                    <StyledTableRow>
                        <StyledTableCell align="center" colSpan={2}>Dane profilu</StyledTableCell>
                    </StyledTableRow>
                </TableHead>
                <TableBody>
                    <StyledTableRow>
                            <StyledTableCell>Imie</StyledTableCell>
                            <StyledTableCell align="right">{this.props.accountData.name}</StyledTableCell>
                    </StyledTableRow>
                    <StyledTableRow>
                            <StyledTableCell>Nazwisko</StyledTableCell>
                            <StyledTableCell align="right">{this.props.accountData.surename}</StyledTableCell>
                    </StyledTableRow>
                    <StyledTableRow>
                            <StyledTableCell>Nazwa konta</StyledTableCell>
                            <StyledTableCell align="right">{this.props.accountData.login}</StyledTableCell>
                    </StyledTableRow>
                    <StyledTableRow>
                            <StyledTableCell>Email</StyledTableCell>
                            <StyledTableCell align="right">{this.props.accountData.email}</StyledTableCell>
                    </StyledTableRow>
                    <StyledTableRow>
                            <StyledTableCell>Hasło</StyledTableCell>
                            <StyledTableCell align="right"><Button>Zmień hasło</Button></StyledTableCell>
                    </StyledTableRow>
                </TableBody>
                </Table>
            </TableContainer>
        )
    }
}

export default ProfileData
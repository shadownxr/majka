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
import EditButton from './EditButtonSerwisy';
import Button from '@material-ui/core/Button';
import SearchButton from './SearchButtonSerwisy';

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
    constructor(props){
        super(props)
        this.state = {
            isLoading: true,
            archive: false,
            services: [{date: "Cos",title:"cos"}],
            account: this.props.account,
            services: this.props.carData
        }
    }

    fetchServices(){
        let details = {
            'userId': this.props.account.id,
            'carId': this.props.carData.id
          };
      
          const options = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(details),
          };
      
          const url = 'http://localhost:8000/services';
      
          fetch(url, options)
          .then(response => response.json())
          .then(result => {
            console.log(result);
            this.setState({services: result});
          });
    }

    componentDidMount(){
        this.fetchServices();
    }

    componentDidUpdate(prevProps,prevState){
        if(this.state.carData !== prevState.carData){
          this.fetchServices();
        }
      }

    onServiceArchiveClicked = () => {
        this.setState({archive: true})
    }

    onBackClicked = () => {
        this.setState({archive: false})
    }

    render(){
        /*const archiveServiceList = this.state.services.map((service,i) =>
        <StyledTableRow key={i} className = "serviceList">
            <StyledTableCell>{new Intl.DateTimeFormat('en-US', {hour: 'numeric', minute: 'numeric', second: 'numeric',year: 'numeric', month: 'numeric', day: 'numeric'}).format(service.date)}</StyledTableCell>
            <StyledTableCell align="right">{service.title}</StyledTableCell>
            <StyledTableCell align="center"><EditButton/></StyledTableCell>
        </StyledTableRow>
        )*/

        var data = Array.from(this.state.services);
        console.log(data);
        const serviceList = data.map((service,i) => {
            return (
            <StyledTableRow key={i} className = "serviceList">
                <StyledTableCell>{(new Date(service.date)).toString()}</StyledTableCell>
                <StyledTableCell align="right">{service.title}</StyledTableCell>
                <StyledTableCell align="center"><EditButton/></StyledTableCell>
            </StyledTableRow>
            )}
        )

        if(this.state.archive === false){
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
                            <StyledTableCell align="center" colSpan={3}><Button onClick = {this.onServiceArchiveClicked}>Historia serwisów</Button></StyledTableCell>
                        </StyledTableRow>
                    </TableBody>
                    </Table>
                </TableContainer>
            )
        } else if (this.state.archive === true){
            return(
                <TableContainer className="Serwisy" component={Paper}>
                    <Table className="SerwisyTable" aria-label="simple table">
                    <TableHead>
                        <StyledTableRow>
                            <StyledTableCell align="center" colSpan={2}>Wszystkie Serwisy</StyledTableCell>
                            <StyledTableCell align="center"><SearchButton /></StyledTableCell>
                        </StyledTableRow>
                    </TableHead>
                    <TableBody>
                        <StyledTableRow>
                            <StyledTableCell>Data</StyledTableCell>
                            <StyledTableCell align="right">Tytuł</StyledTableCell>
                            <StyledTableCell align="center"><AddButton/></StyledTableCell>
                        </StyledTableRow>
                        {/*archiveServiceList*/}
                        <StyledTableRow>
                            <StyledTableCell align="center" colSpan={3}><Button onClick = {this.onBackClicked}>Powrót</Button></StyledTableCell>
                        </StyledTableRow>
                    </TableBody>
                    </Table>
                </TableContainer>
            )
        }
    }
}

export default Serwisy
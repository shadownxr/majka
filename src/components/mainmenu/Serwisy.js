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
import DeleteButton from './DeleteButtonSerwisy';
import Button from '@material-ui/core/Button';
import SearchButton from './SearchButtonSerwisy';
import Moment from 'moment';

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

let archiveServiceSearched;

class Serwisy extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            isLoading: true,
            archive: false,
            account: this.props.account,
            services: this.props.carData,
            search: false,
            searchServices: []
        }
    }

    fetchServices(){
        let details = {
            'userId': this.props.account.id,
            'carId': this.props.carData.acId
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
            this.setState({services: result, searchServices: result});
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

    refreshCallbackHandle = (refresh) => {
        console.log("Refresh: "+refresh);
        if(refresh === true){
            this.fetchServices();
        }
    }

    handleSearchCallback = (callback) => {
        this.setState({searchServices:callback.data,search:callback.search});
    }    

    render(){

        var data = Array.from(this.state.services);
        console.log(data);
        console.log(this.props.carData.acId);
        const serviceList = data
        .filter((list) => {
            return(
                (new Date(list.date) <= new Date())
                &&
                (new Date(list.date) >= Moment(new Date()).subtract(1,'month'))
                )
        })
        .sort((a,b) => {return(new Date(a.date) - new Date(b.date))}).reverse().map((service,i) => {
            return (
            <StyledTableRow key={i} className = "serviceList">
                <StyledTableCell>{(new Date(service.date)).toLocaleDateString()}</StyledTableCell>
                <StyledTableCell align="right">{service.title}</StyledTableCell>
                <StyledTableCell align="center"><DeleteButton serviceId = {service.serviceId} refreshCallback = {this.refreshCallbackHandle}/></StyledTableCell>
            </StyledTableRow>
            )}
        )

        const newServiceList = data.filter((list) => {return( new Date(list.date) > new Date())}).sort((a,b) => {return(new Date(a.date) - new Date(b.date))}).map((service,i) => {
            return (
            <StyledTableRow key={i} className = "serviceList">
                <StyledTableCell>{(new Date(service.date)).toLocaleDateString()}</StyledTableCell>
                <StyledTableCell align="right">{service.title}</StyledTableCell>
                <StyledTableCell align="center"><DeleteButton serviceId = {service.serviceId} refreshCallback = {this.refreshCallbackHandle}/></StyledTableCell>
            </StyledTableRow>
            )}
        )

        let archiveServiceList = data.filter((list) => {return( new Date(list.date) <= new Date())}).sort((a,b) => {return(new Date(a.date) - new Date(b.date))}).reverse().map((service,i) => {
            return (
            <StyledTableRow key={i} className = "serviceList">
                <StyledTableCell>{(new Date(service.date)).toLocaleDateString()}</StyledTableCell>
                <StyledTableCell align="right">{service.title}</StyledTableCell>
                <StyledTableCell align="center"><DeleteButton serviceId = {service.serviceId} refreshCallback = {this.refreshCallbackHandle}/></StyledTableCell>
            </StyledTableRow>
            )}
        )

        var archive = Array.from(this.state.searchServices);
        let archiveSearchServiceList = archive.filter((list) => {return( new Date(list.date) <= new Date())}).sort((a,b) => {return(new Date(a.date) - new Date(b.date))}).reverse().map((service,i) => {
            return (
            <StyledTableRow key={i} className = "serviceList">
                <StyledTableCell>{(new Date(service.date)).toLocaleDateString()}</StyledTableCell>
                <StyledTableCell align="right">{service.title}</StyledTableCell>
                <StyledTableCell align="center"><DeleteButton serviceId = {service.serviceId} refreshCallback = {this.refreshCallbackHandle}/></StyledTableCell>
            </StyledTableRow>
            )}
        )

        if(this.state.archive === false){
            return(
            <div>
                <TableContainer className="Serwisy" component={Paper}>
                <h1 style={{backgroundColor: 'black',color: 'white',alignItems:'center', width: '100%'}}>SERWISY</h1>
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
                                <StyledTableCell align="center"><AddButton account={this.props.account} carData={this.props.carData} refreshCallback={this.refreshCallbackHandle}/></StyledTableCell>
                        </StyledTableRow>
                        {newServiceList}
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
                            <StyledTableCell align="center"><AddButton account={this.props.account} carData={this.props.carData} refreshCallback={this.refreshCallbackHandle}/></StyledTableCell>
                        </StyledTableRow>
                        {serviceList}
                        <StyledTableRow>
                            <StyledTableCell align="center" colSpan={3}><Button onClick = {this.onServiceArchiveClicked}>Historia serwisów</Button></StyledTableCell>
                        </StyledTableRow>
                    </TableBody>
                    </Table>
                </TableContainer>
            </div>
            )
        } else if (this.state.archive === true){
            return(
            <div>
                <TableContainer className="Serwisy" component={Paper}>
                    <Table className="SerwisyTable" aria-label="simple table">
                        <TableHead>
                            <StyledTableRow>
                                <StyledTableCell align="center" colSpan={2}>Wszystkie Serwisy</StyledTableCell>
                                <StyledTableCell align="center"><SearchButton searchResultCallback={this.handleSearchCallback} account={this.props.account} carData={this.props.carData}/></StyledTableCell>
                            </StyledTableRow>
                        </TableHead>
                        <TableBody>
                            <StyledTableRow>
                                <StyledTableCell>Data</StyledTableCell>
                                <StyledTableCell align="right">Tytuł</StyledTableCell>
                                <StyledTableCell align="center"></StyledTableCell>
                            </StyledTableRow>
                            {(this.state.search === false)?archiveServiceList:archiveSearchServiceList}
                            <StyledTableRow>
                                <StyledTableCell align="center" colSpan={3}><Button onClick = {this.onBackClicked}>Powrót</Button></StyledTableCell>
                            </StyledTableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
            )
        }
    }
}

export default Serwisy
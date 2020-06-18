import React from 'react';
import './Spalanie.css';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import AddButton from './AddButtonSpalanie';
import DeleteButton from './DeleteButtonSpalanie';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';
import Button from '@material-ui/core/Button';
import SearchButton from './SearchButtonSpalanie';
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

class Spalanie extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            isLoading: true,
            archive: false,
            account: this.props.account,
            mileage: this.props.carData,
            searchMileage: [],
            search: false,
        }
    }

    fetchMileage(){
        let details = {
            'userId': this.props.account.id,
            'carId': this.props.carData.acId
          };
      
          const options = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(details),
          };
      
          const url = 'http://localhost:8000/mileage';
      
          fetch(url, options)
          .then(response => response.json())
          .then(result => {
            console.log(result);
            this.setState({mileage: result});
          });
    }

    componentDidMount(){
        this.fetchMileage();
    }

    componentDidUpdate(prevProps,prevState){
        if(this.state.carData !== prevState.carData){
          this.fetchMileage();
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
            this.fetchMileage();
        }
    }

    handleSearchCallback = (callback) => {
        this.setState({searchMileage:callback.data,search:callback.search});
    } 

    render(){
        var data = Array.from(this.state.mileage);
        console.log(data);
        console.log(this.props.carData.acId);

        const mileageList = data.filter((list) => {
            return(
                (new Date(list.date) <= new Date())
                &&
                (new Date(list.date) >= Moment(new Date()).subtract(1,'month'))
                )
        }).sort((a,b) => {return(new Date(a.date) - new Date(b.date))}).reverse().map((mileage,i) => {
            return(
                <StyledTableRow key={i} className = "mileageList">
                    <StyledTableCell>{(new Date(mileage.date)).toLocaleDateString()}</StyledTableCell>
                    <StyledTableCell align="center">{mileage.value}L</StyledTableCell>
                    <StyledTableCell align="right">{mileage.distance}KM</StyledTableCell>
                    <StyledTableCell align="center"><DeleteButton mileageId = {mileage.mileageId} refreshCallback = {this.refreshCallbackHandle}/></StyledTableCell>
                </StyledTableRow>
            )
        })

        const archiveMileageList = data.filter((list) => {
            return(
                (new Date(list.date) <= new Date())
                )
        }).sort((a,b) => {return(new Date(a.date) - new Date(b.date))}).reverse().map((mileage,i) => {
            return(
                <StyledTableRow key={i} className = "mileageList">
                    <StyledTableCell>{(new Date(mileage.date)).toLocaleDateString()}</StyledTableCell>
                    <StyledTableCell align="center">{mileage.value}L</StyledTableCell>
                    <StyledTableCell align="right">{mileage.distance}KM</StyledTableCell>
                    <StyledTableCell align="center"><DeleteButton mileageId = {mileage.mileageId} refreshCallback = {this.refreshCallbackHandle}/></StyledTableCell>
                </StyledTableRow>
            )
        })

        var archive = Array.from(this.state.searchMileage);
        let archiveSearchMileageList = archive.filter((list) => {
            return(
                (new Date(list.date) <= new Date())
                )
        }).sort((a,b) => {return(new Date(a.date) - new Date(b.date))}).reverse().map((mileage,i) => {
            return(
                <StyledTableRow key={i} className = "mileageList">
                    <StyledTableCell>{(new Date(mileage.date)).toLocaleDateString()}</StyledTableCell>
                    <StyledTableCell align="center">{mileage.value}L</StyledTableCell>
                    <StyledTableCell align="right">{mileage.distance}KM</StyledTableCell>
                    <StyledTableCell align="center"><DeleteButton mileageId = {mileage.mileageId} refreshCallback = {this.refreshCallbackHandle}/></StyledTableCell>
                </StyledTableRow>
            )
        })

        let chartData = [];

        data.filter((list) => {
            return(
                (new Date(list.date) <= new Date())
                &&
                (new Date(list.date) >= Moment(new Date()).subtract(1,'month'))
                )
        }).forEach((mileage, i) => chartData.push({
            Data: (new Date(mileage.date)).toLocaleDateString(),
            Paliwo: mileage.value
        }));

        if(this.state.archive === false){
            return (
                <div>
                    <h1 style={{backgroundColor: 'black',color: 'white',alignItems:'center', width: '100%'}}>SPALANIE</h1>
                    <div className="chartDiv">
                        <LineChart
                            width={800}
                            height={300}
                            data={chartData}
                            margin={{
                            top: 5, right: 30, left: 20, bottom: 5,
                            }}
                        >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="Data" />
                            <YAxis />
                            <Tooltip />
                            <Line type="monotone" dataKey="Paliwo" stroke="#82ca9d" activeDot={{ r: 8 }}/>
                        </LineChart>
                    </div>
                    <TableContainer className="Serwisy" component={Paper}>
                        <Table className="SerwisyTable" aria-label="simple table">
                        <TableHead>
                            <StyledTableRow>
                                <StyledTableCell align="center" colSpan={4}>Ostatnie tankowania</StyledTableCell>
                            </StyledTableRow>
                        </TableHead>
                        <TableBody>
                            <StyledTableRow>
                                <StyledTableCell>Data</StyledTableCell>
                                <StyledTableCell align="center">Ilość zatankowanego paliwa</StyledTableCell>
                                <StyledTableCell align="right">Przebyta droga</StyledTableCell>
                                <StyledTableCell align="center"><AddButton account={this.props.account} carData={this.props.carData} refreshCallback={this.refreshCallbackHandle}/></StyledTableCell>
                            </StyledTableRow>
                            {mileageList}
                            <StyledTableRow>
                                <StyledTableCell align="center" colSpan={4}><Button onClick = {this.onServiceArchiveClicked}>Historia spalania</Button></StyledTableCell>
                            </StyledTableRow>
                        </TableBody>
                        </Table>
                    </TableContainer>
                </div>
            )} else if(this.state.archive === true){
                return(
                <div>
                    <TableContainer className="Serwisy" component={Paper}>
                        <Table className="SerwisyTable" aria-label="simple table">
                        <TableHead>
                            <StyledTableRow>
                                <StyledTableCell align="center" colSpan={3}>Wszystkie tankowania</StyledTableCell>
                                <StyledTableCell align="center"><SearchButton searchResultCallback={this.handleSearchCallback} account={this.props.account} carData={this.props.carData}/></StyledTableCell>
                            </StyledTableRow>
                        </TableHead>
                        <TableBody>
                            <StyledTableRow>
                                <StyledTableCell>Data</StyledTableCell>
                                <StyledTableCell align="center">Ilość zatankowanego paliwa</StyledTableCell>
                                <StyledTableCell align="right">Przebyta droga</StyledTableCell>
                                <StyledTableCell align="center"></StyledTableCell>
                            </StyledTableRow>
                            {(this.state.search === false)?archiveMileageList:archiveSearchMileageList}
                            <StyledTableRow>
                                <StyledTableCell align="center" colSpan={4}><Button onClick = {this.onBackClicked}>Powrót</Button></StyledTableCell>
                            </StyledTableRow>
                        </TableBody>
                        </Table>
                    </TableContainer>
                </div>
                )}
    }
}

export default Spalanie
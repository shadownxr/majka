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
import EditButton from './EditButtonSpalanie';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';
import Button from '@material-ui/core/Button';
import SearchButton from './SearchButtonSpalanie';

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
    constructor(){
        super()
        this.state = {
            isLoading: true,
            archive: false
        }
    }

    onServiceArchiveClicked = () => {
        this.setState({archive: true})
    }

    onBackClicked = () => {
        this.setState({archive: false})
    }

    render(){
        const mileageList = this.props.carData.mileage.map((mileage,i) => 
        <StyledTableRow key={i} className = "mileageList">
            <StyledTableCell>{new Intl.DateTimeFormat('en-US', {hour: 'numeric', minute: 'numeric', second: 'numeric',year: 'numeric', month: 'numeric', day: 'numeric'}).format(mileage.date)}</StyledTableCell>
            <StyledTableCell align="center">{mileage.value}{mileage.unitF}</StyledTableCell>
            <StyledTableCell align="right">{mileage.distance}{mileage.unitD}</StyledTableCell>
            <StyledTableCell align="center"><EditButton/></StyledTableCell>
        </StyledTableRow>
        )

        const mileageArchiveList = this.props.carData.mileage.map((mileage,i) => 
        <StyledTableRow key={i} className = "mileageList">
            <StyledTableCell>{new Intl.DateTimeFormat('en-US', {hour: 'numeric', minute: 'numeric', second: 'numeric',year: 'numeric', month: 'numeric', day: 'numeric'}).format(mileage.date)}</StyledTableCell>
            <StyledTableCell align="center">{mileage.value}{mileage.unitF}</StyledTableCell>
            <StyledTableCell align="right">{mileage.distance}{mileage.unitD}</StyledTableCell>
            <StyledTableCell align="center"><EditButton/></StyledTableCell>
        </StyledTableRow>
        )

        let chartData = [];

        this.props.carData.mileage.forEach((mileage, i) => chartData.push({
            name: new Intl.DateTimeFormat('en-US', {year: 'numeric', month: 'numeric', day: 'numeric'}).format(mileage.date),
            Paliwo: mileage.value
        }));

        if(this.state.archive === false){
            return (
                <div>
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
                            <XAxis dataKey="name" />
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
                                <StyledTableCell align="center"><AddButton/></StyledTableCell>
                            </StyledTableRow>
                            {mileageList}
                        </TableBody>
                            <StyledTableRow>
                                <StyledTableCell align="center" colSpan={4}><Button onClick = {this.onServiceArchiveClicked}>Historia spalania</Button></StyledTableCell>
                            </StyledTableRow>
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
                                <StyledTableCell align="center"><SearchButton /></StyledTableCell>
                            </StyledTableRow>
                        </TableHead>
                        <TableBody>
                            <StyledTableRow>
                                <StyledTableCell>Data</StyledTableCell>
                                <StyledTableCell align="center">Ilość zatankowanego paliwa</StyledTableCell>
                                <StyledTableCell align="right">Przebyta droga</StyledTableCell>
                                <StyledTableCell align="center"><AddButton/></StyledTableCell>
                            </StyledTableRow>
                            {mileageArchiveList}
                        </TableBody>
                            <StyledTableRow>
                                <StyledTableCell align="center" colSpan={4}><Button onClick = {this.onBackClicked}>Powrót</Button></StyledTableCell>
                            </StyledTableRow>
                        </Table>
                    </TableContainer>
                </div>
                )}
    }
}

export default Spalanie
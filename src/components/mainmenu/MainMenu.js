import React from 'react';
import './MainMenu.css';
import Button from '@material-ui/core/Button';
import Serwisy from './Serwisy';
import Spalanie from './Spalanie';
import DaneTechniczne from './DaneTechniczne';

class MainMenu extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            carId: this.props.carId,
            carsData: this.props.carsData,
        }
      }

    onSerwisyClicked = () => {
        this.setState({carId: this.props.carId})
        this.props.parentCallback(<Serwisy carId = {this.state.carId}/>)
    }
    
    onSpalanieClicked = () => {
        this.setState({carId: this.props.carId})
        this.props.parentCallback(<Spalanie carId = {this.state.carId}/>)
    }
    
    onDaneTechniczneClicked = () => {
        this.setState({carId: this.props.carId})
        this.props.parentCallback(<DaneTechniczne carId = {this.state.carId} carsData = {this.state.carsData}/>)
    }

    componentDidMount(){
        //console.log(this.state)
    }

    componentDidUpdate(prevProps){
        if(prevProps.carId !== this.state.carId){
            this.setState({carId: this.props.carId},() => {console.log(this.state)})
        }
    }

    render(){
        return(
            <div className="MainMenu">
                <Button onClick = {this.onSpalanieClicked}>Spalanie</Button>
                <Button onClick = {this.onSerwisyClicked}>Serwisy</Button>
                <Button onClick = {this.onDaneTechniczneClicked}>Dane Techniczne</Button>
            </div>
        )
    }
}

export default MainMenu
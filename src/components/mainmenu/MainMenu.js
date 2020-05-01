import React from 'react';
import './MainMenu.css';
import Button from '@material-ui/core/Button';
import Serwisy from './Serwisy';
import Spalanie from './Spalanie';
import DaneTechniczne from './DaneTechniczne';

class MainMenu extends React.Component {
    constructor(){
        super()
        this.state = {
            carId: 0,
        }

        this.onSerwisyClicked = this.onSerwisyClicked.bind(this);
        this.onSpalanieClicked = this.onSpalanieClicked.bind(this);
        this.onDaneTechniczneClicked = this.onDaneTechniczneClicked.bind(this);
      }
    
    onSerwisyClicked(){
        this.setState({carId: this.props.carId})
        this.props.parentCallback(<Serwisy carId = {this.state.carId}/>)
    }
    
    onSpalanieClicked(){
        this.setState({carId: this.props.carId})
        this.props.parentCallback(<Spalanie carId = {this.state.carId}/>)
    }
    
    onDaneTechniczneClicked(){
        this.setState({carId: this.props.carId})
        this.props.parentCallback(<DaneTechniczne carId = {this.state.carId}/>)
    }

    componentDidMount(){
        this.setState({carId: this.props.carId})
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
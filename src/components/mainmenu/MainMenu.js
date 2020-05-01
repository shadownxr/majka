import React from 'react';
import './MainMenu.css';
import Button from '@material-ui/core/Button';
import Serwisy from './Serwisy';
import Spalanie from './Spalanie';
import DaneTechniczne from './DaneTechniczne';

class MainMenu extends React.Component {
    onSerwisyClicked = () => {
        this.props.parentCallback(<Serwisy carData={this.props.carData} />)
    }
    
    onSpalanieClicked = () => {
        this.props.parentCallback(<Spalanie carData={this.props.carData} />)
    }
    
    onDaneTechniczneClicked = () => {
        this.props.parentCallback(<DaneTechniczne carData = {this.props.carData} />)
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
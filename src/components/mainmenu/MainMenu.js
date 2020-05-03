import React from 'react';
import './MainMenu.css';
import Button from '@material-ui/core/Button';
import Serwisy from './Serwisy';
import Spalanie from './Spalanie';
import DaneTechniczne from './DaneTechniczne';

class MainMenu extends React.Component {
    onSerwisyClicked = () => {
        this.props.mainMenuChoiceCallback(<Serwisy carData={this.props.carData} />)
    }
    
    onSpalanieClicked = () => {
        this.props.mainMenuChoiceCallback(<Spalanie carData={this.props.carData} />)
    }
    
    onDaneTechniczneClicked = () => {
        this.props.mainMenuChoiceCallback(<DaneTechniczne carData = {this.props.carData} />)
    }

    render(){
        return(
            <div className="MainMenu">
                <div className="buttonContainer">
                    <Button onClick = {this.onSpalanieClicked}>Spalanie</Button>
                    <Button onClick = {this.onSerwisyClicked}>Serwisy</Button>
                    <Button onClick = {this.onDaneTechniczneClicked}>Dane Techniczne</Button>
                </div>
            </div>
        )
    }
}

export default MainMenu
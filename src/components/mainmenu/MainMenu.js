import React from 'react';
import './MainMenu.css';
import Button from '@material-ui/core/Button';
import Serwisy from './Serwisy';
import Spalanie from './Spalanie';
import DaneTechniczne from './DaneTechniczne';

class MainMenu extends React.Component {
    constructor(){
        super()
        this.onSerwisyClicked = this.onSerwisyClicked.bind(this);
        this.onSpalanieClicked = this.onSpalanieClicked.bind(this);
        this.onDaneTechniczneClicked = this.onDaneTechniczneClicked.bind(this);
      }
    
    onSerwisyClicked(){
        this.props.parrentCallback(<Serwisy />)
    }
    
    onSpalanieClicked(){
        this.props.parrentCallback(<Spalanie />)
    }
    
    onDaneTechniczneClicked(){
        this.props.parrentCallback(<DaneTechniczne />)
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
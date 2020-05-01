import React from 'react';
import './CarMenu.css';
import Car from './Car';
import CarIconButton from './CarIconButton';
import CarIcon from '@material-ui/icons/DriveEta';
import AddButton from './AddButton' 

class CarMenu extends React.Component {
    constructor(){
        super()
        this.onCarButtonClicked = this.onCarButtonClicked.bind(this);
        this.onCarButtonClicked2 = this.onCarButtonClicked2.bind(this);
    }

    onCarButtonClicked(){
        this.props.parentCallback(1)
    }

    onCarButtonClicked2(){
        this.props.parentCallback(2)
    }

    render(){
        return(
            <div className="CarMenu">
                <div className="Logo">
                    Logo
                </div>
                <Car className = "Car">
                    <CarIconButton onClick = {this.onCarButtonClicked}>
                        <div className="CarName">CarName 1</div>
                        <div className="CarIcon"><CarIcon style={{width:'50px',height:'50px'}}/></div>
                    </CarIconButton>
                </Car>
                <Car className = "Car">
                    <CarIconButton onClick = {this.onCarButtonClicked2}>
                        <div className="CarName">CarName 2</div>
                        <div className="CarIcon"><CarIcon style={{width:'50px',height:'50px'}}/></div>
                    </CarIconButton>
                </Car>
                <div>
                    <AddButton />
                </div>
            </div>
        )
    }
}

export default CarMenu
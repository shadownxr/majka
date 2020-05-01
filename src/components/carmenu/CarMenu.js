import React from 'react';
import './CarMenu.css';
import Car from './Car';
import CarIconButton from './CarIconButton';
import CarIcon from '@material-ui/icons/DriveEta';
import AddButton from './AddButton' 

class CarMenu extends React.Component {
    render(){
        const carButtons = this.props.carsData.map((car, i) => 
            <Car className = "Car" key = {i}>
                <CarIconButton onClick = {() => {this.props.onCarClick(car.carId)}}>
                    <div className="CarName">{car.brand} {car.model}</div>
                    <div className="CarIcon"><CarIcon style={{width:'50px',height:'50px'}}/></div>
                </CarIconButton>
            </Car>
        )

        return(
            <div className="CarMenu">
                <div className="Logo">
                    Logo
                </div>
                {carButtons}
                <div>
                    <AddButton />
                </div>
            </div>
        )
    }
}

export default CarMenu
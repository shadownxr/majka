import React from 'react';
import './CarMenu.css';
import Car from './Car';
import CarIconButton from './CarIconButton';
import AddButton from './AddButton';

class CarMenu extends React.Component {
    render(){
        const carButtons = this.props.carsData.map((car, i) => 
            <Car className = "Car" key = {i}>
                <CarIconButton onClick = {() => {this.props.onCarClick(car.carId)}}>
                    <div className="CarName">{car.model}</div>
                    <div className="CarIcon"><img src={require(`${car.caricon}`)} alt="Not Found" style={{width: "50px", height: "50px"}}/></div>
                </CarIconButton>
            </Car>
        )

        //`${car.caricon}`

        return(
            <div className="CarMenu">
                <div className="Logo">
                    Logo
                </div>
                {carButtons}
                <div className="AddButtonContainer">
                    <AddButton />
                </div>
            </div>
        )
    }
}

export default CarMenu
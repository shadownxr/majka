import React from 'react';
import './CarMenu.css';
import Car from './Car';
import CarIconButton from './CarIconButton';
import AddButton from './AddButton';

class CarMenu extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            account: this.props.account,
        }
      }

    refreshCallbackHandle = (refresh) => {
        console.log("CarMenu callback: "+refresh)
        this.props.refreshCallback(refresh);
    }

    componentDidUpdate(prevProps,prevState){
        if(this.props.carsData !== prevProps.carsData){
            console.log("update");
            this.forceUpdate();
        }
    }

    render(){
        let carButtons;
        carButtons = this.props.carsData.map((car, i) => 
            <Car className = "Car" key = {i}>
                <CarIconButton onClick = {() => {this.props.onCarClick(car.acId)}}>
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
                    <AddButton account={this.state.account} refreshCallback={this.refreshCallbackHandle}/>
                </div>
            </div>
        )
    }
}

export default CarMenu
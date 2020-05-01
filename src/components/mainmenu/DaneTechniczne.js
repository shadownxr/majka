import React from 'react';
import './DaneTechniczne.css';

class DaneTechniczne extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            carId: 1,
            carData: this.props.carData,
        }
    }

    componentDidUpdate(prevProps){
        if(prevProps.carId !== this.state.carId){
            this.setState({carId: this.props.carId})
        }
    }

    render(){
        console.log(this.props)
        return(
            <div className="DaneTechniczne">
                Silnik <br/>
                Typ: {this.props.carsData[this.state.carId-1].technicalities.engine.type}<br/>
                Moc: {this.props.carsData[this.state.carId-1].technicalities.engine.power}<br/>
                Wymiary <br/>
                Długość: {this.props.carsData[this.state.carId-1].technicalities.size.length}<br/>
                Szerokość: {this.props.carsData[this.state.carId-1].technicalities.size.width}<br/>
            </div>
        )
    }
}

export default DaneTechniczne
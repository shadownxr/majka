import React from 'react';
import './Serwisy.css';

class Serwisy extends React.Component {
    constructor(){
        super()
        this.state = {
            isLoading: true
        }
    }

    render(){
        if(this.props.carId === 1) {
            return(
                <div className="Serwisy">
                    Serwisy
                </div>
            )
        } else if(this.props.carId === 2){
            return(
                <div className="Serwisy">
                    Serwisy2
                </div>
            )   
        }
    }
}

export default Serwisy
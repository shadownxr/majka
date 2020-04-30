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
        return(
            <div className="Serwisy">
                Serwisy
            </div>
        )
    }
}

export default Serwisy
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
        const serviceList = this.props.carData.services.map((service,i) => 
            <div key={i} className = "serviceList">
                <table>
                    <tbody>
                        <tr>
                            <td>Data: </td><td>{service.date}</td>
                        </tr>
                        <tr>
                            <td>Tytuł: </td><td>{service.title} </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        )

        return(
            <div className="Serwisy">
                Ostatnie Serwisy
                {serviceList}
            </div>
        )
    }
}

export default Serwisy
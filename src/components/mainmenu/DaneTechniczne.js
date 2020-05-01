import React from 'react';
import './DaneTechniczne.css';

/* class DaneTechniczne extends React.Component {
    render(){
        return(
            <div className="DaneTechniczne">
                Silnik <br/>
                Typ: {this.props.carData.technicalities.engine.type}<br/>
                Moc: {this.props.carData.technicalities.engine.power}<br/>
                Wymiary <br/>
                Długość: {this.props.carData.technicalities.size.length}<br/>
                Szerokość: {this.props.carData.technicalities.size.width}<br/>
            </div>
        )
    }
} */

//Naprawde wolisz ten kod powyzszy od tego zwiezlejszego ponizej? :)

const DaneTechniczne = ({ carData }) => (
    <div className="DaneTechniczne">
        Silnik <br/>
        Typ: {carData.technicalities.engine.type}<br/>
        Moc: {carData.technicalities.engine.power}<br/>
        Wymiary <br/>
        Długość: {carData.technicalities.size.length}<br/>
        Szerokość: {carData.technicalities.size.width}<br/>
    </div>
);

export default DaneTechniczne
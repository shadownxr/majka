import React from 'react';
import './DaneTechniczne.css';

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
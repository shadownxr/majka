import React from 'react';
import './CarMenu.css';
import Car from './Car';
import CarIconButton from './CarIconButton';
import CarIcon from '@material-ui/icons/DriveEta';
import AddButton from './AddButton' 

function CarMenu() {
    return(
        <div className="CarMenu">
            <div className="Logo">
                Logo
            </div>
            <Car className = "Car">
                <CarIconButton>
                    <div className="CarName">CarName</div>
                    <div className="CarIcon"><CarIcon style={{width:'50px',height:'50px'}}/></div>
                </CarIconButton>
            </Car>
            <div>
                <AddButton />
            </div>
        </div>
    );
}

export default CarMenu
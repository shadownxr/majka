import React from 'react';
import './Content.css';

function Content(props) {
    console.log(props)
    return(
        <div className = "ContentContainer">
            <div className="Content">
                {props.currentScreen}
            </div>
        </div>
    );
}

export default Content
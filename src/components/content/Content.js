import React from 'react';
import './Content.css';
import Footer from './Footer';

function Content(props) {
    return(
        <div className = "ContentContainer">
            <div className="Content">
                {props.currentScreen}
            </div>
            <Footer />
        </div>
    );
}

export default Content
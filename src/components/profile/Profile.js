import React from 'react';
import './Profile.css';
import ProfileData from './ProfileData'
import Button from '@material-ui/core/Button';
// import logo from 'C:/Users/shadownxr/Documents/Interfejs/majkar/src/logo.svg';

const logo = null;

class Profile extends React.Component {
    constructor(){
        super()

        this.onProfileClicked = this.onProfileClicked.bind(this);
    }

    onProfileClicked(){
        this.props.parrentCallback(<ProfileData />);
    }

    render(){
        return(
            <div className="Profile">
                <div style={{flex:1}}>
                    <img src={logo} alt="Not found"/>
                </div>
                <div style={{flex:2}}>
                    {this.props.username}
                    <Button onClick = {this.onProfileClicked}>Profile</Button>
                    <Button>Logout</Button>
                </div>
            </div>
        )
    }
}

export default Profile
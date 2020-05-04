import React from 'react';
import './Profile.css';
import ProfileData from './ProfileData'
import Button from '@material-ui/core/Button';

class Profile extends React.Component {
    constructor(){
        super()

        this.onProfileClicked = this.onProfileClicked.bind(this);
    }

    onProfileClicked(){
        this.props.profileChoiceCallback(<ProfileData />);
    }

    render(){
        return(
            <div className="Profile">
                <div style={{flex:1}} className="imgContainer">
                    <img src={require('./motorcycle-helmet.svg')} alt="Not found"/>
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
import React from 'react';
import './Profile.css';
import ProfileData from './ProfileData'
import MyButton from './MyButton';
import Box from '@material-ui/core/Box';

class Profile extends React.Component {

    onProfileClicked = () =>{
        this.props.profileChoiceCallback(<ProfileData account = {this.props.account}/>);
    }

    onLogoutClicked = () => {
        window.location.reload(false);
    }

    render(){
        return(
            <div className="Profile">
                <div style={{flex:1}} className="imgContainer">
                    <img src={require('./motorcycle-helmet.svg')} alt="Not found"/>
                </div>
                <div style={{flex:2}}>
                    <Box component="div" display="inline" width="100%" alignItems="center" justifyContent="center">
                        {this.props.account.name}
                        <MyButton onClick = {this.onProfileClicked} width="auto">Profile</MyButton>
                        <MyButton width="auto" onClick = {this.onLogoutClicked}>Logout</MyButton>
                    </Box>
                </div>
            </div>
        )
    }
}

export default Profile
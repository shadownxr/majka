import React from 'react';
import './Profile.css';
import ProfileData from './ProfileData'
import MyButton from './MyButton';
import Box from '@material-ui/core/Box';

class Profile extends React.Component {
    constructor(){
        super()
        this.onProfileClicked = this.onProfileClicked.bind(this);
    }

    onProfileClicked(){
        this.props.profileChoiceCallback(<ProfileData accountData = {this.props.accountData}/>);
    }

    render(){
        return(
            <div className="Profile">
                <div style={{flex:1}} className="imgContainer">
                    <img src={require('./motorcycle-helmet.svg')} alt="Not found"/>
                </div>
                <div style={{flex:2}}>
                    <Box component="div" display="inline" width="100%" alignItems="center" justifyContent="center">
                        {this.props.accountData.name+" "+this.props.accountData.surename}
                        <MyButton onClick = {this.onProfileClicked} width="auto">Profile</MyButton>
                        <MyButton width="auto">Logout</MyButton>
                    </Box>
                </div>
            </div>
        )
    }
}

export default Profile
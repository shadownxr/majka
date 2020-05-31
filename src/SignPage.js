import React, {useState,useEffect} from 'react';
import SignIn from './SignIn';
import SignUp from './SignUp';
import Container from '@material-ui/core/Container';

export default function SignPage(){
    const [currentScreen,setCurrentScreen] = useState(1);
    
    const signScreenCallbackHandle = (screen) => {
        setCurrentScreen(screen);
    }

    /*useEffect((signCallback) => {
        setCurrentScreen(signCallback);
    })*/

    if(currentScreen === 1){
        return(
            <Container component="main" maxWidth="xs">
                <SignIn signCallback = {signScreenCallbackHandle}/>
            </Container>
        )
    } else if(currentScreen === 2){
        return(
            <Container component="main" maxWidth="xs">
                <SignUp signCallback = {signScreenCallbackHandle}/>
            </Container>
        )
    }
}
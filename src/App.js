import React from 'react';
import './App.css';
import MainMenu from './components/mainmenu/MainMenu';
import Profile from './components/profile/Profile';
import CarMenu from './components/carmenu/CarMenu';
import Content from './components/content/Content';
import DaneTechniczne from './components/mainmenu/DaneTechniczne';
import Button from '@material-ui/core/Button';

class App extends React.Component {
  constructor(){
    super()
    this.state = {
        isLoading: true,
        currentScreen: <DaneTechniczne />
    }

  }

  componentDidMount(){
      setTimeout(()=>{
          this.setState({
              isLoading: false
          })
      },1500)
  }

  mainMenuCallback = (mainMenuData) => {
    this.setState({currentScreen: mainMenuData})
  }

  profileCallback = (profileData) => {
    this.setState({currentScreen: profileData})
  }

  render(){
    return (
      <div className="App">
          <MainMenu parrentCallback = {this.mainMenuCallback}/>
          <Content currentScreen = {this.state.currentScreen} />
          <Profile username="admin" image="C:\Users\shadownxr\Documents\Interfejs\majkar\src\logo.svg" parrentCallback = {this.profileCallback} />
          <CarMenu />
      </div>
    )
  }
}

export default App;
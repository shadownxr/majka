import React from 'react';
import './App.css';
import MainMenu from './components/mainmenu/MainMenu';
import Profile from './components/profile/Profile';
import CarMenu from './components/carmenu/CarMenu';
import Content from './components/content/Content';
import DaneTechniczne from './components/mainmenu/DaneTechniczne';

class App extends React.Component {
  constructor(){
    super()
    this.state = {
        isLoading: true,
        userId: 1,
        carId: 1,
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

  carMenuCallback = (carMenuData) => {
    this.setState({carId: carMenuData})
  }


  render(){
    return (
      <div className="App">
          <MainMenu parentCallback = {this.mainMenuCallback} carId = {this.state.carId}/>
          <Content currentScreen = {this.state.currentScreen} />
          <Profile username="admin" image="C:\Users\shadownxr\Documents\Interfejs\majkar\src\logo.svg" parentCallback = {this.profileCallback} />
          <CarMenu parentCallback = {this.carMenuCallback}/>
      </div>
    )
  }
}

export default App;

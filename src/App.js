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
        //isLoading: true,
        userId: 1,
        carId: 1,
        cars: [
          {carId: 1,brand: "Porsche", model:"911", technicalities: {engine: {type: "benzynowy", power: "385KM"}, size: {width: 1852, length: 4519}}},
          {carId: 2,brand: "Porsche", model:"Carrera GT", technicalities: {engine: {type: "benzynowy", power: "612KM"}, size: {width: 1921, length: 4613}}}
        ],
        currentScreen: null,
    }
  }

  componentDidMount(){
      /*setTimeout(()=>{
          this.setState({
              isLoading: false
          })
      },1500)*/
      this.setState({currentScreen: <DaneTechniczne carId = {this.state.carId} carsData = {this.state.cars}/>})
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
          <MainMenu parentCallback = {this.mainMenuCallback} carId = {this.state.carId} carsData = {this.state.cars} />
          <Content currentScreen = {this.state.currentScreen} />
          <Profile username="admin" image="C:\Users\shadownxr\Documents\Interfejs\majkar\src\logo.svg" parrentCallback = {this.profileCallback} />
          <CarMenu parentCallback = {this.carMenuCallback} carsData = {this.state.cars}/>
      </div>
    )
  }
}

export default App;

import React from 'react';
import './App.css';
import MainMenu from './components/mainmenu/MainMenu';
import Profile from './components/profile/Profile';
import CarMenu from './components/carmenu/CarMenu';
import Content from './components/content/Content';
import DaneTechniczne from './components/mainmenu/DaneTechniczne';

const carsData  = [
  {carId: 1, brand: "Porsche", model:"911", technicalities: {engine: {type: "benzynowy", power: "385KM"}, size: {width: 1852, length: 4519}}},
  {carId: 2, brand: "Porsche", model:"Carrera GT", technicalities: {engine: {type: "benzynowy", power: "612KM"}, size: {width: 1921, length: 4613}}},
  {carId: 3, brand: "Ford", model:"Mustang V8",
    technicalities: {
      engine: {
        type: "benzynowy", power: "580KM"
      },
      size: {
        width: 1921,
        length: 4613
      }
    }
  }
];

class App extends React.Component {
  constructor(){
    super()
    this.state = {
        //isLoading: true,
        userId: 1,
        activeCarId: 1,
        currentScreen: null,
    }
  }

  componentDidMount(){
      /*setTimeout(()=>{
          this.setState({
              isLoading: false
          })
      },1500)*/
      this.setState({
        currentScreen: <DaneTechniczne carData={carsData[this.state.activeCarId-1]} />
      })
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.activeCarId !== this.state.activeCarId) {
      this.setState({
        currentScreen: <DaneTechniczne carData={carsData[this.state.activeCarId-1]} />
      })
    }
  }

  mainMenuCallback = (mainMenuData) => {
    this.setState({currentScreen: mainMenuData})
  }

  profileCallback = (profileData) => {
    this.setState({currentScreen: profileData})
  }

  handleCarClick = (activeCarId) => {
    this.setState({activeCarId: activeCarId})
  }

  render(){
    return (
      <div className="App">
          { /* Nie nazywaj propsow parentCallback bo to nic nie mowi */ }
          <MainMenu parentCallback = {this.mainMenuCallback} carData={carsData[this.state.activeCarId-1]} />
          <Content currentScreen = {this.state.currentScreen} />
          <Profile username="admin" image={null/*"C:\Users\shadownxr\Documents\Interfejs\majkar\src\logo.svg"*/} parrentCallback = {this.profileCallback} />
          <CarMenu onCarClick = {this.handleCarClick} carsData = {carsData}/>
      </div>
    )
  }
}

export default App;

import React from 'react';
import './App.css';
import MainMenu from './components/mainmenu/MainMenu';
import Profile from './components/profile/Profile';
import CarMenu from './components/carmenu/CarMenu';
import Content from './components/content/Content';
import DaneTechniczne from './components/mainmenu/DaneTechniczne';

const carsData  = [
  {carId: 1, brand: "Porsche", model:"911 (992)", caricon:"./caricons/porsche-3-logo-svg-vector.svg", 
  technicalities: {
    engine: {
      type: "benzynowy", power: "385KM"
    }, 
    size: {
      width: 1852, length: 4519
    }
  },
  services: 
    [{
      date: "2020-04-23 18:25:43",title:"Wymiana oleju"
    },
    {
      date: "2020-04-27 18:25:43",title:"Wymiana lamp"
    }]
},
  {carId: 2, brand: "Porsche", model:"Carrera GT", caricon:"./caricons/porsche-3-logo-svg-vector.svg",
    technicalities: {
      engine: {
        type: "benzynowy", power: "612KM"}, 
        size: {
          width: 1921, length: 4613
        }
      },
    services: 
      [{
        date: "2020-04-23 18:25:43",title:"Wymiana paska"
      },
      {
        date: "2020-05-22 18:25:43",title:"Wymiana lamp"
      }]
    },
  {carId: 3, brand: "Ford", model:"Mustang VI", caricon:"./caricons/ford-icon.svg",
    technicalities: {
      engine: {
        type: "benzynowy", power: "450KM"
      },
      size: {
        width: 1916,
        length: 4784
      }
    },
    services: 
      [{
        date: "2020-02-27 18:25:43",title:"Przegląd"
      },
      {
        date: "2020-05-01 18:25:43",title:"Wymiana lamp"
      }]
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
          <MainMenu mainMenuChoiceCallback = {this.mainMenuCallback} carData={carsData[this.state.activeCarId-1]} />
          <Content currentScreen = {this.state.currentScreen} />
          <Profile username="admin" image={null} profileChoiceCallback = {this.profileCallback} />
          <CarMenu onCarClick = {this.handleCarClick} carsData = {carsData}/>
      </div>
    )
  }
}

export default App;

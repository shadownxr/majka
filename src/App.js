import React from 'react';
import './App.css';
import SignPage from './SignPage';
import MainPage from './MainPage';

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
      date: new Date("April 23, 2020 18:25:43"),title:"Wymiana oleju"
    },
    {
      date: new Date("April 27, 2020 18:25:43"),title:"Wymiana lamp"
    }],
  mileage:
    [{
      date: new Date("April 23, 2020 18:25:43"),value:"100",unitF:"L",distance:"300",unitD:"KM"
    },
    {
      date: new Date("April 27, 2020 18:25:43"),value:"50",unitF:"L",distance:"100",unitD:"KM"
    },
    {
      date: new Date("April 30, 2020 18:25:43"),value:"70",unitF:"L",distance:"200",unitD:"KM"
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
        date: new Date("April 23, 2020 18:25:43"),title:"Wymiana paska"
      },
      {
        date: new Date("May 22, 2020 18:25:43"),title:"Wymiana lamp"
      }],
    mileage:
      [{
        date: new Date("April 23, 2020 18:25:43"),value:"100",unitF:"L",distance:"300",unitD:"KM"
      },
      {
        date: new Date("April 27, 2020 18:25:43"),value:"50",unitF:"L",distance:"100",unitD:"KM"
      },
      {
        date: new Date("April 30, 2020 18:25:43"),value:"70",unitF:"L",distance:"200",unitD:"KM"
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
        date: new Date("January 27, 2020 18:25:43"),title:"Przegląd"
      },
      {
        date: new Date("May 1, 2020 18:25:43"),title:"Wymiana lamp"
      }],
    mileage:
      [{
        date: new Date("April 23, 2020 18:25:43"),value:"100",unitF:"L",distance:"300",unitD:"KM"
      },
      {
        date: new Date("April 27, 2020 18:25:43"),value:"50",unitF:"L",distance:"100",unitD:"KM"
      },
      {
        date: new Date("April 30, 2020 18:25:43"),value:"70",unitF:"L",distance:"200",unitD:"KM"
      }]
  }
];

const account = {
  id: 1,
  login: "admin",
  password: "asdf",
  name: "Admin",
  surename: "Adminowsky",
  email: "AAdminowsky@gmail.com",
}

class App extends React.Component {
  constructor(){
    super()
    this.state = {
        //isLoading: true,
        userId: 1,
        activeCarId: 1,
        currentScreen: null,
        loginPage: true,
    }
  }

  handleChangeScreen = (screen) => {
    this.setState({loginPage: screen});
  }

  render(){
    if(this.state.loginPage === false){
      return (
        <div className="App">
          <MainPage carData={carsData} account={account}/>
        </div>
      )
    } else if(this.state.loginPage === true){
      return (
        <div className="App">
          <SignPage loginCallback={this.handleChangeScreen}/>
        </div>
      );
    }
  }
}

export default App;

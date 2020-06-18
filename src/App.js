import React from 'react';
import './App.css';
import SignPage from './SignPage';
import MainPage from './MainPage';

class App extends React.Component {
  constructor(props){
    super(props)
    this.state = {
        //isLoading: true,
        //userId: this.props.account.id,
        activeCarId: 1,
        currentScreen: null,
        loginPage: true,
        account: null,
        carsData: null,
        isEmpty: false,
    }
  }

  fetchCars(){
    let details = {
      'userId': this.state.account[0].id
    };

    const options = {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(details),
    };

    const url = 'http://localhost:8000/cars/list';

    fetch(url, options)
    .then(response => response.json())
    .then(result => {
      console.log(result);
      this.setState({carsData: result});
    });
  }

  componentDidUpdate(prevProps,prevState){
    if(this.state.account !== prevState.account){
      this.fetchCars();
    }
  }

  handleChangeScreen = (screen) => {
    this.setState({loginPage: screen});
  }

  accountHandle = (account) => {
    this.setState({account: account});
  }

  refreshCallbackHandle = (refresh) => {
    console.log("App callback: "+refresh);
    console.log(this.state.carsData);
    if(refresh === true){
      this.fetchCars();
    }
  }

  render(){
    if(this.state.loginPage === false){
      if(this.state.carsData === null){
        return <div/>
      } else {
      return (
        <div className="App">
          <MainPage carData={this.state.carsData} account={this.state.account[0]} refreshCallback={this.refreshCallbackHandle}/>
        </div>
      )}
    } else if(this.state.loginPage === true){
      return (
        <div className="App">
          <SignPage loginCallback={this.handleChangeScreen} dataCallback = {this.accountHandle}/>
        </div>
      );
    }
  }
}

export default App;

import React from 'react';
import './App.css';
import SignPage from './SignPage';
import MainPage from './MainPage';

const account = {
  id: 1,
  login: "admin",
  password: "asdf",
  name: "Admin",
  surename: "Adminowsky",
  email: "AAdminowsky@gmail.com",
}

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
        carsData: null
    }
  }

  fetchCars(account){
    let details = {
      'userId': account
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

  componentDidMount(){
    /*if(this.state.account != null){
      this.fetchCars(this.state.account);
    }*/
  }

  componentDidUpdate(prevProps){
    if(this.props.dataCallback !== prevProps.dataCallback){
      this.fetchCars();
    }
  }

  handleChangeScreen = (screen) => {
    this.setState({loginPage: screen});
  }

  accountHandle = (account) => {
    this.setState({account: account});
    console.log(this.state.account);
  }

  render(){
    if(this.state.loginPage === false){
      return (
        <div className="App">
          {/*<MainPage carData={this.state.carsData} account={this.state.account}/>*/}
        </div>
      )
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

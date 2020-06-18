import React from 'react';
import MainMenu from './components/mainmenu/MainMenu';
import Profile from './components/profile/Profile';
import CarMenu from './components/carmenu/CarMenu';
import Content from './components/content/Content';
import DaneTechniczne from './components/mainmenu/DaneTechniczne';
import './MainPage.css';

class MainPage extends React.Component {
    constructor(props){
      super(props)
      this.state = {
          userId: 1,
          activeCarId: 1,
          currentScreen: null,
          loginPage: true,
          carsData: this.props.carData,
          account: this.props.account,
      }
    }
  
    componentDidMount(){
        this.setState({
          currentScreen: <DaneTechniczne carData={this.state.carsData[this.state.activeCarId-1]} />,
        })
    }
  
    componentDidUpdate(prevProps, prevState) {
      if (prevState.activeCarId !== this.state.activeCarId) {
        this.setState({
          currentScreen: <DaneTechniczne carData={this.state.carsData[this.state.activeCarId-1]} />,
          activeCarId: this.state.carsData[this.state.activeCarId-1].acId
        })
      }
      if (this.props.carsData !== prevProps.carsData){
        this.setState({carsData: this.props.carData});
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
  
    refreshCallbackHandle = (refresh) => {
      console.log("Main Page callback: "+refresh);
      this.props.refreshCallback(refresh);
    }

    render(){
        return (
          <div className="MainPage">
              <MainMenu mainMenuChoiceCallback = {this.mainMenuCallback} carData={this.props.carData[this.state.activeCarId-1]} account={this.state.account}/>
              <Content currentScreen = {this.state.currentScreen} />
              <Profile account = {this.state.account} image={null} profileChoiceCallback = {this.profileCallback} />
              <CarMenu onCarClick = {this.handleCarClick} carsData = {this.props.carData} account={this.state.account} refreshCallback = {this.refreshCallbackHandle} activeCarId = {this.state.activeCarId}/>
          </div>
        )
    }
  }
  
  export default MainPage;
  
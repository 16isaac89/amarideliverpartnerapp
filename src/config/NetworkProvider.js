import React,{Component} from 'react';
import NetInfo from '@react-native-community/netinfo';
import { connect } from 'react-redux';
import * as actions from '../redux/actions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AppState, StyleSheet, Text, View} from 'react-native';


const NetworkContext = React.createContext({ isConnected: true });
let unsubscribe = ""
class NetworkProvider extends Component {
  state = {
    isConnected: true,
    appState: AppState.currentState,
  };

  checkactiveorder = async() =>{
    let navigation = this.props.navigation
    let active = await AsyncStorage.getItem('order')
    if(active){
      this.props.setactiveorder(active,navigation)
    }
   }
  componentDidUpdate(){
    unsubscribe = NetInfo.addEventListener(state => {
      let internetstate = state.isInternetReachable
      if(internetstate === true){
        this.props.getcurrentloc()
        this.checkactiveorder()
        let id = this.props.user.id
        this.props.walletbalance(id)
        this.props.getaddresses(id)
      }
    });
  }

  componentDidMount() {
    unsubscribe = NetInfo.addEventListener(state => {
        let internetstate = state.isInternetReachable
        this.props.setinternetstate(internetstate)
      });
      this.appStateSubscription = AppState.addEventListener(
        'change',
        nextAppState => {
          if (
            this.state.appState.match(/inactive|background/) &&
            nextAppState === 'active'
          ) {
            console.log('App has come to the foreground!');
          }
          this.setState({appState: nextAppState});
          this.props.setappstate(nextAppState)
          console.log(nextAppState)
          
        },
      );
  }

  componentWillUnmount() {
    this.appStateSubscription.remove();
    if (unsubscribe != null) unsubscribe()
  }


  render() {
    return (
      <NetworkContext.Provider value={this.state}>
        {this.props.children}
      </NetworkContext.Provider>
    );
  }
}

function mapStateToProps( state ) {
    return { 
     user:state.auth.user,
     appstate:state.auth.appstate,
    };
  }
  
  export default connect(mapStateToProps, actions)(NetworkProvider);
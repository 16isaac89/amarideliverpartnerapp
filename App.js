import React,{Component} from 'react'
import MainNavigator from './src/navigation/MainNavigator'
import store from './src/redux/store';
import { Provider } from 'react-redux';
import {SafeAreaProvider} from 'react-native-safe-area-context';


class App extends Component {
  render(){
  return (
    <SafeAreaProvider>
    <Provider store={store}>
    {/* <NetworkProvider>  */}
      <MainNavigator/>
    {/* </NetworkProvider> */}
   </Provider>
 </SafeAreaProvider>
   
  );
  }
}

export default App;
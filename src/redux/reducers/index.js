import { combineReducers } from 'redux';
 import order from './order';
 import auth from './auth';
// import wallet from './wallet';
// import address from './address';
// import system from './system';
// import ticketing from './ticketing'
// import taxi from './taxi'


export default combineReducers({
    auth,order
//   orders,auth,wallet,address,system,ticketing,taxi
  });
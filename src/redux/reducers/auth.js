
import {AppState} from 'react-native';
import {
    AUTH_LOADER,
    PASSWORD_CHANGED,
    LOGIN_SUCCESS,
   
    LOG_OUT,
    SET_INTERNET_STATE,
    EMAIL_CHANGED,
    PHONE_NUMBER_CHANGED,
    BUSINESS_NAME_CHANGED,
    AUTHLOADER_OFF,

    SET_COUNTRY_CODE,
    C_PASSWORD_CHANGED,
    SET_APP_STATE,
    PROFILE_EDITED,
    OPEN_PROFILE_BOTTOMSHEET,
    CLOSE_PROFILE_BOTTOMSHEET,
    OLD_PASSWORD
 } from '../actions/types';
import { bottomsheet } from '../actions';
 
 const INITIAL_STATE = {
   password:'',
   regloader:false,
   user:"",
   loggedin:false,
   internetstate:false,
   internetstatemodal:false,
   businessname:'',
   phonenumber:'',
   countrycode:'',
   email:'',
   securetext:true, 
   confirmpwd:'',
   oldversion:"0.1",
   newversion:"0.1",
   appvermodal:false,
   phonenumbercode:'+256',
  imageurl:'',
  bottomsheet:false,
  oldpassword:''
 };
 
 export default function(state = INITIAL_STATE, action) {
   switch (action.type) {
     case PASSWORD_CHANGED:
         return{...state, password:action.payload}
     case LOGIN_SUCCESS:
       return{...state, user:action.payload,loggedin:true,regloader:false}
      case PROFILE_EDITED:
        return{...state, user:action.payload,regloader:false,bottomsheet:false}
    case AUTH_LOADER:
     return{...state, regloader:true}
     case LOG_OUT:
       return{...state,loggedin:false,regloader:false}
     case SET_INTERNET_STATE:
       return{...state,internetstate:action.payload,internetstatemodal:action.payload === true ? false : true}
    case EMAIL_CHANGED:
      return{...state,email:action.payload}
    case PHONE_NUMBER_CHANGED:
      return{...state,phonenumber:action.payload.number,phonenumbercode:action.payload.code}
    case BUSINESS_NAME_CHANGED:
      return{...state,businessname:action.payload}
    case AUTHLOADER_OFF:
      return{...state,regloader:false}
   
    case SET_COUNTRY_CODE:
      return{...state,countrycode:action.payload}
    
    case C_PASSWORD_CHANGED:
      return{...state,confirmpwd:action.payload}
    case SET_APP_STATE:
      return{...state,appstate:action.payload}
 case OPEN_PROFILE_BOTTOMSHEET:
  return{...state,bottomsheet:true}
case CLOSE_PROFILE_BOTTOMSHEET:
  return{...state,bottomsheet:false}
case OLD_PASSWORD:
  return{...state,oldpassword:action.payload}
     default:
       return state;
   }
 }
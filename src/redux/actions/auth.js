import {
    PASSWORD_CHANGED,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    AUTH_LOADER,
    LOG_OUT,
    SET_INTERNET_STATE,
    EMAIL_CHANGED,
    PHONE_NUMBER_CHANGED,
    BUSINESS_NAME_CHANGED,
    AUTHLOADER_OFF,
    SET_COUNTRY_CODE,
    SET_APP_STATE,
   C_PASSWORD_CHANGED,
   TOKEN_SENT,
   
 } from '../actions/types';
 import axios from "axios"
 import AsyncStorage from '@react-native-async-storage/async-storage';
 import {commonurl} from '../../config/Utilities'
 import messaging from '@react-native-firebase/messaging';

const ROOT_URL = commonurl;
export const emailchanged = (text) =>{
    return async(dispatch)=>{
        dispatch({type:EMAIL_CHANGED,payload:text})
            }
}
export const phonenumberchanged = (number,code) =>{
    return async(dispatch)=>{
        dispatch({type:PHONE_NUMBER_CHANGED,payload:{number,code}})
            }
}


export const businessnamechanged = (text) =>{
    return async(dispatch)=>{
        dispatch({type:BUSINESS_NAME_CHANGED,payload:text})
            }
}

export const passwordChanged = (text) =>{
    return async(dispatch)=>{
dispatch({type:PASSWORD_CHANGED,payload:text})
    }
}
export const cpasswordChanged = (text) =>{
    return async(dispatch)=>{
dispatch({type:C_PASSWORD_CHANGED,payload:text})
    }
}
export const setinternetstate = (state) =>{
    return(dispatch)=>{
dispatch({type:SET_INTERNET_STATE,payload:state})
    }
}
export const setcountrycode = (text) =>{
    return async(dispatch)=>{
        dispatch({type:SET_COUNTRY_CODE,payload:text})
            }
}
export const setappstate = (state) =>{
    return(dispatch)=>{
dispatch({type:SET_APP_STATE,payload:state})
    }
}
export const logout = () =>{
    return async(dispatch)=>{
        dispatch({type:AUTH_LOADER})
        AsyncStorage.removeItem('userdata');
dispatch({type:LOG_OUT})
    }
}



export const loginuser = (username,password) =>{
    return async(dispatch)=>{
        dispatch({type:AUTH_LOADER})
                axios.post(ROOT_URL+"/login/partner", {
                   phone:username,
                   password:password,
                })
                    .then( async(response)  => {
                        console.log(response.date)
                        let status = response.data.status
                        if(status === '1'){
                            let user = response.data.customer
                            await AsyncStorage.setItem('userdata', JSON.stringify(user))
                            dispatch({type:LOGIN_SUCCESS,payload:user})
                        }else{
                            dispatch({type:AUTHLOADER_OFF})
                            alert(response.data.message)
                        }
                       
                    })
                    .catch(function (error) {
                        console.log(error)
                         console.log("error.response.data")
                        // console.log(error.response.data)
                        // console.log(error.response.status)
                        // if(error.response.datastatus === 422){
                        //     alert(error.response.data.message)
                        // }
                        dispatch({type:AUTHLOADER_OFF})
                    })
                   
    }
}



export const registeruser = (phone,name,email,password) =>{
    return async(dispatch)=>{
        dispatch({type:AUTH_LOADER})
                axios.post(ROOT_URL+"/partner/register", {
                    phone:phone,
                    name:name,
                    email:email,
                    password:password,
                })
                    .then( async(response)  => {
                        let status = response.data.status
                        if(status === '1'){
                            let user = response.data.user
                            await AsyncStorage.setItem('userdata', JSON.stringify(user))
                            dispatch({type:LOGIN_SUCCESS,payload:user})
                        }else{
                            console.log(response.data)
                            let errors = error.response.data.error
                            {Object.keys(errors).map((error, index) => (
                                    alert(errors[error][0])
                            ))}
                            dispatch({type:AUTHLOADER_OFF})
                        }
                      
                    })
                    .catch(function (error) {
                        // let errors = error.response.data.error
                        // {Object.keys(errors).map((error, index) => (
                        //         alert(errors[error][0])
                        // ))}
                         console.log(error.response)
                        dispatch({type:AUTHLOADER_OFF})
                    })
                   
    }
}

export const checklogin = () =>{
    return async(dispatch)=>{
       let userdata = await AsyncStorage.getItem('userdata');
       if(userdata){
        let user = JSON.parse(userdata)
        dispatch({type:LOGIN_SUCCESS,payload:user})
       }
       
    }
}



export const sendfcmtoken=() =>{
    // Register the device with FCM
    return async(dispatch)=>{
        await messaging().registerDeviceForRemoteMessages();
        const token = await messaging().getToken();
        console.log(token)
        let userdata = await AsyncStorage.getItem('userdata');
        if(userdata){
         let user = JSON.parse(userdata)
         axios.post(ROOT_URL+"/partner/token", {
            id:user.id,
            token:token
          })
              .then( async(response)  => {
                console.log(response)
                 dispatch({type:TOKEN_SENT})
                
              })
              .catch(function (error) {
               console.log(error.response) 
                dispatch({type:AUTHLOADER_OFF})
              })
        }
    } 
  }

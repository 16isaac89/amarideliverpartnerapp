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
   PROFILE_EDITED,
   OPEN_PROFILE_BOTTOMSHEET,
   CLOSE_PROFILE_BOTTOMSHEET,
   OLD_PASSWORD
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
export const oldpasswordChanged = (text) =>{
    return async(dispatch)=>{
dispatch({type:OLD_PASSWORD,payload:text})
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

export const setIsBottomSheet = (state) =>{
    return(dispatch)=>{
dispatch({type:OPEN_PROFILE_BOTTOMSHEET})
    }
}
export const closeIsBottomSheet = (state) =>{
    return(dispatch)=>{
dispatch({type:CLOSE_PROFILE_BOTTOMSHEET})
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
                         alert(error.response.data.message)
                        // console.log(error.response.status)
                        if(error.response.datastatus === 422){
                            alert(error.response.data.message)
                        }
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


  export const editprofile=(phone,email,name) =>{
    // Register the device with FCM
    return async(dispatch)=>{
        dispatch({type:AUTH_LOADER})
        let userdata = await AsyncStorage.getItem('userdata');
        if(userdata){
         let user = JSON.parse(userdata)
         axios.post(ROOT_URL+"/partner/change/profiledata", {
            id:user.id,
           // phone:phone,
            email:email,
            name:name
          })
              .then( async(response)  => {
                let user = response.data.user
                console.log(user)
                await AsyncStorage.setItem('userdata', JSON.stringify(user))
                 dispatch({type:PROFILE_EDITED,payload:user})
                alert(response.data.message)
              })
              .catch(function (error) {
               console.log(error.response) 
                dispatch({type:AUTHLOADER_OFF})
              })
        }
    } 
  }


  export const sendimage=(uri,type,ext) =>{
    // Register the device with FCM
    return async(dispatch)=>{
        dispatch({type:AUTH_LOADER})
        let userdata = await AsyncStorage.getItem('userdata');
        if(userdata){
         let user = JSON.parse(userdata)
         const data = new FormData();

        data.append("image", {
            uri,
            name: `image.${ext}`,
            type,
        });
       data.append("id", user.id);
console.log(data,data.image,uri,ext,type)
         axios.post(ROOT_URL+"/partner/change/profile", data,{
            headers: { "Content-Type": "multipart/form-data" },
          })
              .then( async(response)  => {
                let user = response.data.user
                await AsyncStorage.setItem('userdata', JSON.stringify(user))
                 dispatch({type:PROFILE_EDITED,payload:user})
                alert('s')
              })
              .catch(function (error) {
               console.log(error.response) 
                dispatch({type:AUTHLOADER_OFF})
                alert('f')
              })
        }
    } 
  }


  export const editphone=(phone) =>{
    // Register the device with FCM
    return async(dispatch)=>{
        dispatch({type:AUTH_LOADER})
        let userdata = await AsyncStorage.getItem('userdata');
        if(userdata){
         let user = JSON.parse(userdata)
         axios.post(ROOT_URL+"/partner/change/profilephone", {
            id:user.id,
            phone:phone,
          })
              .then( async(response)  => {
                let user = response.data.user
                //console.log(user)
                await AsyncStorage.setItem('userdata', JSON.stringify(user))
                 dispatch({type:PROFILE_EDITED,payload:user})
                alert(response.data.message)
              })
              .catch(function (error) {
               console.log(error.response) 
                dispatch({type:AUTHLOADER_OFF})
              })
        }
    } 
  }


  export const editpassword=(password,old) =>{
    // Register the device with FCM
    return async(dispatch)=>{
        dispatch({type:AUTH_LOADER})
        let userdata = await AsyncStorage.getItem('userdata');
        if(userdata){
         let user = JSON.parse(userdata)
         axios.post(ROOT_URL+"/partner/change/password", {
            id:user.id,
            password:password,
            old:old
          })
              .then( async(response)  => {
               dispatch({type:AUTHLOADER_OFF})
                alert(response.data.message)
              })
              .catch(function (error) {
               console.log(error.response) 
                dispatch({type:AUTHLOADER_OFF})
              })
        }
    } 
  }

  
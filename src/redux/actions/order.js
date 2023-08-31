import {
    SET_PICKUP_ADDRESS,
    SET_DROPOFF_ADDRESS,
    ORDER_LOADER,
    ORDER_LOADER_OFF,
    PACKAGE_DESCRIPTION_CHANGED,
    PACKAGE_QUANTITY_CHANGED,
    GET_VEHICLES,
    SELECT_VEHICLE,
    SAVE_ORDER,
    GET_ORDERS,
    CLOSE_PAYMENT_MODAL,
    RECIPIENT_NAME,
   RECIPIENT_PHONE,
   CANCEL_ORDER,
   TRACKING_ORDER_ID
 } from '../actions/types';
 import axios from "axios"
 import AsyncStorage from '@react-native-async-storage/async-storage';
 import {commonurl,apikey} from '../../config/Utilities'
 import Geolocation from 'react-native-geolocation-service';
 import Geocoder from 'react-native-geocoding';


const ROOT_URL = commonurl;
Geocoder.init(apikey);

export const setpickupaddress = (latitude,longitude) =>{
    return(dispatch)=>{
        dispatch({type:ORDER_LOADER})
        Geocoder.from(latitude,longitude)
        .then(json => {
            var address = json.results[0].formatted_address;
       
            let lat = latitude
            let long = longitude
            dispatch({type:SET_PICKUP_ADDRESS,payload:{address,lat,long}})
        })
        .catch(error => {
            Alert('Failed to get location check your network')
            dispatch({type:ORDER_LOADER_OFF})
        }
            );
        
            
    }
}

export const setdropoffaddress = (latitude,longitude) =>{
    return(dispatch)=>{
        dispatch({type:ORDER_LOADER})
        Geocoder.from(latitude,longitude)
        .then(json => {
            var address = json.results[0].formatted_address;
       
            let lat = latitude
            let long = longitude
            dispatch({type:SET_DROPOFF_ADDRESS,payload:{address,lat,long}})
        })
        .catch(error => {
            Alert('Failed to get location check your network')
            dispatch({type:ORDER_LOADER_OFF})
        }
            );
        
            
    }
}

export const setpickuploc = (address,lat,long,navigation) =>{
    return(dispatch)=>{
dispatch({type:SET_PICKUP_ADDRESS,payload:{address,lat,long}})
navigation.navigate('PackageInfoOne')
    }
}
export const setdropoffloc = (address,lat,long,navigation) =>{
    return(dispatch)=>{
dispatch({type:SET_DROPOFF_ADDRESS,payload:{address,lat,long}})
navigation.navigate('PackageInfoOne')
    }
}

export const quantitychanged= (text) =>{
        return(dispatch)=>{
            dispatch({type:PACKAGE_QUANTITY_CHANGED,payload:text})
        }
    }
    export const trackingorder= (order,navigation) =>{
        return(dispatch)=>{
            dispatch({type:ORDER_LOADER})
            Geocoder.from(order.from)
		.then(json => {
			var latitude = json.results[0].geometry.location.lat;
            var longitude = json.results[0].geometry.location.lng;

			dispatch({type:TRACKING_ORDER_ID,payload:{order,latitude,longitude}})
            navigation.navigate('TrackOrder')
		})
		.catch(error => alert('Error please check your network.'));
            
        }
    }
export const closepaymentmodal= (navigation) =>{
        return(dispatch)=>{
            dispatch({type:CLOSE_PAYMENT_MODAL})
            navigation.navigate('BottomTabBar')
        }
    }

      
export const descriptionchanged= (text) =>{
        return(dispatch)=>{
            dispatch({type:PACKAGE_DESCRIPTION_CHANGED,payload:text})
        }
}

export const selectvehicle= (item) =>{
    return(dispatch)=>{
        dispatch({type:SELECT_VEHICLE,payload:item})
    }
}


    export const getvehicles = (from,to) =>{
        return async(dispatch)=>{
            dispatch({type:ORDER_LOADER})
                    axios.post(ROOT_URL+"/partner/get/zones", {
                       from:from,
                       to:to,
                    })
                        .then( async(response)  => {
                           let vehicles = response.data.categories
                           let duration = response.data.duration
                           let distance = response.data.distance
                           console.log(vehicles,duration,distance)
                           dispatch({type:GET_VEHICLES,payload:{vehicles,duration,distance}})
                        })
                        .catch(function (error) {
                            console.log(error.response)
                             console.log("error.response.data")
                            // console.log(error.response.data)
                            // console.log(error.response.status)
                            // if(error.response.datastatus === 422){
                            //     alert(error.response.data.message)
                            // }
                            dispatch({type:ORDER_LOADER_OFF})
                        })
                       
        }
    }
    export const getorders = (id) =>{
        return async(dispatch)=>{
            dispatch({type:ORDER_LOADER})
                    axios.post(ROOT_URL+"/partner/get/orders", {
                       id
                    })
                        .then( async(response)  => {
                           let orders = response.data.orders
                         console.log(orders)
                           dispatch({type:GET_ORDERS,payload:orders})
                        })
                        .catch(function (error) {
                            dispatch({type:ORDER_LOADER_OFF})
                        })
                       
        }
    }
    
    export const placeorder = (from,to,quantity,details,distance,category,navigation,recipientname,recipientphone,id) =>{
        return async(dispatch)=>{
            dispatch({type:ORDER_LOADER})
                    axios.post(ROOT_URL+"/partner/save/order", {
                        from,to,quantity,details,distance,category,recipientname,recipientphone,id
                    })
                        .then( async(response)  => {
                            console.log(response.data.url)
                            let url =  response.data.url
                            let orderid = response.data.order
                            // alert(orderid)
                           //alert('Order has been saved.')
                           dispatch({type:SAVE_ORDER,payload:{url,orderid}})
                           //navigation.navigate('BottomTabBar')
                        })
                        .catch(function (error) {
                            console.log(error.response)
                             console.log("error.response.data")
                            // console.log(error.response.data)
                            // console.log(error.response.status)
                            // if(error.response.datastatus === 422){
                            //     alert(error.response.data.message)
                            // }
                            dispatch({type:ORDER_LOADER_OFF})
                        })
                       
        }
    }


    export const cancelorder = (txid,orderid,navigation) =>{
        return async(dispatch)=>{
            dispatch({type:ORDER_LOADER})
                    axios.post(ROOT_URL+"/partner/cancel/order", {
                        orderid,txid
                    })
                        .then( async(response)  => {
                           
                           dispatch({type:CANCEL_ORDER})
                           navigation.navigate('BottomTabBar')
                        })
                        .catch(function (error) {
                            console.log(error.response)
                             console.log("error.response.data")
                            // console.log(error.response.data)
                            // console.log(error.response.status)
                            // if(error.response.datastatus === 422){
                            //     alert(error.response.data.message)
                            // }
                            dispatch({type:ORDER_LOADER_OFF})
                        })
                       
        }
    }

    export const recipientphonechanged = (text) =>{
        return async(dispatch)=>{
            dispatch({type:RECIPIENT_PHONE,payload:text})
                }
    }
    export const recipientnamechanged = (text) =>{
        return async(dispatch)=>{
            dispatch({type:RECIPIENT_NAME,payload:text})
                }
    }
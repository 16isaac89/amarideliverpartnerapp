
import {AppState} from 'react-native';
import {
    SET_PICKUP_ADDRESS,
    ORDER_LOADER,
    SET_DROPOFF_ADDRESS,
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
    TRACKING_ORDER_ID,

 } from '../actions/types';
 
 const INITIAL_STATE = {
  pickaddress:'',
  picklong:'',
  picklat:'',
  dropaddress:'',
  droplong:'',
  droplat:'',
  loader:false,
  description:'',
  quantity:'',
  vehicles:[],
  distance:'',
  duration:'',
  selectedvehicle:'',
  selectedvehicleid:1,
  orders:[],
  paymenturl:'',
  paymentmodal:false,
  recipientphone:'e.g 25678123456',
  recipientname:'',
  payingfor:'',
  orderselect:'',
  orderselectlat:'',
  orderselectlong:'',
 };

 
 export default function(state = INITIAL_STATE, action) {
   switch (action.type) {
    case ORDER_LOADER:
        return{...state,loader:true}
     case SET_PICKUP_ADDRESS:
        return{...state,pickaddress:action.payload.address,picklat:action.payload.lat,picklong:action.payload.long,loader:false}
    case SET_DROPOFF_ADDRESS:
        return{...state,dropaddress:action.payload.address,droplat:action.payload.lat,droplong:action.payload.long,loader:false}
    case PACKAGE_DESCRIPTION_CHANGED:
        return{...state,description:action.payload}
    case PACKAGE_QUANTITY_CHANGED:
        return{...state,quantity:action.payload}
    case ORDER_LOADER_OFF:
        return{...state,loader:false}
    case GET_VEHICLES:
        return{...state,loader:false,vehicles:action.payload.vehicles,duration:action.payload.duration,distance:action.payload.distance}
    case SELECT_VEHICLE:
        return{...state,selectedvehicle:action.payload,selectedvehicleid:action.payload.id}
    case SAVE_ORDER:
        return{...state,loader:false,paymenturl:action.payload.url,paymentmodal:true,payingfor:action.payload.orderid}
    case CLOSE_PAYMENT_MODAL:
        return{...state,paymentmodal:false}
    case GET_ORDERS:
        return{...state,orders:action.payload,loader:false}
    case RECIPIENT_NAME:
        return{...state,recipientname:action.payload}
    case RECIPIENT_PHONE:
        return{...state,recipientphone:action.payload}
    case CANCEL_ORDER:
        return{...state,paymentmodal:false}
    case TRACKING_ORDER_ID:
        return{...state,orderselect:action.payload.order,orderselectlat:action.payload.latitude,orderselectlong:action.payload.longitude,loader:false}
     default:
       return state;
   }
 }
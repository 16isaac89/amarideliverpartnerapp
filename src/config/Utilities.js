export const apikey = "AIzaSyDSGXiLg9kRk_93B-s_2VFkrnqHfULeZtI"


export const commonurl = 'http://192.168.100.187/amaridelivery/public/api/v1';
//export const commonurl = 'https://twende.io/api/v1';
//export const pusherurl = '192.168.100.187/amaridelivery'
//export const pusherurl = 'twende.io'

export const uuid = () =>{
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }
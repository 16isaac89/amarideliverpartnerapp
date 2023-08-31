import React,{Component} from 'react';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import {apikey} from '../../config/Utilities'
import { Text, View, Image,TextInput,PermissionsAndroid,TouchableOpacity,ActivityIndicator} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import { connect } from 'react-redux';
import * as actions from '../../redux/actions';
import Feather from 'react-native-vector-icons/Ionicons';
import { Flow } from 'react-native-animated-spinkit'

const homePlace = {
    description: 'Home',
    geometry: { location: { lat: 48.8152937, lng: 2.4597668 } },
  };
  const workPlace = {
    description: 'Work',
    geometry: { location: { lat: 48.8496818, lng: 2.2940881 } },
  };


class Autocomplete extends Component {

  navigatePick=() =>{
    let set = this.props.route.params.set1
        if(set === 'pickupauto'){
            this.props.navigation.navigate('MapPicker',{set:'pickup'})
        }else if(set === 'dropoffauto'){
            this.props.navigation.navigate('MapPicker',{set:'destination'})
        }    
  }

    componentDidMount = () => {    
        this.getCurrentLocation();    
}
getCurrentLocation = () =>{
  Geolocation.getCurrentPosition(
    (position) => {
      console.log(position);
    },
    (error) => {
      // See error code charts below.
      console.log(error.code, error.message);
    },
    { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
);

}
    render(){
  return (
    <View style={{flex:1, marginLeft:10,marginRight:10,marginTop:5 }}>
    <GooglePlacesAutocomplete
      placeholder={this.props.villagelocation}
      minLength={2} // minimum length of text to search
      autoFocus={false}
      returnKeyType={'search'} // Can be left out for default return key https://facebook.github.io/react-native/docs/textinput.html#returnkeytype
      listViewDisplayed="auto" // true/false/undefined
      listLoaderComponent={()=>	<Flow size={68} color="gold" style={{marginLeft:9}}/>}
      fetchDetails={true}
      renderDescription={row => row.description} // custom description render
      onPress={(data, details = null) => {
        let lat = JSON.stringify(details?.geometry?.location).lat
        let long = JSON.stringify(details?.geometry?.location).lng
        let location = data.description
        let set = this.props.route.params.set1
        let navigation = this.props.navigation
        if(set === 'pickupauto'){
        this.props.setpickuploc(location,lat,long,navigation)
        
        }else if(set === 'dropoffauto'){
      this.props.setdropoffloc(location,lat,long,navigation)
      
        }
      }}
      query={{
        key: apikey,
        language: 'en',
        components:'country:ug'
      }}
      //predefinedPlaces={[homePlace, workPlace]}
      //currentLocation={true}
      //currentLocationLabel='Current location'
      textInputProps={{
        InputComp: TextInput,
        leftIcon: { type: 'font-awesome', name: 'chevron-left' },
        errorStyle: { color: 'red' },
      }}
      containerStyle={{borderWidth: 0, zIndex: 1}}
      inputContainerStyle={{borderWidth: 0, margin: 0}}
      styles={{
        description: {
          fontWeight: 'bold',
        },
        predefinedPlacesDescription: {
          color: '#1faadb',
        },
      }}
      // onChangeText={text => setTextInputValue(text)}
      // value={textInputValue}
      debounce={200}
      renderHeaderComponent={()=><TouchableOpacity onPress={()=>this.navigatePick()} style={{marginLeft:12,alignContent:'center',flexDirection:'row'}}>
      <Feather  name={"map"} size={20} color={"green"}/>
      <Text style={{fontSize:16}}>Use Map</Text></TouchableOpacity>}
      //renderHeaderComponent={<TouchableOpacity><Text>Pick location from map....</Text></TouchableOpacity>}
      listEmptyComponent={() => (
        <View style={{flex: 1}}>
          <Text>No results were found</Text>
        </View>
      )}
    />
    </View>
  );
    }
};
function mapStateToProps( state ) {
  return { 

  };
}

export default connect(mapStateToProps, actions)(Autocomplete);
import React, { Component } from 'react'
import {
    SafeAreaView,
    StatusBar,
    View,
    Text,
    StyleSheet,
    Image,
    Dimensions,
    TouchableOpacity,
    ScrollView,
    TextInput
} from "react-native";
import { Colors, Fonts, Sizes } from "../../constant/styles";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import MapView, { Marker } from "react-native-maps";
import Geolocation from 'react-native-geolocation-service';
import { getDistance } from 'geolib';
import MapViewDirections from 'react-native-maps-directions';
import { Key } from "../../constant/key";
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { Input } from '@rneui/themed';
import { connect } from 'react-redux';
import * as actions from '../../redux/actions';

const { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE = 1.3733;
const LONGITUDE = 32.2903;
const LATITUDE_DELTA = 0.30;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
const SPACE = 0.01;
import { Flow } from 'react-native-animated-spinkit'

class MapPicker extends Component {
    setaddressinfo = () =>{
        let set = this.props.route.params.set
        if(set === 'pickup'){
        return (this.props.loader === true ?<Flow size={68} color="gold" style={{marginLeft:9}}/>:<Text style={{ ...Fonts.blackColor15Medium,alignSelf:'center' }}>{this.props.pickaddress}</Text>)
        }else if(set === 'destination'){
        return this.props.loader === true ?<Flow size={68} color="gold" style={{marginLeft:9}}/>:<Text style={{ ...Fonts.blackColor15Medium,alignSelf:'center' }}>{this.props.dropaddress}</Text>
        } 
       
    }
    constructor(props) {
        super(props);
        this.state = {
            currentmarker:{
                latitude: LATITUDE - SPACE,
                longitude: LONGITUDE - SPACE,
            },
            pickupMarker:{
                latitude: LATITUDE - SPACE,
                longitude: LONGITUDE - SPACE,
            },
            deliveryMarker:{
                latitude: LATITUDE - SPACE,
                longitude: LONGITUDE - SPACE,
            },
        };
      }
    map=() =>{
        return (
            <MapView
                style={{ height: '100%' }}
                loadingEnabled={true}
                region={{
                    latitude: this.state.currentmarker.latitude,
                    longitude: this.state.currentmarker.longitude,
                    latitudeDelta: LATITUDE_DELTA,
                    longitudeDelta: LONGITUDE_DELTA,
                }}
                showsUserLocation={true}
                followsUserLocation={true}
                mapType={'hybrid'}
            >
                <Marker
                    coordinate={this.state.currentmarker}
                    onDragEnd={(e) => {
                        console.log(e.nativeEvent.coordinate)
                        let lat = e.nativeEvent.coordinate.latitude
                        let long = e.nativeEvent.coordinate.longitude
                        let set = this.props.route.params.set
                    
                        if(set === 'pickup'){
                            this.props.setpickupaddress(lat,long)
                        }else if(set === 'destination'){
                            this.props.setdropoffaddress(lat,long)
                        } 
                    }}
                    draggable
                />
            </MapView>
        )
    }
    mapHeader=() =>{
        return (
            <View style={styles.mapHeaderWrapStyle}>
            {this.setaddressinfo()}    
            </View>
        )
    }
   
    locationIcon=() =>{
        return (
            <View style={styles.locationIconWrapStyle}>
                <MaterialIcons name="my-location" size={24} color="black" />
            </View>
        )
    }
    pickThisPlaceButton=()=> {
        return (
            <View style={styles.pickThisPlaceButtonWrapStyle}>
                <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={()=>this.props.navigation.navigate('PackageInfoOne')}
                    style={styles.pickThisPlaceButtonStyle}
                >
                    <Text style={{ ...Fonts.blackColor15Medium }}>Pick This Place</Text>
                </TouchableOpacity>
            </View>
        )
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                                            {this.map()}
                                            {this.mapHeader()}
                                            
                                            {this.locationIcon()}
                                            {this.pickThisPlaceButton()}
    </View>
        )
    }
}

const styles = StyleSheet.create({
    packageTypeHeaderWrapStyle: {
        backgroundColor: Colors.whiteColor,
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: Sizes.fixPadding * 2.0,
        marginVertical: Sizes.fixPadding
    },
    selectPackageTypeInfoWrapStyle: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginHorizontal: Sizes.fixPadding * 2.0,
        marginVertical: Sizes.fixPadding * 2.0
    },
    packageTypeWrapStyle: {
        height: 230.0,
        backgroundColor: '#F8F8F8',
        borderRadius: Sizes.fixPadding * 2.0,
        borderWidth: 1.5,
        alignItems: 'center',
        justifyContent: 'center'
    },
    packageTypeSelectionButtonStyle: {
        position: 'absolute',
        top: 20.0,
        right: 20.0,
        width: 27.0,
        height: 27.0,
        borderRadius: 13.5,
        alignItems: 'center',
        justifyContent: 'center'
    },
    packageTypeContinueButtonStyle: {
        position: 'absolute',
        bottom: 20.0,
        right: 20.0,
        paddingHorizontal: Sizes.fixPadding * 5.0,
        paddingVertical: Sizes.fixPadding - 4.0,
        borderRadius: Sizes.fixPadding * 2.2,
    },
    packageDetailHeaderWrapStyle: {
        backgroundColor: Colors.whiteColor,
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: Sizes.fixPadding * 2.0,
        marginVertical: Sizes.fixPadding
    },
    inputFieldStyle: {
        borderColor: Colors.grayColor,
        borderWidth: 1.0,
        borderRadius: Sizes.fixPadding - 5.0,
        height: 55.0,
        paddingHorizontal: Sizes.fixPadding + 5.0,
        ...Fonts.blackColor17Medium,
        marginVertical: Sizes.fixPadding
    },
    packageDetailCountinueAndBackButtonStyle: {
        flex: 0.47,
        borderWidth: 1.0,
        borderRadius: Sizes.fixPadding * 2.5,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: Sizes.fixPadding - 5.0,
        marginBottom: Sizes.fixPadding
    },
    packageDetailCountinueAndBackButtonWrapStyle: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        position: 'absolute',
        bottom: 0.0,
        left: 0.0,
        right: 0.0,
        alignItems: 'center',
        backgroundColor: Colors.whiteColor,
        marginHorizontal: Sizes.fixPadding * 2.0,
        paddingVertical: Sizes.fixPadding,
    },
    packagePickupHeaderWrapStyle: {
        backgroundColor: Colors.whiteColor,
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: Sizes.fixPadding * 2.0,
        marginVertical: Sizes.fixPadding
    },
    loadGoogleMapButtonStyle: {
        backgroundColor: '#E0E0E0',
        borderRadius: Sizes.fixPadding - 7.0,
        alignSelf: 'center',
        paddingHorizontal: Sizes.fixPadding * 2.0,
        paddingVertical: Sizes.fixPadding,
        elevation: 3.0,
    },
    markerInfoStyle: {
        ...Fonts.grayColor16Medium,
        marginHorizontal: Sizes.fixPadding * 2.0,
        marginTop: Sizes.fixPadding + 10.0,
        marginBottom: Sizes.fixPadding
    },
    inputTypeStyle: {
        borderColor: Colors.grayColor,
        borderWidth: 1.0,

        paddingHorizontal: Sizes.fixPadding,
        ...Fonts.blackColor17Medium,
        borderRadius: Sizes.fixPadding - 4.0,
        marginVertical: Sizes.fixPadding + 5.0,
        backgroundColor: Colors.whiteColor,
    },
    pickupInfoCountinueAndBackButtonWrapStyle: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        position: 'absolute',
        bottom: 0.0,
        left: 0.0,
        right: 0.0,
        alignItems: 'center',
        backgroundColor: Colors.whiteColor,
        marginHorizontal: Sizes.fixPadding * 2.0,
        paddingVertical: Sizes.fixPadding,
    },
    pickupInfoCountinueAndBackButtonStyle: {
        flex: 0.47,
        borderWidth: 1.0,
        borderRadius: Sizes.fixPadding * 2.5,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: Sizes.fixPadding - 5.0,
        marginBottom: Sizes.fixPadding
    },
    countinueAndBackButtonWrapStyle: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        position: 'absolute',
        bottom: 0.0,
        left: 0.0,
        right: 0.0,
        alignItems: 'center',
        backgroundColor: Colors.whiteColor,
        paddingHorizontal: Sizes.fixPadding * 2.0,
        paddingVertical: Sizes.fixPadding,
    },
    countinueAndBackButtonStyle: {
        flex: 0.47,
        borderWidth: 1.0,
        borderRadius: Sizes.fixPadding * 2.5,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: Sizes.fixPadding - 5.0,
        marginBottom: Sizes.fixPadding
    },
    headerWrapStyle: {
        backgroundColor: Colors.whiteColor,
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: Sizes.fixPadding * 2.0,
        marginVertical: Sizes.fixPadding
    },
    packageDeliveryHeaderWrapStyle: {
        backgroundColor: Colors.whiteColor,
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: Sizes.fixPadding * 2.0,
        marginVertical: Sizes.fixPadding
    },
    mapHeaderWrapStyle: {
        position: 'absolute',
        left: 20.0,
        right: 20.0,
        top: StatusBar.currentHeight + 2.0,
        alignContent:'center',
        backgroundColor:'white',
        height:50,
        justifyContent:'center',
        borderRadius:20
    },
    changeMapWrapStyle: {
        position: 'absolute',
        right: 20.0,
        top: StatusBar.currentHeight + 70.0,
        backgroundColor: Colors.whiteColor,
        width: 40.0,
        height: 40.0,
        borderRadius: 20.0,
        alignItems: 'center',
        justifyContent: 'center'
    },
    locationIconWrapStyle: {
        position: 'absolute',
        right: 20.0,
        top: StatusBar.currentHeight + 120.0,
        backgroundColor: Colors.whiteColor,
        width: 40.0,
        height: 40.0,
        borderRadius: 20.0,
        alignItems: 'center',
        justifyContent: 'center'
    },
    pickThisPlaceButtonWrapStyle: {
        position: 'absolute',
        bottom: 0.0,
        backgroundColor: Colors.whiteColor,
        borderRadius: Sizes.fixPadding,
        height: 60.0,
        left: 0.0,
        right: 0.0,
        alignItems: 'center',
        justifyContent: 'center',
    },
    pickThisPlaceButtonStyle: {
        backgroundColor: '#E0E0E0',
        width: '100%',
        height: 45.0,
        alignItems: 'center',
        justifyContent: 'center'
    },
    packageSizeAndWeightInfoWrapStyle: {
        flexDirection: 'row',
        marginHorizontal: Sizes.fixPadding * 2.0,
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    packageSizeAndWeightInfoStyle: {
        width: '50%',
        height: 70.0,
        justifyContent: 'space-between',
        paddingVertical: Sizes.fixPadding - 5.0,
    },
    rootInfoWrapStyle: {
        flexDirection: 'row',
        marginHorizontal: Sizes.fixPadding * 2.0,
        justifyContent: 'space-between',
        alignItems: 'center'
    }
})


function mapStateToProps( state ) {
    return { 
        pickaddress:state.order.pickaddress || 'Long press the marker and Drag and drop it to desired pickup',
        dropaddress:state.order.dropaddress || 'Long press the marker and Drag and drop it to desired Dropoff',
        loader:state.order.loader
    };
  }
  
  export default connect(mapStateToProps, actions)(MapPicker);
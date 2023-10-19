import React,{Component} from "react";
import { SafeAreaView, StatusBar, View, Text, StyleSheet, Dimensions, Image,TouchableOpacity,Linking } from "react-native";
import { Colors, Fonts, Sizes } from "../../constant/styles";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import MapView, { Marker } from "react-native-maps";
import MapViewDirections from 'react-native-maps-directions';
import { apikey } from "../../config/Utilities";
import { connect } from 'react-redux';
import * as actions from '../../redux/actions';

const { width } = Dimensions.get('screen');
const pickupMarker = {
    latitude: 37.78825,
    longitude: -122.4324,
};

const deliveryMarker = {
    latitude: 37.77825,
    longitude: -122.4424,
};
class TrackOrderScreen extends Component {
// componentDidMount(){
//     console.log(this.props.orderselect.driver.media)
// }
    
render(){
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
            <StatusBar backgroundColor={Colors.primaryColor} />
            <View style={{ flex: 1 }}>
                {this.header()}
                {this.mapInfo()}
                {this.deliveryInfo()}
                {this.divider()}
                {this.onTheWayInfo()}
                {this.divider()}
                {this.deliveryBoyInfo()}
                {this.divider()}
                {this.itemsAndAmountDetails()}
            </View>
        </SafeAreaView>
    )
    }
    itemsAndAmountDetails=()=> {
        return (
            <View style={styles.itemsAndAmountDetailWrapStyle}>
                <View>
                    <Text style={{ ...Fonts.blackColor18Medium }}>
                       {this.props.orderselect.quantity} items - UGX{this.props.orderselect.money}
                    </Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Text style={{
                            ...Fonts.blueColor16Regular,
                            marginRight: Sizes.fixPadding - 5.0
                        }}>
                            OTP: {this.props.orderselect.del_otp}
                        </Text>
                        <MaterialIcons name="arrow-forward-ios" size={12} color={Colors.grayColor} />
                    </View>
                </View>

                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                }}>
                    <Text style={{ ...Fonts.grayColor16Medium }}>
                        Paid successfully
                    </Text>
                    <View style={styles.successIconWrapStyle}>
                        <MaterialIcons name="done" size={20} color={Colors.purpleColor} />
                    </View>
                </View>
            </View>
        )
    }

   deliveryBoyInfo=()=> {
    if(this.props.orderselect.driver){
        return (
            <View style={styles.deliveryBoyInfoWrapStyle}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Image
                        source={require('../../assets/images/delivery_boy.jpg')}
                        style={{
                            height: 55.0,
                            width: 55.0,
                            borderRadius: 27.5,
                        }}
                        resizeMode="cover"
                    />
                    <Text style={{ ...Fonts.blackColor20Medium, marginLeft: Sizes.fixPadding }}>
                        {this.props.orderselect.driver.fullname}
                    </Text>
                </View>

                <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }} onPress={() => Linking.openURL(`tel:${this.props.orderselect.driver?.phone_1}`)}>
                    {/* <MaterialIcons name="chat-bubble-outline" size={28} color={Colors.grayColor} /> */}
                    <MaterialIcons
                        name="phone"
                        size={28}
                        color={Colors.grayColor}
                        style={{ marginLeft: Sizes.fixPadding * 2. }}
                    />
                </TouchableOpacity>
            </View>
        )
                    }
    }

   onTheWayInfo=()=> {
        return (
            <View style={styles.onTheWayInfoWrapStyle}>

                <View style={{ flexDirection: 'row', }}>
                    <View style={{ alignItems: 'center', marginBottom: Sizes.fixPadding - 5.0 }}>
                        <View style={{
                            height: 35.0,
                            backgroundColor: Colors.primaryColor,
                            width: 2.0,
                        }}>
                        </View>
                        <View style={styles.orderInProgressIconOuterWrapStyle}>
                            <View style={styles.orderInProgressIconInnerWrapStyle}>
                                <View style={styles.orderInProgressIconStyle}>
                                </View>
                            </View>
                        </View>
                        <View style={{
                            borderStyle: 'dashed',
                            borderWidth: 1,
                            height: 50.0,
                            borderColor: Colors.primaryColor,
                        }}>
                        </View>
                    </View>
                    <View style={{
                        width: width / 1.5,
                        alignSelf: 'center',
                        marginLeft: Sizes.fixPadding
                    }}>
                        <Text style={{ ...Fonts.blackColor18Medium }}>
                            STATUS
                        </Text>
                        <Text style={{ ...Fonts.grayColor16Medium, lineHeight: 20.0, }}>
                            {this.props.orderselect.status}
                        </Text>
                        <Text style={{ ...Fonts.grayColor16Medium, lineHeight: 20.0, }}>
                            {this.props.orderselect.details}
                        </Text>
                    </View>
                </View>

                <MaterialIcons name="keyboard-arrow-down" size={24} color={Colors.grayColor} />

            </View>
        )
    }

    divider=() =>{
        return (
            <View style={{
                backgroundColor: Colors.grayColor,
                height: 0.70,
            }}>
            </View>
        )
    }

   deliveryInfo=()=> {
        return (
            <View style={styles.deliveryInfoWrapStyle}>
                <MaterialIcons name="access-time" size={24} color={Colors.grayColor} />
                <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: Sizes.fixPadding }}>
                    <Text style={{ ...Fonts.grayColor18Medium }}>
                        Delivery by {` `}
                    </Text>
                    <Text style={{ ...Fonts.blackColor19Medium }}>
                       {this.props.orderselect.created_at.substring(0, 10)}
                    </Text>
                </View>
            </View>
        )
    }

    mapInfo=()=> {
        return (
            <View style={{
                flex: 1,
                backgroundColor: Colors.grayColor,
            }}
            >
                <MapView
                    style={{
                        flex: 1,
                    }}
                    initialRegion={{
                        latitude: this.props.maplat,
                        longitude: this.props.maplong,
                        latitudeDelta: 0.05,
                        longitudeDelta: 0.05,
                    }}
                    mapType="terrain"
                    showsMyLocationButton={true}
                    loadingEnabled={true}
                    showsUserLocation={true}
                >
                    <MapViewDirections
                        origin={this.props.orderselect.from}
                        destination={this.props.orderselect.to}
                        apikey={apikey}
                        lineDashPattern={[1]}
                        lineCap="square"
                        strokeColor="#000"
                        strokeWidth={3}
                    />
                    {/* <Marker coordinate={pickupMarker}>
                        <Image
                            source={require('../../assets/images/pickup-marker.png')}
                            style={{ width: 30.0, height: 30.0 }}
                        />
                    </Marker> */}
                    {/* <Marker coordinate={deliveryMarker}>
                        <Image
                            source={require('../../assets/images/delivery_marker.png')}
                            style={{ width: 30.0, height: 30.0 }}
                        />
                    </Marker> */}
                </MapView >
            </View>
        )
    }

  header=() =>{
        return (
            <View style={styles.headerWrapStyle}>
                <MaterialIcons name="arrow-back" size={24} color="black"
                    onPress={() => this.props.navigation.goBack()}
                />
                <View style={{ marginLeft: Sizes.fixPadding * 2.0 }}>
                    <Text style={{ ...Fonts.blackColor19Medium }}>
                        Track order
                    </Text>
                    <Text style={{ ...Fonts.grayColor16Medium }}>
                        Package Send
                    </Text>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    headerWrapStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.whiteColor,
        elevation: 3.0,
        height: 60.0,
        paddingHorizontal: Sizes.fixPadding * 2.0,
    },
    deliveryInfoWrapStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: Sizes.fixPadding + 5.0,
        marginHorizontal: Sizes.fixPadding * 2.0,
    },
    orderInProgressIconOuterWrapStyle: {
        width: 34.0,
        height: 34.0,
        borderRadius: 17.0,
        backgroundColor: '#EADAC8',
        alignItems: 'center',
        justifyContent: 'center',
    },
    orderInProgressIconInnerWrapStyle: {
        height: 23.0,
        width: 23.0,
        borderRadius: 11.5,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.primaryColor,
    },
    orderInProgressIconStyle: {
        width: 12.0,
        height: 12.0,
        borderRadius: 6.0,
        backgroundColor: Colors.whiteColor,
    },
    onTheWayInfoWrapStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginHorizontal: Sizes.fixPadding * 2.0
    },
    itemsAndAmountDetailWrapStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        margin: Sizes.fixPadding * 2.0,
    },
    successIconWrapStyle: {
        width: 35.0,
        height: 35.0,
        borderRadius: 17.5,
        backgroundColor: '#E7DFF3',
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: Sizes.fixPadding
    },
    deliveryBoyInfoWrapStyle: {
        flexDirection: 'row',
        margin: Sizes.fixPadding * 2.0,
        alignItems: "center",
        justifyContent: 'space-between'
    }

})

function mapStateToProps( state ) {
    return { 
    user:state.auth.user,
    loader:state.order.loader,
    orderselect:state.order.orderselect,
    maplat:state.order.orderselectlat|| 1.3733,
    maplong:state.order.orderselectlong|| 32.2903,
    };
  }
  
export default connect(mapStateToProps, actions)(TrackOrderScreen);
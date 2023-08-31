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
import { connect } from 'react-redux';
import * as actions from '../../redux/actions';

const { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE = 37.78825;
const LONGITUDE = -122.4324;
const LATITUDE_DELTA = 0.30;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
const SPACE = 0.01;

class PackageInfoTwo extends Component {

    packageTypeContinueButton=() =>{
        return (
            <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => {
                    this.props.navigation.navigate('PackageInfoThree')
                }
                }
                style={{
                    backgroundColor: this.props.quantity !== ''&&this.props.description !== '' ? Colors.primaryColor : Colors.grayColor,
                    ...styles.packageTypeContinueButtonStyle,
                }}
                >
                <Text style={{ ...Fonts.whiteColor22Regular }}>
                    Continue
                </Text>
            </TouchableOpacity>
        )
    }
   
    render() {
        return (
            <View style={{ flex: 1 }}>
            <View
            style={{
                marginHorizontal: Sizes.fixPadding * 2.0,
                marginTop: Sizes.fixPadding + 10.0,
            }}>
                <Text style={{ ...Fonts.primaryColor19Medium }}>
                    Quantity
                </Text>
                <TextInput
                    placeholder={this.props.quantity}
                    placeholderTextColor={Colors.blackColor}
                    style={styles.inputFieldStyle}
                    keyboardType="numeric"
                    value={this.props.quantity}
                    selectionColor={Colors.primaryColor}
                    onChangeText={(text)=>{this.props.quantitychanged(text)}}
                />
                {/* <Text style={{ ...Fonts.blackColor15Medium }}>
                    Enter width in cm
                </Text> */}
            </View>
            <View
            style={{
                marginHorizontal: Sizes.fixPadding * 2.0,
                marginTop: Sizes.fixPadding + 10.0,
            }}>
                <Text style={{ ...Fonts.primaryColor19Medium }}>
                    Description
                </Text>
                <TextInput
                    placeholder={this.props.description}
                    placeholderTextColor={Colors.blackColor}
                
                    value={this.props.description}
                    selectionColor={Colors.primaryColor}
                    onChangeText={(text)=>{this.props.descriptionchanged(text)}}
                    numberOfLines={4}
                    multiline={true}
                    style={{ borderWidth:1,borderRadius:8 }}
                />
                {/* <Text style={{ ...Fonts.blackColor15Medium }}>
                    Enter width in cm
                </Text> */}
            </View>
            <View
            style={{
                marginHorizontal: Sizes.fixPadding * 2.0,
                marginTop: Sizes.fixPadding + 10.0,
            }}>
                <Text style={{ ...Fonts.primaryColor19Medium }}>
                    Recipient(Receiver) Phone
                </Text>
                <TextInput
                    placeholder={this.props.recipientphone}
                    placeholderTextColor={Colors.blackColor}
                    style={styles.inputFieldStyle}
                    keyboardType="numeric"
                    value={this.props.recipientphone}
                    selectionColor={Colors.primaryColor}
                    onChangeText={(text)=>{this.props.recipientphonechanged(text)}}
                />
                {/* <Text style={{ ...Fonts.blackColor15Medium }}>
                    Enter width in cm
                </Text> */}
            </View>
            <View
            style={{
                marginHorizontal: Sizes.fixPadding * 2.0,
                marginTop: Sizes.fixPadding + 10.0,
            }}>
                <Text style={{ ...Fonts.primaryColor19Medium }}>
                Recipient(Receiver) Name
                </Text>
                <TextInput
                    placeholder={this.props.recipientname}
                    placeholderTextColor={Colors.blackColor}
                    style={styles.inputFieldStyle}
                
                    value={this.props.recipientname}
                    selectionColor={Colors.primaryColor}
                    onChangeText={(text)=>{this.props.recipientnamechanged(text)}}
                />
                {/* <Text style={{ ...Fonts.blackColor15Medium }}>
                    Enter width in cm
                </Text> */}
            </View>
            {this.packageTypeContinueButton()}
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
        flexDirection: 'row',
        position: 'absolute',
        left: 20.0,
        right: 20.0,
        top: StatusBar.currentHeight + 10.0,
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
        description:state.order.description,
        quantity:state.order.quantity,
        recipientphone:state.order.recipientphone,
        recipientname:state.order.recipientname
    };
  }
  
export default connect(mapStateToProps, actions)(PackageInfoTwo);

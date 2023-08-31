import React, { useState, useEffect } from "react";
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

const { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE = 37.78825;
const LONGITUDE = -122.4324;
const LATITUDE_DELTA = 0.30;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
const SPACE = 0.01;

const PackageInfoScreen = ({ navigation }) => {

    const [currentIndex, setCurrentIndex] = useState(null);
    const [packageTypeInfo, setPackageTypeInfo] = useState(true);
    const [packageDetailInfo, setPackageDetailInfo] = useState(false);
    const [packagePickupInfo, setpackagePickupInfo] = useState(false);
    const [packageDeliveryInfo, setPackageDeliveryInfo] = useState(false);
    const [confirmDetail, setConfirmDetail] = useState(false);
    const [loadMap, setLoadMap] = useState(false);
    const [packageHeight, setPackageHeight] = useState('');
    const [packageWidth, setPackageWidth] = useState('');
    const [packageDepth, setPackageDepth] = useState('');
    const [packageWeight, setPackageWeight] = useState('');
    const [pickUpAddress, setPickupAddress] = useState('');
    const [deliveryAddress, setDeliveryAddress] = useState('');
    const [addressType, setAddressType] = useState('pickup');
    const [exactPickupAddress, setExactPickupAddress] = useState('');
    const [exactDeliveryAddress, setExactDeliveryAddress] = useState('');

    const [currentmarker, setCurrentMarker] = useState({
        latitude: LATITUDE - SPACE,
        longitude: LONGITUDE - SPACE,
    });

    const [pickupMarker, setPickupMarker] = useState({
        latitude: LATITUDE - SPACE,
        longitude: LONGITUDE - SPACE,
    });

    const [deliveryMarker, setDeliveryMarker] = useState({
        latitude: LATITUDE - SPACE,
        longitude: LONGITUDE - SPACE,
    });

    const [searchQuery, setSearchQuery] = useState('');
    const [currentAddress, setCurrentAddress] = useState(getAddress());
    const [isDark, setIsDark] = useState(false);
    const mode = 'driving';

    useEffect(() => {
        (async () => {
            if (Platform.OS === 'ios') {
                const auth = await Geolocation.requestAuthorization("whenInUse");
                if(auth === "granted") {
                  alert('hg')
                   // do something if granted...
                }
              }
            
              if (Platform.OS === 'android') {
                 await PermissionsAndroid.request(
                  PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
                  {
                    title: 'Amari Hitch Permissions',
                    message:
                      'Amari Hitch would like to ' +
                      'access your external storage.',
                    buttonNeutral: 'Ask Me Later',
                    buttonNegative: 'Cancel',
                    buttonPositive: 'OK',
                  },
                );
                await PermissionsAndroid.request(
                  PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                );
                if ("granted" === PermissionsAndroid.RESULTS.GRANTED) {
                    Geolocation.getCurrentPosition(
                        (location) => {
                            console.log(location)
                            const userLocation = {
                                latitude: location.coords.latitude,
                                longitude: location.coords.longitude,
                            }
                            setCurrentMarker(userLocation);
                           
                                        
                                    },
                        (error) => {
                          // See error code charts below.
                          console.log(error.code, error.message);
                        },
                        { enableHighAccuracy: true,
                            timeout: 5000,
                            maximumAge: 10000
                         }
                    );
                    
                }
              }



            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                alert('Permission to access location was denied');
                return;
            }
            const location = await Location.getCurrentPositionAsync();
            
        })();
    }, []);

    useEffect(() => {
        (async () => {
            getAddress()
        })();
    }, [currentmarker])

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
            <StatusBar translucent={loadMap ? true : false} backgroundColor={loadMap ? 'transparent' : Colors.primaryColor} />

            {
                loadMap == false
                    ?
                    header()
                    :
                    null
            }

            {
                packageTypeInfo ?
                    <View style={{ flex: 1 }}>
                        {selectPackageTypeInfo()}
                        {packageTypeContinueButton()}
                    </View>
                    :
                    packageDetailInfo ?
                        <View style={{ flex: 1 }}>
                            <ScrollView
                                showsVerticalScrollIndicator={false}
                                contentContainerStyle={{ paddingBottom: Sizes.fixPadding * 9.0 }}
                            >
                                {packagePickupLocation()}
                                {packageDropLocation()}
                                {packageDepthInfo()}
                                {packageWeightInfo()}
                            </ScrollView>
                        </View>
                        :
                        packagePickupInfo ?
                            <View style={{ flex: 1, justifyContent: 'center' }}>
                                <ScrollView
                                    contentContainerStyle={{
                                        flexGrow: 1,
                                        justifyContent: 'center',
                                        paddingBottom: Sizes.fixPadding * 10.0,
                                    }}
                                >
                                    {loadGoogleMapButton({ type: 'pickup' })}
                                    {markerInfo()}
                                    {address({ type: 'pickup' })}
                                    {addressInfo()}
                                </ScrollView>
                            </View>
                            :
                            packageDeliveryInfo ?
                                <View style={{ flex: 1 }}>
                                    <ScrollView
                                        contentContainerStyle={{
                                            flexGrow: 1,
                                            justifyContent: 'center',
                                            paddingBottom: Sizes.fixPadding * 10.0,
                                        }}
                                    >
                                        {loadGoogleMapButton({ type: 'delivery' })}
                                        {markerInfo()}
                                        {address({ type: 'delivery' })}
                                        {addressInfo()}
                                    </ScrollView>
                                </View>
                                :
                                confirmDetail ?
                                    <View style={{ flex: 1 }}>
                                        {showRoot()}
                                        {rootInfo()}
                                        {divider()}
                                        {packageSizeAndWeightInfo()}
                                        {distanceAndPriceInfo()}
                                    </View>
                                    :
                                    loadMap ?
                                        <View style={{ flex: 1 }}>
                                            {map()}
                                            {mapHeader()}
                                            {changeMap()}
                                            {locationIcon()}
                                            {pickThisPlaceButton()}
                                        </View>
                                        : null
            }

            {
                packageTypeInfo == '' && loadMap == false ?
                    continueAndBackButton() : null
            }

        </SafeAreaView>
    );

    function distanceAndPriceInfo() {
        var distance = getDistance(
            pickupMarker,
            deliveryMarker,
        );
        var distanceInKm = distance / 1000;
        return (
            <View
                style={{
                    backgroundColor: '#F4EFE8',
                    alignItems: 'center',
                    justifyContent: 'center',
                    paddingVertical: Sizes.fixPadding
                }}
            >
                <Text style={{ ...Fonts.primaryColor19Medium }}>
                    Distance:{distanceInKm} km
                </Text>
                <Text style={{ ...Fonts.primaryColor19Medium }}>
                    Price: $15
                </Text>
            </View>
        )
    }

    function packageSizeAndWeightInfo() {
        return (
            <View style={styles.packageSizeAndWeightInfoWrapStyle}>
                <View style={styles.packageSizeAndWeightInfoStyle}>
                    <Text style={{ ...Fonts.blackColor19Medium }}>
                        Size
                    </Text>
                    <Text style={{ ...Fonts.blackColor16Medium }}>
                        {
                            `${packageHeight} * ${packageWidth} * ${packageDepth}`
                        }
                    </Text>
                </View>
                <View style={styles.packageSizeAndWeightInfoStyle}>
                    <Text style={{ ...Fonts.blackColor19Medium }}>
                        Weight
                    </Text>
                    <Text style={{ ...Fonts.blackColor16Medium }}>
                        {packageWeight}
                    </Text>
                </View>
            </View>
        )
    }

    function divider() {
        return (
            <View style={{
                backgroundColor: Colors.grayColor,
                height: 1.0,
                width: '100%'
            }}>
            </View>
        )
    }

    function rootInfo() {
        return (
            <View style={styles.rootInfoWrapStyle}>
                <View style={{ width: '50%', height: 85.0 }}>
                    <Text style={{ ...Fonts.blackColor19Medium }}>
                        Pickup
                    </Text>
                    <Text numberOfLines={2} style={{ ...Fonts.blackColor16Medium }}>
                        {exactPickupAddress}
                    </Text>
                </View>
                <View style={{ width: '50%', height: 85.0 }}>
                    <Text style={{ ...Fonts.blackColor19Medium }}>
                        Delivery
                    </Text>
                    <Text numberOfLines={2} style={{ ...Fonts.blackColor16Medium }}>
                        {exactDeliveryAddress}
                    </Text>
                </View>
            </View>
        )
    }

    function address({ type }) {
        return (
            type == 'pickup'
                ?
                pickUpAddress != ''
                    ?
                    <Text
                        numberOfLines={2}
                        style={{
                            ...Fonts.blackColor16Regular,
                            marginHorizontal: Sizes.fixPadding * 2.0,
                            textAlign: 'center'
                        }}>
                        {pickUpAddress}
                    </Text>
                    :
                    null
                :
                deliveryAddress != ''
                    ?
                    <Text
                        numberOfLines={2}
                        style={{
                            ...Fonts.blackColor16Regular,
                            marginHorizontal: Sizes.fixPadding * 2.0,
                            textAlign: 'center'
                        }}>
                        {deliveryAddress}
                    </Text>
                    :
                    null
        )
    }

    function showRoot() {
        return (
            <MapView
                style={{ flex: 0.82 }}
                region={{
                    latitude: currentmarker.latitude,
                    longitude: currentmarker.longitude,
                    latitudeDelta: LATITUDE_DELTA,
                    longitudeDelta: LONGITUDE_DELTA,
                }}
                mapType="terrain"
            >
                <MapViewDirections
                    origin={pickupMarker}
                    destination={deliveryMarker}
                    apikey={Key.apiKey}
                    lineDashPattern={[1]}
                    lineCap="square"
                    strokeColor="#000"
                    strokeWidth={3}
                />
                <Marker coordinate={pickupMarker}>
                    <Image
                        source={require('../../assets/images/pickup-marker.png')}
                        style={{ width: 30.0, height: 30.0 }}
                    />
                </Marker>
                <Marker coordinate={deliveryMarker}>
                    <Image
                        source={require('../../assets/images/delivery_marker.png')}
                        style={{ width: 30.0, height: 30.0 }}
                    />
                </Marker>
            </MapView >
        )
    }

    function map() {
        return (
            <MapView
                style={{ height: '100%' }}
                region={{
                    latitude: currentmarker.latitude,
                    longitude: currentmarker.longitude,
                    latitudeDelta: LATITUDE_DELTA,
                    longitudeDelta: LONGITUDE_DELTA,
                }}
                showsUserLocation={true}
                followsUserLocation={true}
                mapType={isDark ? 'hybrid' : 'standard'}
            >
                <Marker
                    coordinate={currentmarker}
                    onDragEnd={(e) => {
                        setCurrentMarker(e.nativeEvent.coordinate)
                        addressType == 'pickup' ?
                            setPickupMarker(e.nativeEvent.coordinate) :
                            setDeliveryMarker(e.nativeEvent.coordinate);
                        getAddress()
                    }}
                    draggable
                />
            </MapView>
        )
    }

    function continueAndBackButton() {
        return (
            <View style={styles.countinueAndBackButtonWrapStyle}>
                <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={() => {
                        if (packageDetailInfo) {
                            setPackageDetailInfo(false)
                            setPackageTypeInfo(true)
                        }

                        if (packagePickupInfo) {
                            setpackagePickupInfo(false)
                            setPackageDetailInfo(true)
                        }

                        if (packageDeliveryInfo) {
                            setPackageDeliveryInfo(false)
                            setpackagePickupInfo(true)
                        }

                        if (confirmDetail) {
                            setConfirmDetail(false)
                            setPackageDeliveryInfo(true)
                        }
                    }}
                    style={{
                        backgroundColor: Colors.whiteColor,
                        borderColor: Colors.blackColor,
                        ...styles.countinueAndBackButtonStyle
                    }}>
                    <Text style={{ ...Fonts.blackColor22Regular }}>
                        Back
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={() => {
                        if (packageDetailInfo) {
                            if (packageHeight != '' && packageWidth != '' &&
                                packageDepth != '' && packageWeight != '') {
                                setPackageDetailInfo(false)
                                setpackagePickupInfo(true)
                            }
                        }

                        if (packagePickupInfo) {
                            if (pickUpAddress != '' && exactPickupAddress != '') {
                                setpackagePickupInfo(false)
                                setPackageDeliveryInfo(true)
                            }
                        }

                        if (packageDeliveryInfo) {
                            if (deliveryAddress != '' && exactDeliveryAddress != '') {
                                setPackageDeliveryInfo(false)
                                setConfirmDetail(true)
                            }
                        }

                        if (confirmDetail) {
                            navigation.push('Payment')
                        }
                    }}
                    style={{
                        backgroundColor:
                            packageDetailInfo ?
                                packageHeight != '' && packageWidth != '' &&
                                    packageDepth != '' && packageWeight != ''
                                    ?
                                    Colors.primaryColor
                                    :
                                    Colors.grayColor
                                :
                                packagePickupInfo ?
                                    pickUpAddress != '' && exactPickupAddress != ''
                                        ?
                                        Colors.primaryColor
                                        :
                                        Colors.grayColor
                                    :
                                    packageDeliveryInfo ?
                                        deliveryAddress != '' && exactDeliveryAddress != ''
                                            ?
                                            Colors.primaryColor
                                            :
                                            Colors.grayColor
                                        : confirmDetail ?
                                            Colors.primaryColor
                                            : null
                        ,
                        borderColor:
                            packageDetailInfo ?
                                packageHeight != '' && packageWidth != '' &&
                                    packageDepth != '' && packageWeight != ''
                                    ?
                                    Colors.primaryColor
                                    :
                                    Colors.grayColor
                                :
                                packagePickupInfo ?
                                    pickUpAddress != '' && exactPickupAddress != ''
                                        ?
                                        Colors.primaryColor
                                        :
                                        Colors.grayColor
                                    :
                                    packageDeliveryInfo ?
                                        deliveryAddress != '' && exactDeliveryAddress != ''
                                            ?
                                            Colors.primaryColor
                                            :
                                            Colors.grayColor :
                                        confirmDetail ?
                                            Colors.primaryColor
                                            : null
                        ,
                        ...styles.countinueAndBackButtonStyle
                    }}>
                    <Text style={{ ...Fonts.whiteColor22Regular }}>
                        Continue
                    </Text>
                </TouchableOpacity>
            </View >
        )
    }

    function header() {
        return (
            <View style={styles.headerWrapStyle}>
                <MaterialIcons name="arrow-back-ios" size={23} color="black"
                    onPress={() => {
                        navigation.pop();
                    }}
                />
                <Text style={{
                    marginLeft: Sizes.fixPadding,
                    ...Fonts.blackColor19Medium,
                }}>
                    {
                        packageTypeInfo ?
                            'Select Package Type' :
                            packageDetailInfo ?
                                'SET PICKUP & DROP OFF LOCATIONS' :
                                packagePickupInfo ?
                                    'Select Pickup Address' :
                                    packageDeliveryInfo ?
                                        'Select Delivery Address' :
                                        confirmDetail ?
                                            'Confirm Detail' :
                                            null
                    }
                </Text>
            </View>
        )
    }

    function selectPackageTypeInfo() {
        return (
            <View style={styles.selectPackageTypeInfoWrapStyle}>
                {packegeType({
                    image: require('../../assets/images/icons/document_type.png'),
                    type: 'Document',
                    index: 1,
                })}
                {packegeType({
                    image: require('../../assets/images/icons/parcel_type.png'),
                    type: 'Parcel',
                    index: 2,
                })}
            </View>
        )
    }

    function packegeType({ image, type, index }) {
        return (
            <TouchableOpacity
                style={{ flex: 0.47, }}
                activeOpacity={0.9}
                onPress={() => setCurrentIndex(index)}
            >
                <View style={{
                    borderColor: currentIndex == index ? Colors.primaryColor : '#E6E6E6',
                    ...styles.packageTypeWrapStyle,
                }}>
                    <Image
                        source={image}
                        resizeMode="cover"
                    />
                    <View style={{
                        backgroundColor: currentIndex == index ? Colors.primaryColor : Colors.grayColor,
                        borderColor: currentIndex == index ? Colors.primaryColor : Colors.grayColor,
                        ...styles.packageTypeSelectionButtonStyle
                    }}>
                        {
                            currentIndex == index
                                ?
                                <MaterialIcons name="done" size={20} color={Colors.whiteColor} />
                                : null
                        }
                    </View>
                </View>
                <Text style={{
                    alignSelf: 'center',
                    ...Fonts.blackColor22Regular,
                    marginTop: Sizes.fixPadding - 5.0
                }}>
                    {type}
                </Text>
            </TouchableOpacity>
        )
    }

    function packageTypeContinueButton() {
        return (
            <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => {
                    if (currentIndex != null) {
                        setPackageTypeInfo(false);
                        setPackageDetailInfo(true);
                    }
                }
                }
                style={{
                    backgroundColor: currentIndex != null ? Colors.primaryColor : Colors.grayColor,
                    ...styles.packageTypeContinueButtonStyle,
                }}
                >
                <Text style={{ ...Fonts.whiteColor22Regular }}>
                    Continue
                </Text>
            </TouchableOpacity>
        )
    }

    function packageWeightInfo() {
        return (
            <View style={{
                marginHorizontal: Sizes.fixPadding * 2.0,
                marginTop: Sizes.fixPadding + 10.0,
            }}>
                <Text style={{ ...Fonts.primaryColor19Medium }}>
                    Weight
                </Text>
                <TextInput
                    placeholder='Pleace Enter Package Weight in kg'
                    placeholderTextColor={Colors.blackColor}
                    style={styles.inputFieldStyle}
                    keyboardType="numeric"
                    value={packageWeight}
                    selectionColor={Colors.primaryColor}
                    onChangeText={(value) => setPackageWeight(value)}
                />
                <Text style={{ ...Fonts.blackColor15Medium }}>
                    Enter weight in kg
                </Text>
            </View>
        )
    }

    function packageDepthInfo() {
        return (
            <View style={{
                marginHorizontal: Sizes.fixPadding * 2.0,
                marginTop: Sizes.fixPadding + 10.0,
            }}>
                <Text style={{ ...Fonts.primaryColor19Medium }}>
                    Depth
                </Text>
                <TextInput
                    placeholder='Pleace Enter Package Depth in cm'
                    placeholderTextColor={Colors.blackColor}
                    style={styles.inputFieldStyle}
                    keyboardType="numeric"
                    value={packageDepth}
                    selectionColor={Colors.primaryColor}
                    onChangeText={(value) => setPackageDepth(value)}
                />
                <Text style={{ ...Fonts.blackColor15Medium }}>
                    Enter depth in cm
                </Text>
            </View>
        )
    }

    function packageDropLocation() {
        return (
            <View style={{
                marginHorizontal: Sizes.fixPadding * 2.0,
                marginTop: Sizes.fixPadding + 10.0,
            }}>
                <Text style={{ ...Fonts.primaryColor19Medium }}>
                    Drop Off Location
                </Text>
                <TextInput
                    placeholder='Pleace Enter Package Width in cm'
                    placeholderTextColor={Colors.blackColor}
                    style={styles.inputFieldStyle}
                    keyboardType="numeric"
                    value={packageWidth}
                    selectionColor={Colors.primaryColor}
                    onChangeText={(value) => setPackageWidth(value)}
                />
                <Text style={{ ...Fonts.blackColor15Medium }}>
                    Enter width in cm
                </Text>
            </View>
        )
    }

    function packagePickupLocation() {
        return (
            <View style={{
                marginHorizontal: Sizes.fixPadding * 2.0,
                marginTop: Sizes.fixPadding + 5.0,
            }}>
                <Text style={{ ...Fonts.primaryColor19Medium }}>Pickup From</Text>
                <TextInput
                    placeholder='Pleace Enter Package Height in cm'
                    placeholderTextColor={Colors.blackColor}
                    style={styles.inputFieldStyle}
                    keyboardType="numeric"
                    value={packageHeight}
                    selectionColor={Colors.primaryColor}
                    onChangeText={(value) => setPackageHeight(value)}
                />
                <Text style={{ ...Fonts.blackColor15Medium }}>
                    Enter height in cm
                </Text>
            </View>
        )
    }

    function loadGoogleMapButton({ type }) {
        return (
            <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => {
                    setLoadMap(true);
                    type == 'pickup' ?
                        setpackagePickupInfo(false) :
                        setPackageDeliveryInfo(false)
                    setAddressType(type);
                }}
                style={styles.loadGoogleMapButtonStyle}>
                <Text style={{ ...Fonts.blackColor16Medium }}>Load Google Map</Text>
            </TouchableOpacity>
        )
    }

    function markerInfo() {
        return (
            <Text style={styles.markerInfoStyle}>
                {packageDeliveryInfo ?
                    'Place marker on google map at delivery location'
                    : 'Place marker on google map at pickup location'
                }
            </Text>
        )
    }

    function addressInfo() {
        return (
            <View style={{ marginHorizontal: Sizes.fixPadding * 2.0 }}>
                <Text style={{ ...Fonts.primaryColor19Medium }}>
                    {
                        packageDeliveryInfo ?
                            'Delivery Address' : 'Pickup Address'
                    }
                </Text>
                {packageDeliveryInfo ?
                    <TextInput
                        selectionColor={Colors.primaryColor}
                        placeholder="Please enter exact delivery address"
                        placeholderTextColor={Colors.blackColor}
                        multiline={true}
                        numberOfLines={6}
                        style={{ ...styles.inputTypeStyle, }}
                        value={exactDeliveryAddress}
                        onChangeText={(text) => setExactDeliveryAddress(text)}
                    />
                    :
                    <TextInput
                        selectionColor={Colors.primaryColor}
                        placeholder="Please enter exact pickup address"
                        placeholderTextColor={Colors.blackColor}
                        multiline={true}
                        numberOfLines={6}
                        style={{ ...styles.inputTypeStyle, }}
                        value={exactPickupAddress}
                        onChangeText={(text) => setExactPickupAddress(text)}
                    />
                }
            </View>
        )
    }

    function pickThisPlaceButton() {
        return (
            <View style={styles.pickThisPlaceButtonWrapStyle}>
                <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={() => {
                        if (addressType == 'pickup') {
                            setPickupAddress(currentAddress)
                            setPickupMarker(currentmarker)
                            setpackagePickupInfo(true)
                        }
                        else {
                            setDeliveryAddress(currentAddress);
                            setDeliveryMarker(currentmarker)
                            setPackageDeliveryInfo(true)
                        }
                        setLoadMap(false);
                    }}
                    style={styles.pickThisPlaceButtonStyle}
                >
                    <Text style={{ ...Fonts.blackColor15Medium }}>Pick This Place</Text>
                </TouchableOpacity>
            </View>
        )
    }

    function changeMap() {
        return (
            <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => setIsDark(!isDark)}
                style={styles.changeMapWrapStyle}>
                <MaterialIcons name="layers" size={24} color="black" />
            </TouchableOpacity>
        )
    }

    function locationIcon() {
        return (
            <View style={styles.locationIconWrapStyle}>
                <MaterialIcons name="my-location" size={24} color="black" />
            </View>
        )
    }

    async function setTheMarkerAccordingSearch({ address }) {
        let response = await Location.geocodeAsync(address);
        const userSearchLocation = {
            latitude: response[0].latitude,
            longitude: response[0].longitude,
        }
        setCurrentMarker(userSearchLocation)
        addressType == 'pickup' ?
            setPickupMarker(userSearchLocation) :
            setDeliveryMarker(userSearchLocation);
    }

    function mapHeader() {
        return (
            <View style={styles.mapHeaderWrapStyle}>
                <MaterialIcons
                    name="arrow-back"
                    size={24}
                    onPress={() => {
                        setLoadMap(false);
                        addressType == 'pickup' ?
                            setpackagePickupInfo(true) :
                            setPackageDeliveryInfo(true);
                    }}
                    color="black"
                    style={{ paddingRight: Sizes.fixPadding + 5.0 }}
                />
                <GooglePlacesAutocomplete
                    placeholder={'search'}
                    onPress={async (data,) => {
                        setSearchQuery(data.description)
                        await setTheMarkerAccordingSearch({ address: data.description })
                    }}
                    styles={{ textInput: { height: 40 } }}
                    query={{
                        key: Key.apiKey,
                    }}
                    textInputProps={{
                        InputComp: Input,
                        value: searchQuery,
                        onChangeText: (value) => { setSearchQuery(value) },
                        inputContainerStyle: { borderBottomWidth: 0.0, height: 40.0 },
                        inputStyle: { ...Fonts.blackColor16Bold, },
                        containerStyle: { marginLeft: -Sizes.fixPadding, height: 40.0, },
                        selectionColor: Colors.primaryColor
                    }}
                />
            </View>
        )
    }

    async function getAddress() {
        var streetNo = '';
        var street = '';
        var district = '';
        var postalCode = '';
        var city = '';
        var region = '';
        var country = '';
        let response = await Location.reverseGeocodeAsync(currentmarker);
        for (let item of response) {
            if (item.streetNumber != null) {
                streetNo = `${item.streetNumber} `;
            }
            if (item.street != null) {
                street = `${item.street}, `;
            }
            if (item.district != null) {
                district = `${item.district}, `;
            }
            if (item.postalCode != null) {
                postalCode = `${item.postalCode}, `;
            }
            if (item.city != null) {
                city = `${item.city}, `;
            }
            if (item.region != null) {
                region = `${item.region}, `;
            }
            if (item.country != null) {
                country = `${item.country}`;
            }

            let address = `${streetNo}${street}${district}${postalCode}${city}${region}${country}`;
            setCurrentAddress(address);
        }
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

export default PackageInfoScreen;
import { useFocusEffect } from "@react-navigation/native";
import React, { useState, useCallback } from "react";
import { Text, View, SafeAreaView, StatusBar, StyleSheet, BackHandler, Image, Dimensions, TouchableOpacity } from "react-native";
import { Colors, Fonts, Sizes } from "../../constant/styles";

const { width } = Dimensions.get('screen');

const WelcomeScreen = ({ navigation }) => {
    const backAction = () => {
        backClickCount == 1 ? BackHandler.exitApp() : _spring();
        return true;
    }

    useFocusEffect(
        useCallback(() => {
            BackHandler.addEventListener("hardwareBackPress", backAction);
            return () => BackHandler.removeEventListener("hardwareBackPress", backAction);
        }, [backAction])
    );

    function _spring() {
        updateState({ backClickCount: 1 });
        setTimeout(() => {
            updateState({ backClickCount: 0 })
        }, 1000)
    }

    const [state, setState] = useState({
        backClickCount: 0
    });

    const updateState = (data) => setState((state) => ({ ...state, ...data }));

    const { backClickCount } = state;

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#242E4D' }}>
            <StatusBar translucent={false} backgroundColor='#242E4D' />
            <View style={{
                flex: 1,
                justifyContent: 'space-between'
            }}>
                {appTitleWithDescription()}
                {appFunctionalities()}
                {getStartedInfo()}
            </View>
            {
                backClickCount == 1
                    ?
                    <View style={[styles.animatedView]}>
                        <Text style={{ ...Fonts.whiteColor15Regular }}>
                            Press Back Once Again to Exit
                        </Text>
                    </View>
                    :
                    null
            }
        </SafeAreaView>
    )

    function getStartedInfo() {
        return (
            <View style={styles.getStartedInfoWrapStyle}>
                <Text style={{ ...Fonts.blackColor20Medium }}>
                    Get started with AmariHitchDelivery
                </Text>
                <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={() => navigation.navigate('CreateAccount')}
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        marginTop: Sizes.fixPadding
                    }}>
                    <Text style={{ ...Fonts.blackColor18Medium }}>
                        +256
                    </Text>
                    <Text style={{ ...Fonts.grayColor17Medium, marginLeft: Sizes.fixPadding * 2.0 }}>
                        Enter your mobile number
                    </Text>
                </TouchableOpacity>
                <View style={{
                    backgroundColor: Colors.grayColor,
                    height: 0.80,
                    marginTop: Sizes.fixPadding
                }}>
                </View>
            </View>
        )
    }

    function appFunctionalities() {
        return (
            <View>
                {functionalities(
                    {
                        icon: require('../../assets/images/icons/courier.png'),
                        title: 'Send Packages',
                        description: 'Pick and drop items like keys,chargers and documents around your city city',
                    }
                )}
                {functionalities(
                    {
                        icon: require('../../assets/images/icons/food.png'),
                        title: 'Receive Package',
                        description: 'Receive packages from anyone around your city.',
                    }
                )}
                
            </View>
        )
    }

    function functionalities({ icon, title, description }) {
        return (
            <View style={styles.functionalitiesWrapStyle}>
                <View style={styles.functionalitiesIconWrapStyle} >
                    <Image
                        source={icon}
                        style={{ height: 40.0, width: 40.0 }}
                        resizeMode="cover"
                    />
                </View>
                <View style={{
                    marginLeft: Sizes.fixPadding + 10.0,
                    marginRight: Sizes.fixPadding * 2.0
                }}>
                    <Text style={{ ...Fonts.whiteColor20Regular }}>
                        {title}
                    </Text>
                    <Text style={styles.functionalitiesDescriptionStyle}>
                        {description}
                    </Text>
                </View>
            </View>
        )
    }

    function appTitleWithDescription() {
        return (
            <View style={{ alignItems: 'center' }}>
                <Text style={{ ...Fonts.primaryColor40PacificoRegular }}>
                    AmariHitch
                </Text>
                <Text style={{ ...Fonts.whiteColor19Regular, }}>
                    Delivery Transport
                </Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    animatedView: {
        backgroundColor: "#333333",
        position: "absolute",
        bottom: 40,
        alignSelf: 'center',
        borderRadius: Sizes.fixPadding * 2.0,
        paddingHorizontal: Sizes.fixPadding + 5.0,
        paddingVertical: Sizes.fixPadding,
        justifyContent: "center",
        alignItems: "center",
    },
    functionalitiesWrapStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: Sizes.fixPadding * 2.0,
        marginBottom: Sizes.fixPadding * 2.0
    },
    functionalitiesIconWrapStyle: {
        backgroundColor: Colors.whiteColor,
        width: 80.0,
        height: 80.0,
        borderRadius: 40.0,
        alignItems: 'center',
        justifyContent: 'center',
    },
    getStartedInfoWrapStyle: {
        height: 130.0,
        backgroundColor: Colors.whiteColor,
        padding: Sizes.fixPadding * 2.0
    },
    functionalitiesDescriptionStyle: {
        ...Fonts.grayColor16Medium,
        paddingRight: Sizes.fixPadding * 2.0,
        width: width - 140.0,
        lineHeight: 22.0,
        marginTop: Sizes.fixPadding - 3.0
    }
})

export default WelcomeScreen;
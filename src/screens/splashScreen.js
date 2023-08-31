import React, { useCallback } from "react";
import { View, SafeAreaView, StatusBar, Text, BackHandler } from "react-native";
import { Fonts } from "../constant/styles";
import { useFocusEffect } from "@react-navigation/native";

const SplashScreen = ({ navigation }) => {

    const backAction = () => {
        BackHandler.exitApp();
        return true;
    }

    useFocusEffect(
        useCallback(() => {
            BackHandler.addEventListener("hardwareBackPress", backAction);
            return () => BackHandler.removeEventListener("hardwareBackPress", backAction);
        }, [backAction])
    );

    setTimeout(() => {
        navigation.push('Welcome')
    }, 2000)

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#242E4D' }}>
            <StatusBar translucent={false} backgroundColor='#242E4D' />
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ ...Fonts.primaryColor40PacificoRegular }}>
                    Amari Hitch
                </Text>
                <Text style={{ ...Fonts.whiteColor19Regular, }}>
                Amari Hitch Delivery Transport
                </Text>
            </View>
        </SafeAreaView>
    )
}

export default SplashScreen;
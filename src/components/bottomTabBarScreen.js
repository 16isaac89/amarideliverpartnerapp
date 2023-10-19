import React, { useState, useCallback } from "react";
import { View, TouchableOpacity, StyleSheet, Text, BackHandler, SafeAreaView, StatusBar } from "react-native";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { Colors, Fonts, Sizes } from "../constant/styles";
import HomeScreen from "../screens/home/homeScreen";
import SearchScreen from "../screens/search/searchScreen";
import OrdersScreen from "../screens/orders/ordersScreen";
import NotificationsScreen from "../screens/notifications/notificationsScreen";
import WalletScreen from "../screens/wallet/walletScreen";
import { useFocusEffect } from "@react-navigation/native";

const BottomTabBarScreen = ({ navigation }) => {

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
        currentIndex: 1,
        backClickCount: 0
    });

    const updateState = (data) => setState((state) => ({ ...state, ...data }));

    const { currentIndex, backClickCount } = state;

    return (
        <SafeAreaView style={{ flex: 1, }}>
            <View style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
                <StatusBar
                    translucent={false}
                    backgroundColor={Colors.primaryColor}
                />
                {currentIndex == 1 ?
                    <HomeScreen navigation={navigation} />
                    :
                    currentIndex == 2 ?
                        <SearchScreen navigation={navigation} />
                        :
                        currentIndex == 3 ?
                            <OrdersScreen navigation={navigation} />
                            :
                            currentIndex == 4 ?
                                <NotificationsScreen navigation={navigation} />
                                :
                                <WalletScreen navigation={navigation} />
                }
                <View style={styles.bottomTabBarStyle}>
                {bottomTabBarItem({
                        index: 3,
                        title: 'Orders'
                    })}
                    {bottomTabBarItem({
                        index: 1,
                        title: 'Home'
                    })}
                    {/* {bottomTabBarItem({
                        index: 2,
                        title: 'Search'
                    })} */}
                   
                    {/* {bottomTabBarItem({
                        index: 4,
                        title: 'Notifications'
                    })} */}
                    {bottomTabBarItem({
                        index: 5,
                        title: 'Wallet'
                    })}
                </View>
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

    function bottomTabBarItem({ index, title }) {
        return (
            <TouchableOpacity
                activeOpacity={0.9}
                style={{ alignItems: 'center' }}
                onPress={() => updateState({ currentIndex: index })}
            >
                {index == 1 ?
                <View style={{width: 70, height: 70,borderColor:'black',borderWidth:0.9,borderRadius:35,bottom:'25%'}}>                    
                    <MaterialCommunityIcons name="home" size={64}
                        color={index == currentIndex ? Colors.primaryColor : Colors.grayColor}
                        style={{ alignSelf:'center' }}
                    />
                    </View>
                    :
                    index == 2 ?
                        <MaterialIcons name="search" size={24}
                            color={index == currentIndex ? Colors.primaryColor : Colors.grayColor}
                        />
                        :
                        index == 3 ?
                            <MaterialCommunityIcons name="shopping" size={24}
                                color={index == currentIndex ? Colors.primaryColor : Colors.grayColor}
                            />
                            :
                            index == 4 ?
                                <MaterialIcons name="notifications" size={24}
                                    color={index == currentIndex ? Colors.primaryColor : Colors.grayColor}
                                />
                                :
                                <MaterialIcons name="account-balance-wallet" size={24}
                                    color={index == currentIndex ? Colors.primaryColor : Colors.grayColor}
                                />

                }
                <Text style={index == currentIndex ? { ...Fonts.primaryColor12Medium } : { ...Fonts.grayColor12Medium }}>
                    {title}
                </Text>
            </TouchableOpacity>
        )
    }
}

export default BottomTabBarScreen;

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
    bottomTabBarStyle: {
        position: 'absolute',
        bottom: 0.0,
        left: 0.0,
        right: 0.0,
        height: 60.0,
        borderTopLeftRadius: Sizes.fixPadding * 2.0,
        borderTopRightRadius: Sizes.fixPadding * 2.0,
        backgroundColor: Colors.whiteColor,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 30.0,
        borderTopColor: 'rgba(128, 128, 128, 0.1)',
        borderTopWidth: 1.0,
        elevation: 2.0
    },
})




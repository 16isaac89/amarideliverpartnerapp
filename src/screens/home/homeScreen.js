import React from "react";
import { SafeAreaView, StatusBar, View, Text, StyleSheet, Image, Dimensions, ScrollView, TouchableOpacity } from "react-native";
import { Colors, Fonts, Sizes } from "../../constant/styles";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

const { width } = Dimensions.get('screen');

const HomeScreen = ({ navigation }) => {

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
            <StatusBar backgroundColor={Colors.primaryColor} />
            <View style={{ flex: 1 }}>
                {header()}
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{
                        paddingBottom: Sizes.fixPadding * 6.0
                    }}
                >
                    {banner()}
                    {inviteFriendsInfo()}
                    <TouchableOpacity
                        activeOpacity={0.9}
                        onPress={() => navigation.push('PackageInfoOne')}
                    >
                        {functionalities(
                            {
                                icon: require('../../assets/images/icons/courier.png'),
                                title: 'Send Packages',
                                description: 'Send Packages to anywhere and anytime.',
                            }
                        )}
                    </TouchableOpacity>
                    {/* <TouchableOpacity
                        activeOpacity={0.9}
                        onPress={() => navigation.push('Restaurants')}
                    >
                        {functionalities(
                            {
                                icon: require('../../assets/images/icons/food.png'),
                                title: 'Get Food Delivery',
                                description: 'Order food and we will deliver it',
                            }
                        )}
                    </TouchableOpacity> */}
                    {/* <TouchableOpacity
                        activeOpacity={0.9}
                        onPress={() => navigation.push('GroceryDetail')}
                    >
                        {functionalities(
                            {
                                icon: require('../../assets/images/icons/grocery.png'),
                                title: 'Get grocery Delivery',
                                description: 'Order grocery at your favourite store and we will deliver it.',
                            }
                        )}
                    </TouchableOpacity> */}
                </ScrollView>
            </View>
        </SafeAreaView>
    )

    function functionalities({ icon, title, description }) {
        return (
            <View style={styles.functionalitiesWrapStyle}>
                <View style={styles.functionalitiesIconWrapStyle}>
                    <Image
                        source={icon}
                        style={{ height: 40.0, width: 40.0 }}
                        resizeMode="cover"
                    />
                </View>
                <View style={{
                    marginLeft: Sizes.fixPadding,
                    marginRight: Sizes.fixPadding * 2.0
                }}>
                    <Text style={{ ...Fonts.primaryColor19Medium }}>
                        {title}
                    </Text>
                    <Text
                        numberOfLines={2}
                        style={{
                            ...Fonts.grayColor16Medium,
                            paddingRight: Sizes.fixPadding * 2.0,
                            width: width / 1.9,
                        }}
                    >
                        {description}
                    </Text>
                </View>
            </View>
        )
    }

    function inviteFriendsInfo() {
        return (
            <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => navigation.push('InviteFriends')}
                style={styles.inviteFriendsInfoWrapStyle}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Image
                        source={require('../../assets/images/icons/wallet.png')}
                        style={{ height: 35.0, width: 35.0 }}
                        resizeMode="cover"
                    />
                    <Text
                        numberOfLines={2}
                        style={{
                            ...Fonts.blackColor16Regular,
                            width: width / 1.5,
                            marginLeft: Sizes.fixPadding + 5.0
                        }}>
                        Invite friends to Courier Pro to earn upto $20 Courier Pro Cash
                    </Text>
                </View>
                <MaterialIcons name="arrow-forward-ios" size={20} color={Colors.grayColor} />
            </TouchableOpacity>
        )
    }

    function banner() {
        return (
            <Image
                source={require('../../assets/images/banner.png')}
                style={styles.bannerStyle}
                resizeMode="stretch"
            />
        )
    }

    function header() {
        return (
            <View style={styles.headerWrapStyle}>
                <Text style={{ ...Fonts.primaryColor19Medium }}>
                    Welcome to AmariHitch Delivery
                </Text>
                <MaterialIcons name="person" size={24} color={Colors.primaryColor}
                    onPress={() => navigation.push('Profile')}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    headerWrapStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: Sizes.fixPadding * 2.0,
        backgroundColor: Colors.whiteColor,
        elevation: 3.0,
        height: 55.0,
    },
    bannerStyle: {
        height: 190.0,
        width: width - 20.0,
        alignSelf: 'center',
        marginVertical: Sizes.fixPadding,
        borderRadius: Sizes.fixPadding
    },
    inviteFriendsInfoWrapStyle: {
        backgroundColor: '#F8F3EC',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: Sizes.fixPadding * 2.0,
        marginTop: Sizes.fixPadding + 5.0,
        marginBottom: Sizes.fixPadding * 2.0
    },
    functionalitiesWrapStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.whiteColor,
        borderRadius: Sizes.fixPadding,
        borderColor: 'rgba(185, 133, 73, 0.25)',
        borderWidth: 2.0,
        marginHorizontal: Sizes.fixPadding * 2.0,
        paddingVertical: Sizes.fixPadding + 5.0,
        paddingHorizontal: Sizes.fixPadding * 2.0,
        marginBottom: Sizes.fixPadding * 2.0
    },
    functionalitiesIconWrapStyle: {
        backgroundColor: '#F1E7DB',
        width: 70.0,
        height: 70.0,
        borderRadius: 35.0,
        alignItems: 'center',
        justifyContent: 'center',
    }
})

export default HomeScreen;
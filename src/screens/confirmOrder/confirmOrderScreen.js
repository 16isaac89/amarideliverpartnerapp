import React, { useState } from "react";
import { SafeAreaView, StatusBar, View, Text, StyleSheet, ScrollView, Dimensions, TouchableOpacity } from "react-native";
import { Colors, Fonts, Sizes } from "../../constant/styles";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

const { width } = Dimensions.get('screen');

const ConfirmOrderScreen = ({ navigation }) => {

    const [state, setState] = useState({
        itemCount: 1,
    })

    const updateState = (data) => setState((state) => ({ ...state, ...data }))

    const { itemCount } = state;

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
            <StatusBar backgroundColor={Colors.primaryColor} />
            <View style={{ flex: 1 }}>
                {header()}
                <ScrollView showsVerticalScrollIndicator={false}
                    contentContainerStyle={{
                        paddingBottom: 190.0,
                    }}
                >
                    {itemListTitle()}
                    {itemInfo()}
                    {divider({ height: 25 })}
                    {invoiceDetail()}
                    {congratsInfo()}

                </ScrollView>
            </View>
            <View style={styles.totalAmountAndDeliveryInfoWrapStyle}>
                <View style={{
                    height: 2,
                    backgroundColor: '#F5F5F5',
                    marginBottom: Sizes.fixPadding * 2.0,
                }}>
                </View>
                {deliveryInfo()}
                {divider({ height: 2 })}
                {totalItemAmountAndPayButton()}
            </View>
        </SafeAreaView>
    )

    function totalItemAmountAndPayButton() {
        return (
            <View style={styles.itemTotalAndAddButtonWrapStyle}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={{ ...Fonts.blackColor17Medium }}>
                        1 Item
                    </Text>
                    <View style={styles.itemTotalIndicateIconStyle}>
                    </View>
                    <Text style={{ ...Fonts.blackColor17Medium }}>
                        $14.7
                    </Text>
                </View>
                <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={() => {
                        navigation.push('Payment')
                    }}
                    style={styles.payNowButtonStyle}
                >
                    <Text style={{ ...Fonts.whiteColor19Regular }}>
                        Pay Now
                    </Text>
                </TouchableOpacity>
            </View>
        )
    }

    function deliveryInfo() {
        return (
            <View style={{ flexDirection: 'row', marginHorizontal: Sizes.fixPadding * 2.0, justifyContent: 'space-between', }}>
                <View style={{ flexDirection: 'row' }}>
                    <View style={styles.locationIconWrapStyle}>
                        <MaterialIcons name="location-on" size={25} color={Colors.whiteColor} />
                    </View>
                    <View style={{ marginLeft: Sizes.fixPadding, width: width / 1.5, }}>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={{ ...Fonts.grayColor16Medium }}>
                                {`Delivery to `}
                            </Text>
                            <Text style={{ ...Fonts.blackColor16Medium }}>
                                Home
                            </Text>
                        </View>
                        <Text numberOfLines={1} style={{ ...Fonts.grayColor16Medium, lineHeight: 24.0, }}>
                            2nd Floor, Park Plaza, Park Plaza,215, Indira
                        </Text>
                    </View>
                </View>
                <MaterialIcons name="edit" size={30} color={Colors.purpleColor} />
            </View>
        )
    }

    function congratsInfo() {
        return (
            <View style={styles.congratsInfoWrapStyle}>
                <Text
                    style={{ ...Fonts.primaryColor16Medium, lineHeight: 20.0, }}>
                    Congratulations! You've saved $1.3 on this order.
                </Text>
            </View>
        )
    }

    function invoiceDetail() {

        function divider() {
            return (
                <View style={{
                    height: 0.50,
                    marginVertical: Sizes.fixPadding,
                    backgroundColor: Colors.grayColor,
                }}>
                </View>
            )
        }

        return (
            <View style={{ marginHorizontal: Sizes.fixPadding * 2.0, }}>
                <Text style={{ ...Fonts.blackColor20Medium, marginBottom: Sizes.fixPadding }}>
                    Invoice
                </Text>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Text style={{ ...Fonts.blackColor17Medium }}>
                        Item total
                    </Text>
                    <Text style={{ ...Fonts.blackColor17Medium }}>
                        $15
                    </Text>
                </View>
                {divider()}
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Text style={{ ...Fonts.blackColor17Medium }}>
                        Partner Delivery Charges
                    </Text>
                    <Text style={{ ...Fonts.primaryColor17Medium }}>
                        $1 $0.7
                    </Text>
                </View>
                {divider()}
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Text style={{ ...Fonts.primaryColor17Medium }}>
                        Offer discount
                    </Text>
                    <Text style={{ ...Fonts.primaryColor17Medium }}>
                        -$1
                    </Text>
                </View>
                {divider()}
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Text style={{ ...Fonts.blackColor17Medium }}>
                        Grand total
                    </Text>
                    <Text style={{ ...Fonts.blackColor17Medium }}>
                        $14.7
                    </Text>
                </View>
                {divider()}
            </View>
        )
    }

    function divider({ height }) {
        return (
            <View style={{
                height: height,
                backgroundColor: '#F5F5F5',
                marginVertical: Sizes.fixPadding * 2.0
            }}>
            </View>
        )
    }

    function itemInfo() {
        return (
            <View style={styles.itemInfoWrapStyle}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <View style={{ ...styles.vegIconWrapStyle, alignSelf: 'flex-start' }}>
                        <View style={{
                            width: 13.0,
                            height: 13.0,
                            borderRadius: 6.5,
                            backgroundColor: Colors.greenColor
                        }}>
                        </View>
                    </View>
                    <View style={{ marginLeft: Sizes.fixPadding - 5.0 }}>
                        <Text style={{ ...Fonts.blackColor19Medium, lineHeight: 24.5, }}>
                            Cold Brew Coffee</Text>
                        <Text style={{ ...Fonts.grayColor16Medium, lineHeight: 20.0, }}>
                            Bold - Cocoa + Nutty
                        </Text>
                        <View style={styles.customizeButtonWrapStyle}>
                            <Text style={{ ...Fonts.grayColor18Medium, marginLeft: Sizes.fixPadding - 5.0 }}>
                                Customize
                            </Text>
                            <MaterialIcons
                                name="keyboard-arrow-down"
                                size={24}
                                color={Colors.grayColor}
                                style={{ marginLeft: Sizes.fixPadding - 4.0 }}
                            />
                        </View>
                    </View>

                </View>
                <View style={styles.itemCountButtonWrapStyle}>
                    <MaterialCommunityIcons
                        name="minus"
                        size={24}
                        color={Colors.primaryColor}
                        onPress={() => {
                            if (itemCount > 1) {
                                updateState({ itemCount: itemCount - 1 })
                            }
                        }}
                    />
                    <Text style={{ ...Fonts.primaryColor17Medium, marginHorizontal: Sizes.fixPadding - 5.0 }}>
                        {itemCount}
                    </Text>
                    <MaterialIcons
                        name="add"
                        size={24}
                        color={Colors.primaryColor}
                        onPress={() => updateState({ itemCount: itemCount + 1 })}
                    />
                </View>
                <Text style={{ ...Fonts.blackColor20Medium }}>
                    $15
                </Text>
            </View>
        )
    }

    function itemListTitle() {
        return (
            <View style={styles.itemListTitleWrapStyle}>
                <MaterialIcons name="store" size={20} color="black" />
                <Text style={{ ...Fonts.blackColor16Medium, marginLeft: Sizes.fixPadding }}>
                    Item List
                </Text>
            </View>
        )
    }

    function header() {
        return (
            <View style={styles.headerWrapStyle}>
                <MaterialIcons name="arrow-back-ios" size={25} color="black"
                    onPress={() => navigation.pop()}
                />
                <View style={{ paddingLeft: Sizes.fixPadding }}>
                    <Text style={{ ...Fonts.blackColor19Medium }}>
                        Confirm Order
                    </Text>
                    <Text style={{ ...Fonts.grayColor18Medium, lineHeight: 25.0 }}>
                        Bar 61 Restaurants, 76A England
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
        elevation: 1.0,
        paddingHorizontal: Sizes.fixPadding * 2.0
    },
    itemListTitleWrapStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: Sizes.fixPadding + 5.0,
        marginHorizontal: Sizes.fixPadding * 2.0
    },
    vegIconWrapStyle: {
        height: 20.0,
        width: 20.0,
        borderColor: Colors.greenColor,
        backgroundColor: Colors.whiteColor,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1.0,
    },
    itemInfoWrapStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginHorizontal: Sizes.fixPadding * 2.0
    },
    customizeButtonWrapStyle: {
        backgroundColor: Colors.whiteColor,
        elevation: 3.0,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: Sizes.fixPadding,
        paddingHorizontal: Sizes.fixPadding * 2.0,
        flexDirection: 'row',
        borderRadius: Sizes.fixPadding * 2.5,
        marginTop: Sizes.fixPadding,
        borderColor: '#E9E9E9',
        borderWidth: 1.0,
    },
    itemCountButtonWrapStyle: {
        backgroundColor: Colors.whiteColor,
        elevation: 3.0,
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: Sizes.fixPadding * 2.1,
        paddingVertical: Sizes.fixPadding,
        paddingHorizontal: Sizes.fixPadding,
        borderColor: '#E9E9E9',
        borderWidth: 1.0,
    },
    congratsInfoWrapStyle: {
        backgroundColor: '#F5EDE4',
        borderColor: Colors.primaryColor,
        borderWidth: 1.2,
        borderRadius: Sizes.fixPadding,
        marginHorizontal: Sizes.fixPadding * 2.0,
        paddingHorizontal: Sizes.fixPadding,
        paddingTop: Sizes.fixPadding + 5.0,
        paddingBottom: Sizes.fixPadding,
        marginBottom: Sizes.fixPadding * 2.0
    },
    locationIconWrapStyle: {
        width: 36.0,
        height: 36.0,
        borderRadius: 18.0,
        backgroundColor: Colors.primaryColor,
        alignItems: 'center',
        justifyContent: 'center'
    },
    itemTotalAndAddButtonWrapStyle: {
        flexDirection: 'row',
        marginHorizontal: Sizes.fixPadding * 2.0,
        marginBottom: Sizes.fixPadding * 2.0,
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    itemTotalIndicateIconStyle: {
        width: 9.0,
        height: 9.0,
        borderRadius: 4.5,
        backgroundColor: Colors.grayColor,
        marginHorizontal: Sizes.fixPadding
    },
    payNowButtonStyle: {
        backgroundColor: Colors.primaryColor,
        paddingHorizontal: Sizes.fixPadding * 3.0,
        paddingVertical: Sizes.fixPadding - 2.0,
        borderRadius: Sizes.fixPadding * 2.5,
    },
    totalAmountAndDeliveryInfoWrapStyle: {
        position: 'absolute',
        bottom: 0.0,
        left: 0.0,
        right: 0.0,
        backgroundColor: Colors.whiteColor,
    }
})

export default ConfirmOrderScreen;
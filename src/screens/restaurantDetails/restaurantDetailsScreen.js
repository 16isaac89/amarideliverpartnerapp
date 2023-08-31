import React, { useState } from "react";
import {
    SafeAreaView,
    StatusBar,
    View,
    Text,
    StyleSheet,
    Dimensions,
    Image,
    FlatList,
    TouchableOpacity
} from "react-native";
import { Colors, Fonts, Sizes } from "../../constant/styles";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { Switch } from 'react-native-paper';
import { TabView, TabBar } from 'react-native-tab-view';
import { BottomSheet } from '@rneui/themed';

const { width } = Dimensions.get('screen');

const RestaurantsDetailsScreen = ({ navigation }) => {

    const [isOnlyVeg, setisOnlyVeg] = useState(false)

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
            <StatusBar backgroundColor={Colors.primaryColor} />
            <View style={{ flex: 1 }}>
                {backArrow()}
                {restaurantDetails()}
                {vegOnlyOrNotSwitch()}
                <FoodTypes navigation={navigation} />
            </View>
        </SafeAreaView>
    )

    function vegOnlyOrNotSwitch() {
        return (
            <View style={styles.vegOnlyOrNotSwitchWrapStyle}>
                <Text style={{ ...Fonts.grayColor20Medium }}>VEG ONLY</Text>
                <Switch
                    value={isOnlyVeg}
                    onValueChange={(value) => setisOnlyVeg(value)}
                    color={Colors.primaryColor}
                    style={{ marginLeft: Sizes.fixPadding }}
                />
            </View>
        )
    }

    function restaurantDetails() {
        return (
            <View style={{
                marginHorizontal: Sizes.fixPadding * 2.0,
                marginTop: Sizes.fixPadding - 5.0
            }}>
                <Text style={{ ...Fonts.blackColor20Medium }}>
                    Bar 61 Restaurants
                </Text>
                <Text style={{
                    ...Fonts.grayColor16Medium,
                    marginTop: Sizes.fixPadding - 15.0,
                    marginBottom: Sizes.fixPadding - 5.0,
                }}
                >
                    76A England
                </Text>
                <View style={{
                    flexDirection: 'row', alignItems: 'center',
                    marginTop: Sizes.fixPadding - 9.0,
                    marginBottom: Sizes.fixPadding - 7.0
                }}>
                    <MaterialIcons name="timer" size={20} color={Colors.grayColor} />
                    <Text
                        numberOfLines={1}
                        style={{
                            ...Fonts.blackColor17Medium,
                            width: width - 80,
                            marginLeft: Sizes.fixPadding - 5.0
                        }}
                    >
                        42 mins, delivery
                    </Text>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                    <MaterialCommunityIcons name="tag" size={20} color={Colors.purpleColor} />
                    <Text
                        numberOfLines={1}
                        style={{
                            ...Fonts.purpleColor16Regular,
                            width: width - 80,
                            marginLeft: Sizes.fixPadding - 5.0
                        }}
                    >
                        50% off upto $5,Min order $10
                    </Text>
                </View>
            </View>
        )
    }

    function backArrow() {
        return (
            <MaterialIcons name="arrow-back-ios" size={24} color="black"
                style={{
                    marginHorizontal: Sizes.fixPadding * 2.0,
                    marginVertical: Sizes.fixPadding + 5.0
                }}
                onPress={() => navigation.pop()}
            />
        )
    }
}

const chineseFoodList = [
    {
        id: '1',
        isVeg: true,
        name: 'Homemade Special Granola Bowl',
        description: 'Served with greek yogurt,mixed nuts and seeds',
        amount: 4,
    },
    {
        id: '2',
        isVeg: true,
        name: 'Green Smoothies Bowl',
        description: 'Topped with banana, nuts and pomegranate seeds.',
        amount: 3.5,
    },
    {
        id: '3',
        isVeg: false,
        name: 'Green Smoothies Bowl Made With Almond Milk',
        description: 'Topped with banana, nuts and pomegranate seeds, vegan',
        amount: 5,
    },
    {
        id: '4',
        isVeg: true,
        name: 'Banana Cacao And Espresso Smoothie Bowl',
        description: 'Topped width homemade spiced granola and seasonal fruit',
        amount: 3,
    },
];

const FoodTypes = ({ navigation }) => {

    const [index, setIndex] = useState(0);
    const [routes] = useState([
        { key: 'first', title: 'CHINESE' },
        { key: 'second', title: 'SALADS' },
        { key: 'third', title: 'DESSERT' },
        { key: 'forth', title: 'BREWS' },
        { key: 'fifth', title: 'CONTINENTAL' },
    ]);

    const renderScene = ({ route, jumpTo }) => {
        switch (route.key) {
            case 'first':
                return <Food navigation={navigation} />;
            case 'second':
                return <Food navigation={navigation} />;
            case 'third':
                return <Food navigation={navigation} />;
            case 'forth':
                return <Food navigation={navigation} />;
            case 'fifth':
                return <Food navigation={navigation} />;
        }
    };

    return (
        <TabView
            navigationState={{ index, routes }}
            renderScene={renderScene}
            onIndexChange={setIndex}
            renderTabBar={props => (
                <TabBar
                    {...props}
                    indicatorStyle={{ backgroundColor: Colors.primaryColor, }}
                    tabStyle={{
                        width: "auto",
                    }}
                    scrollEnabled={true}
                    style={{ backgroundColor: 'white', }}
                    renderLabel={({ route, focused, color }) => (
                        <Text
                            style={{
                                ...Fonts.grayColor16Medium,
                            }}>
                            {route.title}
                        </Text>
                    )}
                />
            )}
        />
    )
}

const Food = ({ navigation }) => {

    const [showBottomSheet, setShowBottomSheet] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(null);

    const renderItem = ({ item }) => (
        <View style={styles.foodItemWrapStyle}>
            <View style={{ flexDirection: 'row', }}>
                <View style={{
                    ...styles.vegOrNonvegIconStyle,
                    borderColor: item.isVeg ? Colors.greenColor : Colors.redColor,
                }}>
                    <View style={{
                        width: 18.0,
                        height: 18.0,
                        borderRadius: 9.0,
                        backgroundColor: item.isVeg ? Colors.greenColor : Colors.redColor
                    }}>
                    </View>
                </View>
                <View style={{
                    width: width - 185,
                    marginLeft: Sizes.fixPadding
                }}>
                    <Text style={{
                        ...Fonts.blackColor19Regular,
                        lineHeight: 27,
                    }}>
                        {item.name}
                    </Text>
                    <Text style={{
                        ...Fonts.grayColor16Medium,
                        lineHeight: 22.0
                    }}>
                        {item.description}
                    </Text>
                    <Text style={{ ...Fonts.primaryColor19Medium }}>
                        ${item.amount}
                    </Text>
                </View>
            </View>
            <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => setShowBottomSheet(true)}
                style={styles.addButtonStyle}
            >
                <MaterialIcons name="add" size={18} color={Colors.primaryColor} />
                <Text style={{ ...Fonts.primaryColor19Medium }}>
                    ADD
                </Text>
            </TouchableOpacity>
        </View>
    )
    return (
        <View style={{ flex: 1 }}>
            <FlatList
                data={chineseFoodList}
                keyExtractor={(item) => `${item.id}`}
                renderItem={renderItem}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingTop: Sizes.fixPadding * 2.0, }}
            />
            {bottomSheet()}
        </View>

    )

    function vegIcon() {
        return (
            <View style={styles.vegIconWrapStyle}>
                <View style={{
                    width: 13.0, height: 13.0,
                    borderRadius: 6.5,
                    backgroundColor: Colors.greenColor
                }}>
                </View>
            </View>
        )
    }

    function iconAndCloseButton() {
        return (
            <View style={styles.surveIconAndCloseButtonWrapStyle}>
                <Image
                    source={require('../../assets/images/customize.png')}
                    style={{ width: 80.0, height: 80.0 }}
                    resizeMode="cover"
                />
                <MaterialIcons name="close" size={24} color="black"
                    onPress={() => setShowBottomSheet(false)}
                />
            </View>
        )
    }

    function choiceTheProduct({ product, index }) {
        return (
            <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => setCurrentIndex(index)}
                style={styles.chooseProductWrapStyle}>
                {vegIcon()}
                <View style={{
                    borderColor: currentIndex == index ? Colors.primaryColor : Colors.grayColor,
                    ...styles.chooseProductRadioButtonStyle,
                }}>
                    {
                        currentIndex == index
                            ?
                            <View style={{
                                width: 13.0,
                                height: 13.0,
                                borderRadius: 6.5,
                                backgroundColor: Colors.primaryColor,
                            }}>
                            </View> :
                            null
                    }
                </View>
                <Text style={{ ...Fonts.blackColor17Medium }}>
                    {product}
                </Text>
                <Text style={{ ...Fonts.grayColor17Medium, marginLeft: Sizes.fixPadding }}>$0</Text>
            </TouchableOpacity>
        )
    }

    function itemTotalAndAddItemButton() {
        return (
            <View style={styles.itemTotalAndAddButtonWrapStyle}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={{ ...Fonts.blackColor17Medium }}>
                        Item Total
                    </Text>
                    <View style={styles.itemTotalIndicateIconStyle}>
                    </View>
                    <Text style={{ ...Fonts.primaryColor17Medium }}>
                        $5
                    </Text>
                </View>
                <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={() => {
                        setShowBottomSheet(false);
                        navigation.push('ConfirmOrder')
                    }}
                    style={styles.addItemButtonStyle}
                >
                    <Text style={{ ...Fonts.whiteColor19Regular }}>
                        Add Item
                    </Text>
                </TouchableOpacity>
            </View>
        )
    }

    function dishType() {
        return (
            <View style={styles.dishTypeWrapStyle}>
                {vegIcon()}
                <Text style={{ ...Fonts.grayColor17Medium, marginLeft: Sizes.fixPadding - 5.0 }}>Cold Brew Coffee</Text>
            </View>
        )
    }

    function customizeTitle() {
        return (
            <Text style={{
                ...Fonts.blackColor22Medium,
                marginHorizontal: Sizes.fixPadding * 2.0,
                marginVertical: Sizes.fixPadding,
            }}>
                Customize
            </Text>
        )
    }

    function selectionWithCount() {
        return (
            <View style={{
                flexDirection: 'row',
                marginHorizontal: Sizes.fixPadding * 2.0,
                justifyContent: 'space-between'
            }}>
                <Text style={{ ...Fonts.grayColor17Medium }}>
                    Bold-Cocoa
                </Text>
                <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                    <MaterialIcons name="add" size={15} color={Colors.grayColor} />
                    <Text style={{ ...Fonts.grayColor16Medium }}>1 more</Text>
                </View>
            </View>
        )
    }

    function choiceOfDishTitle() {
        return (
            <Text style={{
                ...Fonts.blackColor19Medium,
                marginTop: Sizes.fixPadding + 8.0,
                marginBottom: Sizes.fixPadding - 7.0,
                marginHorizontal: Sizes.fixPadding * 2.0,
            }}>
                Choice of Coffee
            </Text>
        )
    }

    function divider() {
        return (
            <View style={{
                backgroundColor: Colors.grayColor,
                height: 0.30,
                marginVertical: Sizes.fixPadding,
            }}>
            </View>
        )
    }

    function bottomSheet() {
        return (
            <BottomSheet
                isVisible={showBottomSheet}
                containerStyle={{ backgroundColor: 'rgba(0.5, 0.50, 0, 0.50)' }}
                onBackdropPress={() => setShowBottomSheet(false)}
            >
                <View
                    style={{
                        backgroundColor: Colors.whiteColor,
                        paddingVertical: Sizes.fixPadding * 2.0,
                    }}
                >
                    {iconAndCloseButton()}
                    {customizeTitle()}
                    {dishType()}
                    {choiceOfDishTitle()}
                    {choiceTheProduct(
                        { product: 'Light - Fruity + Milk Chocolate', index: 1 }
                    )}
                    {choiceTheProduct(
                        { product: 'Bold - Cocoa + Nutty', index: 2 }
                    )}
                    {divider()}
                    {selectionWithCount()}
                    {itemTotalAndAddItemButton()}
                </View>
            </BottomSheet>
        )
    }
}

const styles = StyleSheet.create({
    vegOnlyOrNotSwitchWrapStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: Sizes.fixPadding * 2.0,
        marginVertical: Sizes.fixPadding
    },
    foodItemWrapStyle: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: Sizes.fixPadding * 2.0,
        marginBottom: Sizes.fixPadding * 2.0,
    },
    vegOrNonvegIconStyle: {
        backgroundColor: Colors.whiteColor,
        width: 30.0,
        height: 30.0,
        borderWidth: 1.0,
        alignItems: 'center',
        justifyContent: 'center',
    },
    addButtonStyle: {
        backgroundColor: Colors.whiteColor,
        elevation: 3.0,
        height: 50.0,
        alignItems: "center",
        flexDirection: 'row',
        borderColor: '#EBEBEB',
        borderWidth: 1.0,
        paddingHorizontal: Sizes.fixPadding + 3.0,
        borderRadius: Sizes.fixPadding * 2.2,
    },
    chooseProductWrapStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: Sizes.fixPadding * 2.0,
        marginVertical: Sizes.fixPadding - 5.0,
    },
    chooseProductRadioButtonStyle: {
        width: 18.0,
        height: 18.0,
        borderRadius: 9.0,
        borderWidth: 1.0,
        backgroundColor: Colors.whiteColor,
        marginHorizontal: Sizes.fixPadding,
        alignItems: 'center',
        justifyContent: 'center',
    },
    itemTotalAndAddButtonWrapStyle: {
        flexDirection: 'row',
        marginHorizontal: Sizes.fixPadding * 2.0,
        marginTop: Sizes.fixPadding + 5.0,
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    itemTotalIndicateIconStyle: {
        width: 12.0,
        height: 12.0,
        borderRadius: 6.0,
        backgroundColor: Colors.grayColor,
        marginHorizontal: Sizes.fixPadding
    },
    addItemButtonStyle: {
        backgroundColor: Colors.primaryColor,
        paddingHorizontal: Sizes.fixPadding * 2.5,
        paddingVertical: Sizes.fixPadding - 4.0,
        borderRadius: Sizes.fixPadding * 2.5,
    },
    surveIconAndCloseButtonWrapStyle: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: Sizes.fixPadding * 2.0,
        alignItems: 'center',
    },
    dishTypeWrapStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: Sizes.fixPadding * 2.0,
        marginTop: Sizes.fixPadding - 19.0
    },
    vegIconWrapStyle: {
        height: 20.0,
        width: 20.0,
        borderColor: Colors.greenColor,
        backgroundColor: Colors.whiteColor,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1.0,
    }
})

export default RestaurantsDetailsScreen;
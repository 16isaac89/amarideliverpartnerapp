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
import { TabView, TabBar } from 'react-native-tab-view';
import { BottomSheet } from '@rneui/themed';

const { width } = Dimensions.get('screen');

const GroceryDetailsScreen = ({ navigation }) => {

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
            <StatusBar backgroundColor={Colors.primaryColor} />
            <View style={{ flex: 1 }}>
                {backArrow()}
                {groceryDetails()}
                <GroceryTypes navigation={navigation} />
            </View>
        </SafeAreaView>
    )

    function groceryDetails() {
        return (
            <View style={{
                marginHorizontal: Sizes.fixPadding * 2.0,
                marginTop: Sizes.fixPadding - 5.0,
            }}>
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                }}>
                    <View>
                        <Text style={{ ...Fonts.blackColor20Medium }}>
                            Grocery
                        </Text>
                        <Text style={{
                            ...Fonts.grayColor16Medium,
                            marginTop: Sizes.fixPadding - 15.0,
                            marginBottom: Sizes.fixPadding - 5.0,
                            width: width - 200.0,
                        }}
                        >
                            Spar Hypermarket, MG Road
                        </Text>
                    </View>
                    <View style={styles.changeStoreButtonStyle}>
                        <Text style={{ ...Fonts.primaryColor17Medium }}>
                            CHANGE STORE
                        </Text>
                    </View>
                </View>
                <View style={styles.deliveryInfoWrapStyle}>
                    <MaterialIcons name="timer" size={20} color={Colors.grayColor} />
                    <Text
                        numberOfLines={1}
                        style={{
                            ...Fonts.blackColor17Medium,
                            marginHorizontal: Sizes.fixPadding - 5.0
                        }}
                    >
                        15 mins, Free delivery
                    </Text>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                    <MaterialCommunityIcons name="tag" size={20} color={Colors.purpleColor} />
                    <Text
                        numberOfLines={1}
                        style={{
                            ...Fonts.purpleColor16Regular,
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

const groceryList = [
    {
        id: '1',
        image: require('../../assets/images/grocery/grocery_1.png'),
        name: 'Amul Taaza patourized toned milk',
        description: 'Amul taaza fresh toned milk',
        amount: 1,
    },
    {
        id: '2',
        image: require('../../assets/images/grocery/grocery_2.png'),
        name: 'Best Plus Egg',
        description: '10 Psc.',
        amount: 1.2,
    },
    {
        id: '3',
        image: require('../../assets/images/grocery/grocery_3.png'),
        name: 'Fresho Onion- Organically Grown',
        description: 'It is organically grown and handpicked from farm.',
        amount: 0.8,
    },
    {
        id: '4',
        image: require('../../assets/images/grocery/grocery_4.png'),
        name: 'Epigamia Greek Yogurt',
        description: 'Hunny and banana',
        amount: 0.5,
    },
];

const GroceryTypes = ({ navigation }) => {

    const [index, setIndex] = useState(0);
    const [routes] = useState([
        { key: 'first', title: 'BESTSELLER' },
        { key: 'second', title: 'DAIRY' },
        { key: 'third', title: 'FRUITS' },
        { key: 'forth', title: 'BEVARAGES' },
    ]);

    const renderScene = ({ route, jumpTo }) => {
        switch (route.key) {
            case 'first':
                return <Grocery navigation={navigation} />;
            case 'second':
                return <Grocery navigation={navigation} />;
            case 'third':
                return <Grocery navigation={navigation} />;
            case 'forth':
                return <Grocery navigation={navigation} />;
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
                        width: 'auto'
                    }}
                    scrollEnabled={true}
                    style={{ backgroundColor: 'white', }}
                    renderLabel={({ route }) => (
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

const Grocery = ({ navigation }) => {

    const [showBottomSheet, setShowBottomSheet] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(null);

    const renderItem = ({ item }) => (
        <View style={styles.groceryItemWrapStyle}>
            <View style={{ flexDirection: 'row', }}>
                <Image
                    source={item.image}
                    style={{
                        height: 90.0,
                        width: 90.0,
                    }}
                    resizeMode="contain"
                />
                <View style={{
                    width: width - 245,
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
                data={groceryList}
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

    function chooseTheQuantity({ quantity, index, price }) {
        return (
            <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => setCurrentIndex(index)}
                style={styles.chooseQuantityWrapStyle}>
                {vegIcon()}
                <View style={{
                    borderColor: currentIndex == index ? Colors.primaryColor : Colors.grayColor,
                    ...styles.chooseProductQuantityRadioButtonStyle,
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
                    {quantity}
                </Text>
                <Text style={{ ...Fonts.grayColor17Medium, marginLeft: Sizes.fixPadding }}>
                    ${price}
                </Text>
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
                <Text style={{ ...Fonts.grayColor17Medium, marginLeft: Sizes.fixPadding - 5.0 }}>
                    Best Plus Egg
                </Text>
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

    function dishTypeWithCount() {
        return (
            <View style={{
                flexDirection: 'row',
                marginHorizontal: Sizes.fixPadding * 2.0,
                justifyContent: 'space-between'
            }}>
                <Text style={{ ...Fonts.grayColor17Medium }}>
                    Best Plus Egg
                </Text>
                <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                    <MaterialIcons name="add" size={15} color={Colors.grayColor} />
                    <Text style={{ ...Fonts.grayColor16Medium }}>1 more</Text>
                </View>
            </View>
        )
    }

    function choiceOfQuantityTitle() {
        return (
            <Text style={{
                ...Fonts.blackColor19Medium,
                marginTop: Sizes.fixPadding + 8.0,
                marginBottom: Sizes.fixPadding - 7.0,
                marginHorizontal: Sizes.fixPadding * 2.0,
            }}>
                Choice of quantity
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
                    {choiceOfQuantityTitle()}
                    {chooseTheQuantity(
                        { quantity: '10 Pieces', index: 1, price: 5 }
                    )}
                    {chooseTheQuantity(
                        { quantity: '20 Pieces', index: 2, price: 8 }
                    )}
                    {divider()}
                    {dishTypeWithCount()}
                    {itemTotalAndAddItemButton()}
                </View>
            </BottomSheet>
        )
    }
}

const styles = StyleSheet.create({
    groceryItemWrapStyle: {
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
    chooseQuantityWrapStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: Sizes.fixPadding * 2.0,
        marginVertical: Sizes.fixPadding - 5.0,
    },
    chooseProductQuantityRadioButtonStyle: {
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
    },
    changeStoreButtonStyle: {
        backgroundColor: Colors.whiteColor,
        borderRadius: Sizes.fixPadding,
        justifyContent: 'center',
        paddingHorizontal: Sizes.fixPadding,
        elevation: 3.0,
        height: 47.0,
        borderColor: '#EBEBEB',
        borderWidth: 1.0,
    },
    deliveryInfoWrapStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: Sizes.fixPadding - 9.0,
        marginBottom: Sizes.fixPadding - 7.0
    }
})

export default GroceryDetailsScreen;
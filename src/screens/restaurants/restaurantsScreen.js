import React from "react";
import { SafeAreaView, StatusBar, View, Text, StyleSheet, Image, Dimensions, FlatList, TouchableOpacity } from "react-native";
import { Colors, Fonts, Sizes } from "../../constant/styles";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

const { width } = Dimensions.get('screen');

const restaurantsList = [
    {
        id: '1',
        
        name: 'Bar 61 Restaurant',
        foodType: 'Beverages, Snacks',
        place: '76A England',
        timeInMinute: 15,
        isDeliveryFree: true,
        isOffer: true,
        offer: '20% off upto $2',
    },
    {
        id: '2',
        
        name: 'Core by Clare Smyth',
        foodType: 'Beverages, Fast Food',
        place: '220 Opera Street',
        timeInMinute: 20,
        isDeliveryFree: false,
        isOffer: false,
    },
    {
        id: '3',
        name: 'Amrutha Lounge',
        foodType: 'Full Meal',
        place: '90B Silicon Velley',
        timeInMinute: 25,
        isDeliveryFree: true,
        isOffer: true,
        offer: '25% off on order above $5',
    },
    {
        id: '4',
       
        name: 'The Barbary',
        foodType: 'Desserts',
        place: '99C OBC Area',
        timeInMinute: 28,
        isDeliveryFree: true,
        isOffer: true,
        offer: '25% off upto $3',
    },
    {
        id: '5',
        
        name: 'The Palomar',
        foodType: 'American Fastfood',
        place: '31A Om Colony',
        timeInMinute: 15,
        isDeliveryFree: true,
        isOffer: true,
        offer: '15% off upto $5',
    },
];

const RestaurantsScreen = ({ navigation }) => {

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#FAFAFA' }}>
            <StatusBar backgroundColor={Colors.primaryColor} />
            <View style={{ flex: 1 }}>
                {header()}
                {reastaurants()}
            </View>
        </SafeAreaView>
    )

    function reastaurants() {
        const renderItem = ({ item }) => (
            <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => navigation.push('RestaurantDetail')}
                style={styles.restaurantDetailWrapStyle}>
               
                <View style={{
                    marginLeft: Sizes.fixPadding,
                    width: width - 200,
                }}>
                    <Text numberOfLines={1} style={{ ...Fonts.blackColor20Medium }}>
                        {item.name}
                    </Text>
                    <Text numberOfLines={1} style={{ ...Fonts.primaryColor17Medium, }}>
                        {item.foodType}
                    </Text>
                    <Text numberOfLines={1} style={{ ...Fonts.blackColor17Regular }}>
                        {item.place}
                    </Text>
                    <View style={{
                        flexDirection: 'row', alignItems: 'center',
                        marginTop: Sizes.fixPadding - 9.0,
                        marginBottom: Sizes.fixPadding - 7.0
                    }}>
                        <MaterialIcons name="timer" size={20} color={Colors.primaryColor} />
                        <Text
                            numberOfLines={1}
                            style={{
                                ...Fonts.primaryColor16Regular,
                                width: width - 225,
                                marginLeft: Sizes.fixPadding - 5.0
                            }}
                        >
                            {item.timeInMinute} mins, {item.isDeliveryFree ? `Free Delivery` : 'delivery'}
                        </Text>
                    </View>
                    {item.isOffer
                        ?
                        <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                            <MaterialCommunityIcons name="tag" size={20} color={Colors.purpleColor} />
                            <Text
                                numberOfLines={1}
                                style={{
                                    ...Fonts.purpleColor16Regular,
                                    width: width - 225,
                                    marginLeft: Sizes.fixPadding - 5.0
                                }}
                            >
                                20% off upto $2
                            </Text>
                        </View>
                        :
                        null
                    }
                </View>
            </TouchableOpacity>
        )
        return (
            <FlatList
                data={restaurantsList}
                keyExtractor={(item) => `${item.id}`}
                renderItem={renderItem}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingTop: Sizes.fixPadding * 2.0 }}
            />
        )
    }

    function header() {
        return (
            <View style={styles.headerWrapStyle}>
                <MaterialIcons name="arrow-back-ios" size={25} color="black"
                    onPress={() => navigation.pop()}
                />
                <View style={{ paddingLeft: Sizes.fixPadding }}>
                    <Text style={{ ...Fonts.primaryColor19Medium }}>Restaurants</Text>
                    <Text style={{ ...Fonts.grayColor16Medium, lineHeight: 25.0 }}>
                        285 Stores
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
    restaurantDetailWrapStyle: {
        backgroundColor: Colors.whiteColor,
        flexDirection: 'row',
        elevation: 3.0,
        marginHorizontal: Sizes.fixPadding * 2.0,
        borderRadius: Sizes.fixPadding - 5.0,
        padding: Sizes.fixPadding + 2.0,
        marginBottom: Sizes.fixPadding * 2.0,
    }
})

export default RestaurantsScreen;
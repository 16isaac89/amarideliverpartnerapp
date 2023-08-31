import React, { } from "react";
import { SafeAreaView, StatusBar, View, Text, StyleSheet, ScrollView, TextInput } from "react-native";
import { Colors, Fonts, Sizes } from "../../constant/styles";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

const trendingsList = [
    'Starbucks',
    'Nagarjuna',
    'Natures Basket',
    'Chicken',
    'Cigarettes',
    'Empire',
    'Grocery',
    'Butter Chicken',
    'Chinese Manchuriyan',
    'Hot Dog',
];

const recentSearchList = ['Blue Tokai', 'Blue Tokai Coffee | Koramangala', 'Creekay Supermarket'];

const SearchScreen = ({ navigation }) => {
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <StatusBar backgroundColor={Colors.primaryColor} />
            <View style={{ flex: 1 }}>
                {searchField()}
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingBottom: Sizes.fixPadding * 8.0 }}
                >
                    {recentSearchesTitle()}
                    {recentSearches()}
                    {trendingTitle()}
                    {trendings()}
                </ScrollView>
            </View>
        </SafeAreaView>
    )

    function trendingTitle() {
        return (
            <View style={styles.trendingTitleWrapStyle}>
                <Text style={{ ...Fonts.blackColor16Medium }}>
                    Trending around you
                </Text>
            </View>
        )
    }

    function trendings() {
        return (
            trendingsList.map((item) =>
                <View key={item} style={styles.trendingListStyle}>
                    <MaterialIcons name="trending-up" size={24} color={Colors.blueColor} />
                    <Text style={{ marginLeft: Sizes.fixPadding, ...Fonts.blackColor16Regular }}>
                        {item}
                    </Text>
                </View>
            )
        )
    }

    function recentSearches() {
        return (
            recentSearchList.map((item) =>
                <View key={item} style={styles.recentSearchesListStyle}>
                    <MaterialIcons name="history" size={24} color={Colors.grayColor} />
                    <Text style={{ marginLeft: Sizes.fixPadding, ...Fonts.blackColor16Regular }}>
                        {item}
                    </Text>
                </View>
            )
        )
    }

    function searchField() {
        return <View style={styles.searchFieldWrapStyle}>
            <View style={styles.searchFieldStyle}>
                <MaterialIcons name="search" size={24} color={Colors.grayColor} />
                <View style={{ flex: 1 }}>
                    <TextInput
                        selectionColor={Colors.primaryColor}
                        placeholder="Search for stors & restaurants"
                        style={{
                            ...Fonts.blackColor16Regular,
                            marginLeft: Sizes.fixPadding,
                        }}
                    />
                </View>
            </View>
        </View>
    }

    function recentSearchesTitle() {
        return (
            <View style={styles.recentSearchesTitleWrapStyle}>
                <Text style={{ ...Fonts.blackColor16Medium }}>Your recent searches</Text>
                <Text style={{ ...Fonts.blueColor16Regular }}>Show more</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    searchFieldWrapStyle: {
        backgroundColor: Colors.whiteColor,
        elevation: 4.0,
        height: 63.0,
        paddingHorizontal: Sizes.fixPadding * 2.0,
        justifyContent: 'center'
    },
    searchFieldStyle: {
        backgroundColor: '#F5F5F5',
        borderRadius: 30.0,
        height: 45.0,
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: Sizes.fixPadding + 5.0,
    },
    recentSearchesTitleWrapStyle: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#F5F5F5',
        paddingHorizontal: Sizes.fixPadding * 2.0,
        paddingVertical: Sizes.fixPadding + 2.0,
        alignItems: 'center',
        marginBottom: Sizes.fixPadding,
    },
    recentSearchesListStyle: {
        flexDirection: 'row',
        marginHorizontal: Sizes.fixPadding * 2.0,
        marginVertical: Sizes.fixPadding,
        alignItems: 'center'
    },
    trendingTitleWrapStyle: {
        backgroundColor: '#F5F5F5',
        paddingHorizontal: Sizes.fixPadding * 2.0,
        paddingVertical: Sizes.fixPadding + 2.0,
        marginVertical: Sizes.fixPadding,
        justifyContent: 'center'
    },
    trendingListStyle: {
        flexDirection: 'row',
        marginHorizontal: Sizes.fixPadding * 2.0,
        marginVertical: Sizes.fixPadding,
        alignItems: 'center'
    }
})

export default SearchScreen;
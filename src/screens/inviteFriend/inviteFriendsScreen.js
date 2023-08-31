import React from "react";
import { Text, View, SafeAreaView, StatusBar, StyleSheet } from "react-native";
import { Colors, Fonts, Sizes } from "../../constant/styles";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

const InviteFriendsScreen = ({ navigation }) => {

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
            <StatusBar backgroundColor={Colors.primaryColor} />
            <View style={{ flex: 1 }}>
                {header()}
                {shareCodeInfo()}
                {referralCodeInfo()}
            </View>
        </SafeAreaView>
    )

    function referralCodeInfo() {
        return (
            <View style={{
                backgroundColor: '#EEEEEE',
                padding: Sizes.fixPadding * 2.0,
                marginTop: Sizes.fixPadding,
            }}>
                <View style={{ alignItems: 'center', }}>
                    <Text style={{ ...Fonts.blackColor17Regular }}>
                        Your Referral Code
                    </Text>
                    <View style={styles.referralCodeWrapStyle}>
                        <Text style={{
                            ...Fonts.primaryColor19Medium,
                            marginRight: Sizes.fixPadding * 11.0
                        }}>
                            SLP809
                        </Text>
                        <MaterialIcons name="content-copy" size={25} color={Colors.primaryColor} />
                    </View>
                </View>
                <View style={styles.shareOptionsWrapStyle}>
                    <View style={styles.shareWithWhatsAppWrapStyle}>
                        <Text style={{ ...Fonts.whiteColor19Regular }}>
                            Whatsapp
                        </Text>
                        <MaterialCommunityIcons name="whatsapp" size={30} color={Colors.whiteColor} />
                    </View>
                    <View style={styles.shareWithMoreOptionsWrapStyle}>
                        <Text style={{ ...Fonts.blackColor19Regular }}>
                            More Options
                        </Text>
                        <MaterialIcons name="share" size={24} color="black" />
                    </View>
                </View>
            </View>
        )
    }

    function shareCodeInfo() {
        return (
            <View style={{ marginHorizontal: Sizes.fixPadding * 2.0, marginVertical: Sizes.fixPadding * 2.0 }}>
                <Text style={{ ...Fonts.blackColor20Medium, marginBottom: Sizes.fixPadding - 5.0 }}>
                    Share Code & save at least 25%
                </Text>
                <Text style={{
                    ...Fonts.grayColor16Medium, textAlign: 'justify',
                    lineHeight: 22.0,
                }}>
                    Your friend gets $15 TravelPro cash on sign up.You get $15 when they book trip or experience of $75 or more within 21 days.you can earn upto $200 TravelPro Cash.
                </Text>
            </View>
        )
    }

    function header() {
        return (
            <View style={styles.headerWrapStyle}>
                <MaterialIcons name="arrow-back" size={24} color="black"
                    onPress={() => navigation.pop()}
                />
                <Text style={{ ...Fonts.blackColor19Medium, marginLeft: Sizes.fixPadding }}>
                    Invite Friends
                </Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    headerWrapStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 60.0,
        backgroundColor: Colors.whiteColor,
        paddingHorizontal: Sizes.fixPadding * 2.0,
        elevation: 3.0,
    },
    referralCodeWrapStyle: {
        backgroundColor: Colors.whiteColor,
        paddingHorizontal: Sizes.fixPadding + 2.0,
        paddingVertical: Sizes.fixPadding + 2.0,
        borderColor: Colors.grayColor,
        borderWidth: 1.7,
        borderRadius: Sizes.fixPadding + 2.0,
        flexDirection: 'row',
        alignItems: 'center',
        borderStyle: 'dotted',
        marginVertical: Sizes.fixPadding
    },
    shareWithWhatsAppWrapStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#8DC88F',
        borderRadius: Sizes.fixPadding * 2.2,
        flex: 0.47,
        paddingVertical: Sizes.fixPadding,
        paddingHorizontal: Sizes.fixPadding,
    },
    shareWithMoreOptionsWrapStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: Colors.whiteColor,
        borderRadius: Sizes.fixPadding * 2.2,
        flex: 0.47,
        paddingVertical: Sizes.fixPadding,
        paddingHorizontal: Sizes.fixPadding,
        borderColor: '#CACACA',
        borderWidth: 1.0,
    },
    shareOptionsWrapStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: Sizes.fixPadding
    }
})

export default InviteFriendsScreen;
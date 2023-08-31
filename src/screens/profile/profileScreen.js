import React, { Component } from "react";
import { Text, View, StyleSheet, SafeAreaView, StatusBar, ScrollView, TouchableOpacity, Image, Dimensions, } from "react-native";
import { Colors, Fonts, Sizes } from "../../constant/styles";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { Dialog } from "react-native-paper";
import { connect } from 'react-redux';
import * as actions from '../../redux/actions';

const { width } = Dimensions.get('screen');

class profileScreen extends Component {

    render(){
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
            <StatusBar backgroundColor={Colors.primaryColor} />
            <View style={{ flex: 1 }}>
                {this.header()}
                {this.userInfo()}
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    style={{ flex: 1, backgroundColor: '#F4F4F4' }}>
                    {/* {this.settingsInfo()} */}
                    {this.logOutInfo()}
                </ScrollView>
            </View>
           
        </SafeAreaView>
    )
    }



    logOutInfo=()=> {
        return (
            <TouchableOpacity
                activeOpacity={0.6}
                onPress={() => this.props.logout()}
                style={styles.logOutInfoWrapStyle}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <MaterialCommunityIcons name="login-variant" size={24} color={Colors.grayColor} />
                    <Text style={{
                        ...Fonts.blackColor17Regular,
                        marginLeft: Sizes.fixPadding,
                        width: width / 1.8,
                    }}>
                        Logout
                    </Text>
                </View>
                <MaterialIcons name="arrow-forward-ios" size={18} color={Colors.grayColor} />
            </TouchableOpacity>
        )
    }

   settingsInfo=()=> {
        return (
            <View style={styles.settingInfoWrapStyle}>
                <TouchableOpacity
                    activeOpacity={0.6}
                    onPress={() => navigation.navigate('Notifications', { from: 'profile' })}
                >
                   
                        <MaterialIcons name="notifications" size={22} color={Colors.grayColor} />
                       
                </TouchableOpacity>
                
                   
                <MaterialIcons name="settings" size={22} color={Colors.grayColor} />
                   
                <TouchableOpacity
                    activeOpacity={0.6}
                    onPress={() => navigation.push('InviteFriends')}
                >
                    <MaterialIcons name="group-add" size={24} color={Colors.grayColor} />
                        
                </TouchableOpacity>
               
            </View>
        )
    }

   settings=({ icon, setting })=> {
        return (
            <View style={styles.settingStyle}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    {icon}
                    <Text style={{
                        ...Fonts.blackColor17Regular,
                        marginLeft: Sizes.fixPadding,
                        width: width / 1.8,
                    }}>
                        {setting}
                    </Text>
                </View>
                <MaterialIcons name="arrow-forward-ios" size={18} color={Colors.grayColor} />
            </View>
        )
    }

    userInfo=() =>{
        return (
            <TouchableOpacity
                activeOpacity={0.6}
                onPress={() =>this.props.navigation.navigate('EditProfile')}
                style={styles.userInfoWrapStyle}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Image
                        source={require('../../assets/images/user.jpg')}
                        style={{
                            width: 80.0, height: 80.0,
                            borderRadius: Sizes.fixPadding - 5.0,
                        }}
                        resizeMode="cover"
                    />
                    <View style={styles.userInfoStyle}>
                        <Text style={{
                            ...Fonts.blackColor17Medium,
                            width: width / 2.3,
                        }}>
                            Ellison Perry
                        </Text>
                        <Text style={{ ...Fonts.grayColor16Medium }}>
                            123456789
                        </Text>
                    </View>
                </View>
                <MaterialIcons name="arrow-forward-ios" size={18} color={Colors.grayColor} />
            </TouchableOpacity>
        )
    }

    header=()=> {
        return (
            <Text style={{
                ...Fonts.blackColor20Medium,
                paddingHorizontal: Sizes.fixPadding * 2.0,
                paddingVertical: Sizes.fixPadding * 2.0,
            }}>
                Profile
            </Text>
        )
    }
}

const styles = StyleSheet.create({
    userInfoWrapStyle: {
        flexDirection: 'row',
        marginHorizontal: Sizes.fixPadding * 2.0,
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: Sizes.fixPadding * 2.0
    },
    userInfoStyle: {
        height: 80.0,
        justifyContent: 'space-between',
        paddingVertical: Sizes.fixPadding,
        marginLeft: Sizes.fixPadding
    },
    logOutInfoWrapStyle: {
        backgroundColor: Colors.whiteColor,
        marginHorizontal: Sizes.fixPadding,
        borderRadius: Sizes.fixPadding - 5.0,
        paddingVertical: Sizes.fixPadding + 7.0,
        flexDirection: 'row',
        marginVertical: Sizes.fixPadding,
        paddingLeft: Sizes.fixPadding * 2.0,
        paddingRight: Sizes.fixPadding,
        alignItems: 'center',
        justifyContent: 'space-between',
        borderColor: '#F1F1F1',
        borderWidth: 2.0,
    },
    settingInfoWrapStyle: {
        backgroundColor: Colors.whiteColor,
        borderRadius: Sizes.fixPadding - 5.0,
        margin: Sizes.fixPadding,
        paddingLeft: Sizes.fixPadding * 2.0,
        paddingRight: Sizes.fixPadding,
        paddingVertical: Sizes.fixPadding,
        borderColor: '#F1F1F1',
        borderWidth: 2.0,
    },
    settingStyle: {
        flexDirection: 'row',
        marginVertical: Sizes.fixPadding - 1.0,
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    dialogContainerStyle: {
        borderRadius: Sizes.fixPadding,
        width: width - 90,
        alignSelf: 'center',
        paddingHorizontal: Sizes.fixPadding * 3.0,
        paddingBottom: Sizes.fixPadding * 2.0,
        backgroundColor: Colors.whiteColor
    },
    cancelButtonStyle: {
        flex: 0.50,
        backgroundColor: '#E0E0E0',
        borderRadius: Sizes.fixPadding - 5.0,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: Sizes.fixPadding,
        marginRight: Sizes.fixPadding + 5.0,
    },
    logOutButtonStyle: {
        flex: 0.50,
        backgroundColor: Colors.primaryColor,
        borderRadius: Sizes.fixPadding - 5.0,
        paddingVertical: Sizes.fixPadding,
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: Sizes.fixPadding + 5.0
    },
    cancelAndLogoutButtonWrapStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: Sizes.fixPadding * 2.0
    }
})

function mapStateToProps( state ) {
    return { 
     
  
    };
  }
  
  export default connect(mapStateToProps, actions)(profileScreen);
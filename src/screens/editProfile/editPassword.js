import React, { Component } from "react";
import { Text, View, StatusBar, Image, TouchableOpacity, Dimensions, TextInput, SafeAreaView, StyleSheet,ActivityIndicator } from "react-native";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Feather from 'react-native-vector-icons/Feather'
import { Fonts, Colors, Sizes } from "../../constant/styles";
import { Dialog } from "react-native-paper";
import { BottomSheet } from '@rneui/themed';
import ImagePicker from 'react-native-image-crop-picker';
import { connect } from 'react-redux';
import * as actions from '../../redux/actions';
import IntlPhoneInput from 'react-native-intl-phone-input';

const { width } = Dimensions.get("screen");

class EditPassword extends Component {
sendpassword = () =>{
    let password = this.props.password
    let cpassword = this.props.confirmpwd
    let old = this.props.oldpassword
   if(password === cpassword){
    this.props.editpassword(password,old)
   }else{
    alert('Your new password and confirmation passwords do not match.')
   }
  
}



  backArrowAndSave=() =>{
        return (
            <View style={styles.backArrowAndSaveContainerStyle}>
                <Ionicons name="arrow-back-outline" size={24} color="black"
                    onPress={() => this.props.navigation.goBack()}
                />

               
            </View>
        )
    }

   


render(){
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#F4F4F4' }}>
            <StatusBar backgroundColor={Colors.primaryColor} />
            <View style={{ flex: 1 }}>
                <View style={{
                    backgroundColor: 'white', alignItems: 'center',
                }}>
                     <View style={{ borderBottomColor: 'gray', borderBottomWidth: 0.50, width: '60%' }}>
                    <Text style={{ ...Fonts.blackColor17Medium, marginLeft: Sizes.fixPadding }}>
                            Old Password
                        </Text>
                        <TextInput
                             value={this.props.oldpassword}
                             onChangeText={(text) => this.props.oldpasswordChanged(text)}
                            selectionColor={Colors.primaryColor}
                            style={{ ...Fonts.blackColor19Regular, paddingBottom: Sizes.fixPadding }}
                        />
                    </View>
                    <View style={{ borderBottomColor: 'gray', borderBottomWidth: 0.50, width: '60%' }}>
                    <Text style={{ ...Fonts.blackColor17Medium, marginLeft: Sizes.fixPadding }}>
                            New Password
                        </Text>
                        <TextInput
                             value={this.props.password}
                             onChangeText={(text) => this.props.passwordChanged(text)}
                            selectionColor={Colors.primaryColor}
                            style={{ ...Fonts.blackColor19Regular, paddingBottom: Sizes.fixPadding }}
                        />
                    </View>
                    <View style={{ borderBottomColor: 'gray', borderBottomWidth: 0.50, width: '60%' }}>
                    <Text style={{ ...Fonts.blackColor17Medium, marginLeft: Sizes.fixPadding }}>
                            Confirm Password
                        </Text>
                        <TextInput
                           value={this.props.confirmpwd}
                           onChangeText={(text) => this.props.cpasswordChanged(text)}
                            selectionColor={Colors.primaryColor}
                            style={{ ...Fonts.blackColor19Regular, paddingBottom: Sizes.fixPadding }}
                        />
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: Sizes.fixPadding * 2.0 }}>
                        <TouchableOpacity activeOpacity={0.9} 
                        onPress={()=>this.sendpassword()}
                            style={styles.okButtonStyle}
                        >
                             {this.props.loader === true ? <ActivityIndicator size="large" color="#00ff00" /> :  <Text style={{ ...Fonts.whiteColor19Regular }}>Edit Password</Text>}
                           
                        </TouchableOpacity>
                    </View>



                </View>
               
            </View>
        </SafeAreaView>
    )
            }
}

function mapStateToProps( state ) {
    return { 
        confirmpwd:state.auth.confirmpwd,
        email:state.auth.email,
        password:state.auth.password,
        oldpassword:state.auth.oldpassword,
        loader:state.auth.regloader,
    };
  }
  
  export default connect(mapStateToProps, actions)(EditPassword);

const styles = StyleSheet.create({
    backArrowAndSaveContainerStyle: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginLeft: Sizes.fixPadding * 2.0,
        marginRight: Sizes.fixPadding,
        marginTop: Sizes.fixPadding + 5.0
    },
    addPhotoContainerStyle: {
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: 'white',
        borderWidth: 1.0,
        backgroundColor: '#FF9800',
        height: 25.0, width: 25.0,
        borderRadius: Sizes.fixPadding + 2.0,
        position: 'absolute',
        bottom: 5.0,
        right: 5.0,
    },
    profilePhotoWrapStyle: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 50.0,
        marginBottom: Sizes.fixPadding * 3.0
    },
    formDataContainerStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
        borderRadius: Sizes.fixPadding - 5.0,
        height: 65.0,
        borderColor: '#F6F6F6',
        elevation: 1,
        marginHorizontal: Sizes.fixPadding,
        paddingHorizontal: Sizes.fixPadding * 2.0,
        marginTop: Sizes.fixPadding + 5.0,
        borderWidth: 1.0,
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.5,
        shadowRadius: Sizes.fixPadding,
    },
    dialogContainerStyle: {
        borderRadius: Sizes.fixPadding,
        width: width - 90,
        alignSelf: 'center',
        paddingHorizontal: Sizes.fixPadding * 2.0,
        paddingBottom: Sizes.fixPadding * 2.0,
        backgroundColor: Colors.whiteColor
    },
    cancelButtonStyle: {
        flex: 0.45,
        backgroundColor: '#E0E0E0',
        borderRadius: Sizes.fixPadding - 5.0,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: Sizes.fixPadding,
        marginRight: Sizes.fixPadding + 5.0,
    },
    okButtonStyle: {
        flex: 0.45,
        backgroundColor: Colors.primaryColor,
        borderRadius: Sizes.fixPadding - 5.0,
        paddingVertical: Sizes.fixPadding,
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: Sizes.fixPadding + 5.0
    },
    bottomSheetStyle: {
        backgroundColor: 'white',
        paddingHorizontal: Sizes.fixPadding * 2.0,
        paddingBottom: Sizes.fixPadding * 2.0,
        paddingTop: Sizes.fixPadding + 5.0,
    },
    profilePhotoStyle: {
        height: 100.0,
        width: 100.0,
        borderRadius: Sizes.fixPadding - 5.0,
        borderColor: Colors.whiteColor,
        borderWidth: 2.0,
    }
})


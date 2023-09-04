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

class EditProfileScreen extends Component {
sendphonenumber = () =>{
    let phone = this.props.phonenumber
    let phonenumber2 = this.props.phonenumbercode.replace("+", "")+phone
   let phone2 = phonenumber2.replace(" ", "")
   if(phone === ''){
    alert('Please input a phonenumber.')
    return
    // this.props.editphone(this.props.user.phone)
   }else{
    this.props.editphone(phone2)
   }
  
}
sendeditprofile = () =>{

    let email = this.props.email
    let name = this.props.name
    this.props.editprofile(email,name)
}
   openpicker=()=>{
        ImagePicker.openPicker({
            width: 300,
            height: 400,
            cropping: true
          }).then(selectedImage => {
            console.log(selectedImage);
            const uri = selectedImage.path
            let type = selectedImage.mime
            let ext = type.replace("image/",'');
       console.log(selectedImage,ext)
            this.props.sendimage(uri,type,ext)
          });
    }
 opencamera=()=>{
        ImagePicker.openCamera({
            width: 300,
            height: 400,
            cropping: true,
          }).then(image => {
            let path =  image.path
            this.props.sendimage(path)
            //console.log(image);
          });
    }
 



  backArrowAndSave=() =>{
        return (
            <View style={styles.backArrowAndSaveContainerStyle}>
                <Ionicons name="arrow-back-outline" size={24} color="black"
                    onPress={() => this.props.navigation.goBack()}
                />

                <TouchableOpacity activeOpacity={0.9} onPress={() => this.props.navigation.navigate('editPassword')}>
                    <Text style={{ ...Fonts.blueColor17Regular }}>
                        Edit Password
                    </Text>
                </TouchableOpacity>
            </View>
        )
    }

    profilePhoto=()=> {
        return (
            <View style={styles.profilePhotoWrapStyle}>
                <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                    <Image source={require('../../assets/images/user.png')}
                        style={styles.profilePhotoStyle}
                        resizeMode="cover"
                    />
                    {/* <TouchableOpacity
                        activeOpacity={0.9}
                        onPress={() => this.props.setIsBottomSheet()}
                        style={styles.addPhotoContainerStyle}>
                        <Ionicons name="add" size={20} color="white" />
                    </TouchableOpacity> */}
                </View>
            </View>
        )
    }



    showBottomSheet=()=> {
        return (
            <BottomSheet
                isVisible={this.props.isBottomSheet}
                containerStyle={{ backgroundColor: 'rgba(0.5, 0.50, 0, 0.50)' }}
                onBackdropPress={() => this.props.closeIsBottomSheet()}
            >
                <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={() => this.props.closeIsBottomSheet()}
                    style={styles.bottomSheetStyle}
                >

                    <Text style={{ ...Fonts.blackColor19Medium, textAlign: 'center', marginBottom: Sizes.fixPadding * 2.0 }}>
                        Choose Option
                    </Text>

                    <TouchableOpacity onPress={()=>this.opencamera()} style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Ionicons name="camera" size={20} color="#4C4C4C" />
                        <Text style={{ ...Fonts.blackColor17Medium, marginLeft: Sizes.fixPadding }}>
                            Camera
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={()=>this.openpicker()} style={{ flexDirection: 'row', marginTop: Sizes.fixPadding * 2.0 }}>
                        <MaterialIcons name="photo-album" size={20} color="#4C4C4C" />
                        <Text style={{ ...Fonts.blackColor17Medium, marginLeft: Sizes.fixPadding }}>
                            Upload from Gallery
                        </Text>
                    </TouchableOpacity>
                   {this.props.loader === true && <ActivityIndicator size="large" color="#00ff00" />} 
                </TouchableOpacity>
            </BottomSheet>
        )
    }
render(){
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#F4F4F4' }}>
            <StatusBar backgroundColor={Colors.primaryColor} />
            <View style={{ flex: 1 }}>
                {this.backArrowAndSave()}
                {this.profilePhoto()}
                <View style={{
                    backgroundColor: 'white', alignItems: 'center',
                }}>
                    <View style={{ borderBottomColor: 'gray', borderBottomWidth: 0.50, width: '60%' }}>
                    <Text style={{ ...Fonts.blackColor17Medium, marginLeft: Sizes.fixPadding }}>
                            Name
                        </Text>
                        <TextInput
                            value={this.props.name}
                            onChangeText={(value) => this.props.businessnamechanged(value)}
                            selectionColor={Colors.primaryColor}
                            style={{ ...Fonts.blackColor19Regular, paddingBottom: Sizes.fixPadding }}
                        />
                    </View>
                    <View style={{ borderBottomColor: 'gray', borderBottomWidth: 0.50, width: '60%' }}>
                    <Text style={{ ...Fonts.blackColor17Medium, marginLeft: Sizes.fixPadding }}>
                            Email
                        </Text>
                        <TextInput
                           value={this.props.email}
                            onChangeText={(value) => this.props.emailchanged(value)}
                            selectionColor={Colors.primaryColor}
                            style={{ ...Fonts.blackColor19Regular, paddingBottom: Sizes.fixPadding }}
                        />
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: Sizes.fixPadding * 2.0 }}>
                        <TouchableOpacity activeOpacity={0.9} 
                        onPress={()=>this.sendeditprofile()}
                            style={styles.okButtonStyle}
                        >
                             {this.props.loader === true ? <ActivityIndicator size="large" color="#00ff00" /> :  <Text style={{ ...Fonts.whiteColor19Regular }}>Edit Profile</Text>}
                           
                        </TouchableOpacity>
                    </View>



                    <View style={{ borderBottomColor: 'gray', borderBottomWidth: 0.50, width: '60%',margin:10 }}>
                    <Text style={{ ...Fonts.blackColor17Medium, marginLeft: Sizes.fixPadding }}>
                           Phone({this.props.user.phone})
                        </Text>
                        <IntlPhoneInput
                    onChangeText={({unmaskedPhoneNumber,phoneNumber,dialCode }) =>{
                      this.props.phonenumberchanged(phoneNumber,dialCode)
                  } }
                   
                    defaultCountry="UG"
                    containerStyle={styles.mobileNumberWrapStyle}
                    dialCodeTextStyle={{ ...Fonts.blackColor17Medium, marginLeft: Sizes.fixPadding - 5.0 }}
                    placeholder="Mobile Number"
                    phoneInputStyle={styles.mobileNumberFieldStyle}
                />
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: Sizes.fixPadding * 2.0 }}>
                        <TouchableOpacity activeOpacity={0.9} 
                        onPress={()=>this.sendphonenumber()}
                            style={styles.okButtonStyle}
                        >
                             {this.props.loader === true ? <ActivityIndicator size="large" color="#00ff00" /> :  <Text style={{ ...Fonts.whiteColor19Regular }}>Edit PhoneNumber</Text>}
                           
                        </TouchableOpacity>
                    </View>
                </View>
                {this.showBottomSheet()}
            </View>
        </SafeAreaView>
    )
            }
}

function mapStateToProps( state ) {
    return { 
     isBottomSheet:state.auth.bottomsheet,
  loader:state.auth.regloader,
  name:state.auth.businessname  || state.auth.user.name,
  phonenumber:state.auth.phonenumber,
  phonenumbercode:state.auth.phonenumbercode,
  email:state.auth.email || state.auth.user.email,
  user:state.auth.user
    };
  }
  
  export default connect(mapStateToProps, actions)(EditProfileScreen);

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


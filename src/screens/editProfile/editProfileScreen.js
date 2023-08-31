import React, { useState } from "react";
import { Text, View, StatusBar, Image, TouchableOpacity, Dimensions, TextInput, SafeAreaView, StyleSheet } from "react-native";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Feather from 'react-native-vector-icons/Feather'
import { Fonts, Colors, Sizes } from "../../constant/styles";
import { Dialog } from "react-native-paper";
import { BottomSheet } from '@rneui/themed';
import ImagePicker from 'react-native-image-crop-picker';

const { width } = Dimensions.get("screen");

const EditProfileScreen = ({ navigation }) => {

    const [fullNameDialog, setFullnameDialog] = useState(false);
    const [fullName, setFullName] = useState('Ellison Perry');
    const [changeText, setChangeText] = useState(fullName);

    const [passwordDialog, setPasswordDialog] = useState(false);
    const [password, setPassword] = useState('123456');
    const [changePassword, setChangePassword] = useState(password);

    const [phoneDialog, setPhoneDialog] = useState(false);
    const [phone, setPhone] = useState('123456789');
    const [changePhone, setChangePhone] = useState(phone);

    const [emialDialog, setEmailDialog] = useState(false);
    const [email, setEmail] = useState('test@abc.com');
    const [changeEmail, setChangeEmail] = useState(email);

    const [isBottomSheet, setIsBottomSheet] = useState(false);

    function backArrowAndSave() {
        return (
            <View style={styles.backArrowAndSaveContainerStyle}>
                <Ionicons name="arrow-back-outline" size={24} color="black"
                    onPress={() => navigation.pop()}
                />

                <TouchableOpacity activeOpacity={0.9} onPress={() => navigation.pop()}>
                    <Text style={{ ...Fonts.blueColor17Regular }}>
                        Save
                    </Text>
                </TouchableOpacity>
            </View>
        )
    }

    function profilePhoto() {
        return (
            <View style={styles.profilePhotoWrapStyle}>
                <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                    <Image source={require('../../assets/images/user.jpg')}
                        style={styles.profilePhotoStyle}
                        resizeMode="cover"
                    />
                    <TouchableOpacity
                        activeOpacity={0.9}
                        onPress={() => setIsBottomSheet(true)}
                        style={styles.addPhotoContainerStyle}>
                        <Ionicons name="ios-add" size={20} color="white" />
                    </TouchableOpacity>
                </View>
            </View>
        )
    }



    function showBottomSheet() {
        return (
            <BottomSheet
                isVisible={isBottomSheet}
                containerStyle={{ backgroundColor: 'rgba(0.5, 0.50, 0, 0.50)' }}
                onBackdropPress={() => setIsBottomSheet(false)}
            >
                <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={() => setIsBottomSheet(false)}
                    style={styles.bottomSheetStyle}
                >

                    <Text style={{ ...Fonts.blackColor19Medium, textAlign: 'center', marginBottom: Sizes.fixPadding * 2.0 }}>
                        Choose Option
                    </Text>

                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Ionicons name="ios-camera" size={20} color="#4C4C4C" />
                        <Text style={{ ...Fonts.blackColor17Medium, marginLeft: Sizes.fixPadding }}>
                            Camera
                        </Text>
                    </View>

                    <View style={{ flexDirection: 'row', marginTop: Sizes.fixPadding * 2.0 }}>
                        <MaterialIcons name="photo-album" size={20} color="#4C4C4C" />
                        <Text style={{ ...Fonts.blackColor17Medium, marginLeft: Sizes.fixPadding }}>
                            Upload from Gallery
                        </Text>
                    </View>

                </TouchableOpacity>
            </BottomSheet>
        )
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#F4F4F4' }}>
            <StatusBar backgroundColor={Colors.primaryColor} />
            <View style={{ flex: 1 }}>
                {backArrowAndSave()}
                {profilePhoto()}
                <View style={{
                    backgroundColor: 'white', alignItems: 'center',
                }}>
                    <View style={{ borderBottomColor: 'gray', borderBottomWidth: 0.50, width: '60%' }}>
                    <Text style={{ ...Fonts.blackColor17Medium, marginLeft: Sizes.fixPadding }}>
                            Name
                        </Text>
                        <TextInput
                            value={changeText}
                            onChangeText={(value) => setChangeText(value)}
                            selectionColor={Colors.primaryColor}
                            style={{ ...Fonts.blackColor19Regular, paddingBottom: Sizes.fixPadding }}
                        />
                    </View>
                    <View style={{ borderBottomColor: 'gray', borderBottomWidth: 0.50, width: '60%' }}>
                    <Text style={{ ...Fonts.blackColor17Medium, marginLeft: Sizes.fixPadding }}>
                            Email
                        </Text>
                        <TextInput
                            value={changeText}
                            onChangeText={(value) => setChangeText(value)}
                            selectionColor={Colors.primaryColor}
                            style={{ ...Fonts.blackColor19Regular, paddingBottom: Sizes.fixPadding }}
                        />
                    </View>
                    <View style={{ borderBottomColor: 'gray', borderBottomWidth: 0.50, width: '60%',margin:10 }}>
                    <Text style={{ ...Fonts.blackColor17Medium, marginLeft: Sizes.fixPadding }}>
                           Phone
                        </Text>
                        <TextInput
                            value={changeText}
                            onChangeText={(value) => setChangeText(value)}
                            selectionColor={Colors.primaryColor}
                            style={{ ...Fonts.blackColor19Regular, paddingBottom: Sizes.fixPadding }}
                        />
                    </View>
                    <View style={{ borderBottomColor: 'gray', borderBottomWidth: 0.50, width: '60%' }}>
                    <Text style={{ ...Fonts.blackColor17Medium, marginLeft: Sizes.fixPadding }}>
                            Address
                        </Text>
                        <TextInput
                            value={changeText}
                            onChangeText={(value) => setChangeText(value)}
                            selectionColor={Colors.primaryColor}
                            style={{ ...Fonts.blackColor19Regular, paddingBottom: Sizes.fixPadding }}
                        />
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: Sizes.fixPadding * 2.0 }}>
                        <TouchableOpacity activeOpacity={0.9} onPress={() => {
                            setEmailDialog(false)
                            setEmail(changeEmail)
                        }
                        }
                            style={styles.okButtonStyle}
                        >
                            <Text style={{ ...Fonts.whiteColor19Regular }}>Edit Profile</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                {showBottomSheet()}
            </View>
        </SafeAreaView>
    )
}

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

export default EditProfileScreen;
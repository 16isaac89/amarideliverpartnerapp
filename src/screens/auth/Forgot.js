import React, { Component } from "react";
import {
    Text,
    View,
    SafeAreaView,
    StatusBar,
    StyleSheet,
    TouchableOpacity,
    ActivityIndicator
} from "react-native";
import { Colors, Sizes, Fonts } from "../../constant/styles";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import IntlPhoneInput from 'react-native-intl-phone-input';
import InputField from '../../components/InputField';
import Fontisto from 'react-native-vector-icons/Fontisto'
import { connect } from 'react-redux';
import * as actions from '../../redux/actions';
import { Flow } from 'react-native-animated-spinkit'

class Forgot extends Component {
    sendemailaddress = () => {
        let email = this.props.email
    
        if(email === ""){
          alert('Please input email address.')
        }else{
        this.props.forgotpassword(email)
        }
      };
    
render(){
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
            <StatusBar backgroundColor={Colors.primaryColor} />
            <View style={{ flex: 1 }}>
                {this.createAccountInfo()}
                {this.mobileNumberInfo()}
                {this.continueButton()}
            </View>
        </SafeAreaView>
    )
}

     continueButton=()=> {
        
            if(this.props.regloader === true) {
                <Flow size={68} color="gold" style={{ alignSelf:'center' }}/>
            }else{
            return <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => {
                   this.sendemailaddress()
                }}
                style={{
                    backgroundColor: this.props.email.length >= 1 ? Colors.primaryColor : Colors.grayColor,
                    ...styles.continueButtonStyle,
                }}>
                    {this.props.loader === true ? <ActivityIndicator size="large" color="#00ff00" /> :   <Text style={{ ...Fonts.whiteColor19Regular }}>
                    Continue
                </Text>}
                           
               
            </TouchableOpacity>
            }
            
        
    }

    mobileNumberInfo=()=> {
        return (
            <View>
            <View style={{ marginHorizontal: Sizes.fixPadding * 2.0, marginTop: Sizes.fixPadding * 4.0 }}>
                {/* <Text style={{ ...Fonts.grayColor17Medium }}>
                    Email
                </Text> */}
            <InputField
            label={'Email'}
            icon={
              <Fontisto
              name="email"
              size={20}
              color="#666"
              style={{marginRight: 5}}
            />
            }
            inputType="email"
           
            fieldButtonFunction={() => {}}
            value={this.props.email}
            onChangeText={(text) => this.props.emailchanged(text)}
          />
          </View>
          </View>
        )
    }

    createAccountInfo=()=> {
        return (
            <View style={{
                marginHorizontal: Sizes.fixPadding * 2.0,
                marginTop: Sizes.fixPadding,
                marginBottom: Sizes.fixPadding + 5.0,
            }}>
                <Text style={{ ...Fonts.blackColor22Medium }}>
                    Enter your email address.
                </Text>
                <Text style={{ ...Fonts.grayColor16Medium }}>
                    Enter your email address and we shall send your a change password email to the provided email.
                </Text>
            </View>
        )
    }

    backArrow=()=> {
        return (
            <MaterialIcons name="arrow-back" size={24} color="black"
                style={{ margin: Sizes.fixPadding * 2.0 }}
                onPress={() => navigation.goBack()}
            />
        )
    }
}

const styles = StyleSheet.create({
    mobileNumberWrapStyle: {
        height: 55.0,
        marginTop: Sizes.fixPadding,
    },
    continueButtonStyle: {
        height: 55.0,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: Sizes.fixPadding * 2.0,
        borderRadius: Sizes.fixPadding * 2.5,
        position: 'absolute',
        bottom: 20.0,
        left: 0.0,
        right: 0.0
    },
    mobileNumberFieldStyle: {
        flex: 1,
        borderBottomWidth: 1.0,
        borderBottomColor: Colors.primaryColor,
        marginLeft: Sizes.fixPadding + 15.0,
        ...Fonts.blackColor17Medium,
    }
})

function mapStateToProps( state ) {
    return { 
      businessname:state.auth.businessname,
      confirmpwd:state.auth.confirmpwd,
      email:state.auth.email,
      password:state.auth.password,
      phonenumber:state.auth.phonenumber,
      phonenumbercode:state.auth.phonenumbercode,
      loader:state.auth.regloader
  
    };
  }
  
  export default connect(mapStateToProps, actions)(Forgot);
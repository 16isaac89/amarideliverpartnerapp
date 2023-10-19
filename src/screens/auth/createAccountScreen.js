import React, { Component } from "react";
import {
    Text,
    View,
    SafeAreaView,
    StatusBar,
    StyleSheet,
    TouchableOpacity,
    KeyboardAvoidingView,
} from "react-native";
import { Colors, Sizes, Fonts } from "../../constant/styles";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import IntlPhoneInput from 'react-native-intl-phone-input';
import InputField from '../../components/InputField';
import Ionicons from 'react-native-vector-icons/Ionicons'
import { connect } from 'react-redux';
import * as actions from '../../redux/actions';
import { Flow } from 'react-native-animated-spinkit'

class CreateAccountScreen extends Component {
    loginuser = () => {
        let phone = this.props.phonenumber
        let phonenumber2 = this.props.phonenumbercode.replace("+", "")+phone
        let phone2 = phonenumber2.replace(" ", "")
        let password = this.props.password
    
        if(password === ""){
          alert('Please input password.')
        }else if(this.props.phonenumber === ''){
    alert('Add your phone number.')
        }else{
          //console.log(phone,email,name,password)
        this.props.loginuser(phone2,password)
        }
      };
    
render(){
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
            <StatusBar backgroundColor={Colors.primaryColor} />
            <View style={{ flex: 1 }}>
                {this.backArrow()}
                {this.createAccountInfo()}
                {this.mobileNumberInfo()}
                {this.continueButton()}
            </View>
        </SafeAreaView>
    )
}

     continueButton=()=> {
        
            if(this.props.regloader === true) {
                return <Flow size={68} color="green" style={{ alignSelf:'center' }}/>
            }else{
            return <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => {
                   this.loginuser()
                }}
                style={{
                    backgroundColor: this.props.phonenumber.length >= 1 ? Colors.primaryColor : Colors.grayColor,
                    ...styles.continueButtonStyle,
                }}>
                <Text style={{ ...Fonts.whiteColor19Regular }}>
                    Continue
                </Text>
            </TouchableOpacity>
            }
            
        
    }

    mobileNumberInfo=()=> {
        return (
            <View>
            <View style={{ marginHorizontal: Sizes.fixPadding * 2.0, marginTop: Sizes.fixPadding * 4.0 }}>
                <Text style={{ ...Fonts.grayColor17Medium }}>
                    Mobile Number
                </Text>
                <IntlPhoneInput
                     onChangeText={({unmaskedPhoneNumber,phoneNumber,dialCode }) =>{
                        this.props.phonenumberchanged(phoneNumber,dialCode)
                    }}
                    defaultCountry="UG"
                    containerStyle={styles.mobileNumberWrapStyle}
                    dialCodeTextStyle={{ ...Fonts.blackColor17Medium, marginLeft: Sizes.fixPadding - 5.0 }}
                    placeholder="Mobile Number"
                    phoneInputStyle={styles.mobileNumberFieldStyle}
                />
            </View>
            <KeyboardAvoidingView style={{ marginHorizontal: Sizes.fixPadding * 2.0, marginTop: Sizes.fixPadding * 2.0 }}>
            <Text style={{ ...Fonts.grayColor17Medium }}>
                    Password
                </Text>
            <InputField
            label={'Password'}
            icon={
              <Ionicons
              name="lock-open"
              size={20}
              color="#666"
              style={{marginRight: 5}}
            />
            }
            inputType="password"
            secureTextEntry={this.props.viewplaintext}
            fieldButtonLabel={this.props.viewplaintext == true ? <Ionicons name="eye-off" size={25} color={'black'}/> :<Ionicons name="eye" size={25} color={'black'}/>}
            fieldButtonFunction={() => {
                if(this.props.viewplaintext == true){
                     this.props.plaintext(false)
                }else{
                    this.props.plaintext(true)
                }

            }}
            value={this.props.password}
            onChangeText={(text) => this.props.passwordChanged(text)}
          />
          </KeyboardAvoidingView>
            <View style={{ marginHorizontal: Sizes.fixPadding * 2.0, marginTop: Sizes.fixPadding * 4.0 }}>
            
          <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            marginBottom: 30,
          }}>
          <Text>Forgot Password ?</Text>
          <TouchableOpacity onPress={() => this.props.navigation.navigate('Forgot')}>
            <Text style={{color: '#D7BE69', fontWeight: '700'}}> Forgot</Text>
          </TouchableOpacity>
        </View>

<View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            marginBottom: 30,
          }}>
          <Text>New to the app?</Text>
          <TouchableOpacity onPress={() => this.props.navigation.navigate('RegisterScreen')}>
            <Text style={{color: '#D7BE69', fontWeight: '700'}}> Register</Text>
          </TouchableOpacity>
        </View>
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
                    Enter your mobile number and Password.
                </Text>
                <Text style={{ ...Fonts.grayColor16Medium }}>
                    Login to your account with your mobile number and password.
                </Text>
            </View>
        )
    }

    backArrow=()=> {
        return (
            <MaterialIcons name="arrow-back" size={24} color="black"
                style={{ margin: Sizes.fixPadding * 2.0 }}
                onPress={() => this.props.navigation.goBack()}
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
      regloader:state.auth.regloader,
      viewplaintext:state.auth.viewplaintext
  
    };
  }
  
  export default connect(mapStateToProps, actions)(CreateAccountScreen);
import React, {Component} from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet
} from 'react-native';

import DatePicker from 'react-native-date-picker';

import InputField from '../../components/InputField';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Colors, Sizes, Fonts } from "../../constant/styles";
import { connect } from 'react-redux';
import * as actions from '../../redux/actions';
import IntlPhoneInput from 'react-native-intl-phone-input';
import { Flow } from 'react-native-animated-spinkit'

class RegisterScreen extends Component {
  validateemail = (text) => {
    console.log(text);
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    if (reg.test(text) === false) {
      console.log("Email is Not Correct");
      this.setState({ email: text })
      return false;
    }
    else {
      return true;
    }
  }
  componentDidUpdate(){
    console.log(this.props.phonenumber)
  }
  
  registeruser = () => {
    let phone = this.props.phonenumber
    let phonenumber2 = this.props.phonenumbercode.replace("+", "")+phone
    let phone2 = phonenumber2.replace(" ", "")
    
    let email = this.props.email
    let name = this.props.businessname
    let password = this.props.password
    let confirmpwd = this.props.confirmpwd

    if(password !== confirmpwd){
      alert('Your passwords do not match please verify.')
    }else if(email === ''){
alert('Make sure your email address is valid.')
    }else if(name === ''){
      alert('Business name is required.')
    }else{
      //console.log(phone,email,name,password)
    this.props.registeruser(phone2,name,email,password)
    }
  };

render(){
  let phone = this.props.phonenumber
  let phonenumber2 = this.props.phonenumbercode.replace("+", "")+phone
  return (
    <SafeAreaView style={{flex: 1, justifyContent: 'center'}}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{paddingHorizontal: 25}}>
        <View style={{alignItems: 'center'}}>
          

        </View>

        <Text
          style={{
            fontFamily: 'Roboto-Medium',
            fontSize: 28,
            fontWeight: '500',
            color: '#333',
            marginBottom: 30,
          }}>
          Register
        </Text>
      
                <Text style={{ ...Fonts.grayColor17Medium }}>
                    Mobile Number
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
           
        <InputField
          label={'Business Name'}
          icon={
            <Ionicons
              name="business-sharp"
              size={20}
              color="#666"
              style={{marginRight: 5}}
            />
          }
          value={this.props.businessname}
          onChangeText={(text) => this.props.businessnamechanged(text)}
        />


        <InputField
          label={'Email ID'}
          icon={
            <MaterialIcons
              name="alternate-email"
              size={20}
              color="#666"
              style={{marginRight: 5}}
            />
          }
          keyboardType="email-address"
          value={this.props.email}
          onChangeText={(text) => this.props.emailchanged(text)}
        />

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
          value={this.props.password}
          onChangeText={(text) => this.props.passwordChanged(text)}
        />

        <InputField
          label={'Confirm Password'}
          icon={
            <Ionicons
              name="lock-open"
              size={20}
              color="#666"
              style={{marginRight: 5}}
            />
          }
          inputType="password"
          value={this.props.confirmpassword}
          onChangeText={(text) => this.props.cpasswordChanged(text)}
        />



        
<View style={{ marginTop:70,alignContent:'center',alignContent:'center',justifyContent:'center' }}>
  {this.props.regloader === true ?
<Flow size={68} color="gold" style={{ alignSelf:'center' }}/>
:
<TouchableOpacity
                activeOpacity={0.9}
                onPress={() => this.registeruser()}
                style={{
                    backgroundColor: phonenumber2.length >= 1 ? Colors.primaryColor : Colors.grayColor,
                    ...styles.continueButtonStyle,
                    marginTop:100
                }}
                >
                <Text style={{ ...Fonts.whiteColor19Regular }}>
                    Continue
                </Text>
            </TouchableOpacity>
}
            </View>
        
      </ScrollView>
      <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            marginBottom: 30,
          }}>
          <Text>Already registered?</Text>
          <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
            <Text style={{color: '#D7BE69', fontWeight: '700'}}>Login</Text>
          </TouchableOpacity>
        </View>
    </SafeAreaView>
  );
        }
};

function mapStateToProps( state ) {
  return { 
    businessname:state.auth.businessname,
    confirmpwd:state.auth.confirmpwd,
    email:state.auth.email,
    password:state.auth.password,
    phonenumber:state.auth.phonenumber,
    phonenumbercode:state.auth.phonenumbercode,
    regloader:state.auth.regloader

  };
}

export default connect(mapStateToProps, actions)(RegisterScreen);

const styles = StyleSheet.create({
  mobileNumberWrapStyle: {
      height: 50.0,
      marginTop: Sizes.fixPadding,
      marginBottom:20
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
import React, { Component, useState } from "react";
import { Text, View, StyleSheet, SafeAreaView, StatusBar, ScrollView, Image, Dimensions, TouchableOpacity,FlatList } from "react-native";
import { Colors, Fonts, Sizes } from "../../constant/styles";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { Dialog } from "react-native-paper";
import { connect } from 'react-redux';
import * as actions from '../../redux/actions';
import { Flow } from 'react-native-animated-spinkit'
import Payment from '../../components/modals/Payment'

const { width } = Dimensions.get('screen');

class PackageInfoThree extends Component {
    saveorder = () =>{
        let from = this.props.pickaddress
        let to  = this.props.dropaddress
        let details  = this.props.description
        let distance  = this.props.distance
        let category = this.props.selectedvehicleid
        let quantity = this.props.quantity
        let navigation = this.props.navigation
        let recipientphone = this.props.recipientphone
        let recipientname = this.props.recipientname
        let id = this.props.user.id
        this.props.placeorder(from,to,quantity,details,distance,category,navigation,recipientname,recipientphone,id)
    }
    componentDidMount(){
        let from = this.props.pickaddress
        let to = this.props.dropaddress
        this.props.getvehicles(from,to)
    }
    componentDidUpdate(){
        console.log("this.props.vehicles")
        console.log(this.props.vehicles)
    }
    
render(){
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
            <Payment navigation={this.props.navigation}/>
            <StatusBar backgroundColor={Colors.primaryColor} />
            <View style={{ flex: 1 }}>
                
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingBottom: Sizes.fixPadding * 8.0 }}
                >
                     <SafeAreaView style={{ flex:1 }}>
      <FlatList
        data={this.props.vehicles}
        renderItem={({item})=>this.paymentMethod(item)}
        keyExtractor={item => item.id}
      />
    </SafeAreaView>
                    {/* {
                    
                    this.paymentMethod({
                        icon: require('../../assets/images/payment_icon/cash_on_delivery.png'),
                        paymentType: 'Pay on Delivery',
                        index: 1,
                        amount:2000
                    })
                    
                    
                    } */}
                    
                </ScrollView>
                {this.payButton()}
            </View>
            {this.successDialog()}
        </SafeAreaView>
    )
                }

   successDialog=()=> {
        return (
            <Dialog
                visible={this.props.loader}
                style={styles.dialogWrapStyle}
            >
                <View style={{ backgroundColor: Colors.whiteColor, alignItems: 'center' }}>
                    <View style={styles.successIconWrapStyle}>
                    <Flow size={48} color="#FFF" />
                    </View>
                    <Text style={{ ...Fonts.grayColor16Medium, marginTop: Sizes.fixPadding + 10.0 }}>
                        Please Wait
                    </Text>
                </View>
            </Dialog>
        )
    }

    payButton=() =>{
        return (
            <View style={styles.payButtonOuterWrapStyle}>
                <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={() => {
                        this.saveorder()
                    }
                    }
                    style={styles.payButtonWrapStyle}>
                    <Text style={{ ...Fonts.whiteColor22Regular }}>
                        PLACE ORDER                   
                        </Text>
                </TouchableOpacity>
            </View>
        )
    }

    

    paymentMethod=(item)=> {
        return (
            <TouchableOpacity
                activeOpacity={0.9}
                onPress={()=>this.props.selectvehicle(item)}
                style={{
                    borderColor: this.props.selectedvehicleid == item.id ? Colors.primaryColor : '#E0E0E0',
                    ...styles.paymentMethodWrapStyle
                }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Image
                        source={{ uri:item.vehicle_category.pic?.url }}
                        style={{
                            width: 55.0,
                            height: 55.0,
                        }}
                        resizeMode="contain"
                    />
                    <View style={{ flexDirection:'column' }}>
                    <Text numberOfLines={1} style={{
                        ...Fonts.primaryColor17Medium,
                        marginLeft: Sizes.fixPadding,
                        width: width / 2.2,
                    }}>
                        {item.vehicle_category.name}
                    </Text>
                    <Text numberOfLines={1} style={{
                        ...Fonts.primaryColor17Medium,
                        marginLeft: Sizes.fixPadding,
                        width: width / 2.2,
                    }}>
                        {item.price}UGX
                    </Text>
                    </View>
                </View>
                <View style={{
                    borderColor: this.props.selectedvehicleid == item.id ? Colors.primaryColor : '#E0E0E0',
                    ...styles.radioButtonStyle
                }}>
                     {
                        this.props.selectedvehicleid == item.id ?
                            <View style={{
                                width: 12.0,
                                height: 12.0,
                                borderRadius: 6.0,
                                backgroundColor: Colors.primaryColor
                            }}>
                            </View> : null
                    } 
                </View>
            </TouchableOpacity>
        )
    }

   
}

const styles = StyleSheet.create({
    headerWrapStyle: {
        backgroundColor: Colors.whiteColor,
        alignItems: 'center',
        flexDirection: 'row',
        height: 60.0,
        marginHorizontal: Sizes.fixPadding * 2.0
    },
    paymentMethodWrapStyle: {
        backgroundColor: Colors.whiteColor,
        borderRadius: Sizes.fixPadding,
        borderWidth: 1.0,
        marginHorizontal: Sizes.fixPadding * 2.0,
        paddingHorizontal: Sizes.fixPadding * 2.0,
        paddingVertical: Sizes.fixPadding * 2.0,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginVertical: Sizes.fixPadding,
    },
    radioButtonStyle: {
        width: 20.0,
        height: 20.0,
        borderRadius: 10.0,
        borderWidth: 1.0,
        backgroundColor: Colors.whiteColor,
        alignItems: 'center',
        justifyContent: 'center'
    },
    payButtonOuterWrapStyle: {
        position: 'absolute',
        bottom: 0.0,
        left: 0.0,
        right: 0.0,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.whiteColor,
        borderTopColor: '#ECECEC',
        borderTopWidth: 1.0,
        height: 75.0,
        paddingHorizontal: Sizes.fixPadding * 2.0
    },
    payButtonWrapStyle: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.primaryColor,
        borderRadius: Sizes.fixPadding - 5.0,
        height: 55.0,
        width: '100%',
    },
    dialogWrapStyle: {
        borderRadius: Sizes.fixPadding,
        width: width - 100,
        backgroundColor: Colors.whiteColor,
        paddingHorizontal: Sizes.fixPadding * 2.0,
        paddingVertical: Sizes.fixPadding * 3.,
        alignSelf: 'center',
    },
    successIconWrapStyle: {
        backgroundColor: Colors.whiteColor,
        borderColor: Colors.primaryColor,
        borderWidth: 1.0,
        width: 70.0,
        height: 70.0,
        borderRadius: 35.0,
        alignItems: 'center',
        justifyContent: 'center',
    },
    payableAmountWrapStyle: {
        backgroundColor: '#F8F3EC',
        paddingVertical: Sizes.fixPadding + 5.0,
        paddingHorizontal: Sizes.fixPadding * 2.0,
        marginBottom: Sizes.fixPadding
    }
})


function mapStateToProps( state ) {
    return { 
      loader:state.order.loader,
      isloggedin:state.auth.loggedin,
      internetstate:state.auth.internetstate,
      oldversion:state.auth.oldversion,
      newversion:state.auth.newversion,
      pickaddress:state.order.pickaddress,
      dropaddress:state.order.dropaddress,
      vehicles:state.order.vehicles,
      selectedvehicle:state.order.selectedvehicle,
      selectedvehicleid:state.order.selectedvehicleid,
      description:state.order.description,
      quantity:state.order.quantity,
     distance:state.order.distance,
     recipientphone:state.order.recipientphone,
     recipientname:state.order.recipientname,
     user:state.auth.user
    };
  }
  
  export default connect(mapStateToProps, actions)(PackageInfoThree);

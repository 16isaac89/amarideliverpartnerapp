import React, { Component} from "react";
import { SafeAreaView, StatusBar, View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, Dimensions } from "react-native";
import { Colors, Fonts, Sizes } from "../../constant/styles";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { connect } from 'react-redux';
import * as actions from '../../redux/actions';
import { FlatList } from "react-native-gesture-handler";
import { Flow } from 'react-native-animated-spinkit'
import { Dialog } from "react-native-paper";

const { width } = Dimensions.get('screen');

class OrdersScreen extends Component {
componentDidMount(){
let id = this.props.user.id
this.props.getorders(id)
}
    render(){
    return (
        <SafeAreaView style={{ flex: 1 }}>
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
            <StatusBar backgroundColor={Colors.primaryColor} />
            <View style={{ flex: 1 }}>
           
                {this.header()}
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingBottom: Sizes.fixPadding * 6.0 }}
                >
                    <FlatList
                    data={this.props.orders}
                    renderItem={({item})=>this.activeOrders(item)}
                    keyExtractor={item=>item.id.toString()}
                    
                    />

                </ScrollView>
            </View>
        </SafeAreaView>
    )
    }

    orderstatus = (status) =>{
        
        if(status === 'completed'){
            return(
<View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <View style={styles.completedIconWrapStyle}>
                            <MaterialIcons name="done" size={16} color={Colors.whiteColor} />
                        </View>
                        <Text style={{ ...Fonts.blackColor17Medium, marginLeft: Sizes.fixPadding }}>
                            Completed
                        </Text>
                    </View>

                    <View style={styles.reorderButtonStyle}>
                        <Text style={{ ...Fonts.whiteColor19Regular }}>
                            Reorder
                        </Text>
                    </View>
                </View>
            )
        }else if(status === 'canceled'){
 return(
    <View style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <View style={styles.completedIconWrapStyle}>
                <MaterialIcons name="done" size={16} color={Colors.whiteColor} />
            </View>
            <Text style={{ ...Fonts.blackColor17Medium, marginLeft: Sizes.fixPadding }}>
                Completed
            </Text>
        </View>

        <View style={styles.reorderButtonStyle}>
            <Text style={{ ...Fonts.whiteColor19Regular }}>
                Reorder
            </Text>
        </View>
    </View> 
            )
        }else{
            return(
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <View style={styles.orderInProgressIconOuterWrapStyle}>
                            <View style={styles.orderInProgressIconInnerWrapStyle}>
                                <View style={styles.orderInProgressIconStyle}>
                                </View>
                            </View>
                        </View>
                        <Text style={{
                            ...Fonts.blackColor17Medium,
                            width: width / 2.9,
                            marginLeft: Sizes.fixPadding
                        }}>
                            Order in progress
                        </Text>
                    </View>
                )
        }
        
    }

    activeOrders=(item)=> {
        return (
            <View style={{ margin: Sizes.fixPadding * 2.0, }}>

                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Image
                            source={require('../../assets/images/icons/courier.png')}
                            style={{
                                height: 50.0,
                                width: 50.0,
                            }}
                            resizeMode="cover"
                        />
                        <View style={{ marginLeft: Sizes.fixPadding }}>
                            <Text style={{ ...Fonts.blackColor20Medium }}>
                                Send package
                            </Text>
                            <Text style={{ ...Fonts.grayColor17Medium }}>
                                {item.created_at}
                            </Text>
                        </View>
                    </View>
                    <MaterialIcons name="arrow-forward-ios" size={20} color={Colors.grayColor} />
                </View>

                <View style={styles.homeOrWorkWrapStyle}>

                    <View style={{
                        width: width / 2.5,
                        flexDirection: 'row',
                        alignItems: 'center',
                    }}>
                        <View style={styles.homeOrWorkArrowIndicatorWrapStyle}>
                            <MaterialCommunityIcons name="arrow-up" size={25} color="black" />
                        </View>
                        <View style={{ marginLeft: Sizes.fixPadding }}>
                            <Text style={{ ...Fonts.blackColor17Medium }}>Home</Text>
                            <Text numberOfLines={1}
                                style={{
                                    ...Fonts.grayColor16Medium,
                                    lineHeight: 22.0,
                                    width: width / 3.4,
                                }}
                            >
                                {item.from}
                            </Text>
                        </View>
                    </View>

                    <View style={{
                        height: 40.0,
                        width: 1.0,
                        backgroundColor: Colors.grayColor,
                    }}>
                    </View>

                    <View style={{
                        width: width / 2.5,
                        flexDirection: 'row',
                        alignItems: 'center'
                    }}>
                        <View style={styles.homeOrWorkArrowIndicatorWrapStyle}>
                            <MaterialCommunityIcons name="arrow-down" size={25} color="black" />
                        </View>
                        <View style={{ marginLeft: Sizes.fixPadding }}>
                            <Text style={{ ...Fonts.blackColor17Medium }}>Work</Text>
                            <Text numberOfLines={1}
                                style={{
                                    ...Fonts.grayColor16Medium,
                                    lineHeight: 22.0,
                                    width: width / 3.4,
                                }}
                            >
                                {item.to}
                            </Text>
                        </View>
                    </View>

                </View>

                <Text style={{ ...Fonts.primaryColor19Medium, marginBottom: Sizes.fixPadding }}>
                    Fare: {item.money}
                </Text>

                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                }}>

                    {this.orderstatus(item.status)}
                    

                   { item.status !== 'canceled' && item.status !== 'completed' &&<TouchableOpacity
                        activeOpacity={0.9}
                        onPress={() => {
                            let navigation = this.props.navigation
                            this.props.trackingorder(item,navigation)
                        }
                        }
                        style={styles.trackOrderButtonStyle}>
                        <Text style={{ ...Fonts.whiteColor19Regular }}>
                            Track Order
                        </Text>
                    </TouchableOpacity>
    }
                </View>

            </View>
        )
    }

   

    header=()=> {
        return (
            <View style={styles.headerWrapStyle}>
                <Text style={{ ...Fonts.blackColor19Medium }}>
                    Orders
                </Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    headerWrapStyle: {
        flexDirection: 'row',
        backgroundColor: Colors.whiteColor,
        paddingHorizontal: Sizes.fixPadding * 2.0,
        height: 60.0,
        alignItems: 'center',
        elevation: 3.0,
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
    homeOrWorkArrowIndicatorWrapStyle: {
        width: 32.0,
        height: 32.0,
        borderRadius: 16.0,
        backgroundColor: Colors.whiteColor,
        borderColor: Colors.blackColor,
        borderWidth: 1.0,
        alignItems: 'center',
        justifyContent: 'center',
    },
    homeOrWorkWrapStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginVertical: Sizes.fixPadding + 10.0
    },
    orderInProgressIconOuterWrapStyle: {
        width: 34.0,
        height: 34.0,
        borderRadius: 17.0,
        backgroundColor: '#EADAC8',
        alignItems: 'center',
        justifyContent: 'center',
    },
    orderInProgressIconInnerWrapStyle: {
        height: 23.0,
        width: 23.0,
        borderRadius: 11.5,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.primaryColor,
    },
    orderInProgressIconStyle: {
        width: 12.0,
        height: 12.0,
        borderRadius: 6.0,
        backgroundColor: Colors.whiteColor,
    },
    trackOrderButtonStyle: {
        backgroundColor: Colors.primaryColor,
        borderRadius: Sizes.fixPadding * 2.5,
        paddingVertical: Sizes.fixPadding - 1.0,
        paddingHorizontal: Sizes.fixPadding * 2.5,
    },
    reorderButtonStyle: {
        backgroundColor: Colors.primaryColor,
        borderRadius: Sizes.fixPadding * 2.5,
        paddingVertical: Sizes.fixPadding - 1.0,
        paddingHorizontal: Sizes.fixPadding * 2.5,
    },
    completedIconWrapStyle: {
        width: 24.0,
        height: 24.0,
        borderRadius: 12.0,
        backgroundColor: Colors.primaryColor,
        alignItems: 'center',
        justifyContent: 'center'
    }
})

function mapStateToProps( state ) {
    return { 
    orders:state.order.orders,
    user:state.auth.user,
    loader:state.order.loader
    };
  }
  
export default connect(mapStateToProps, actions)(OrdersScreen);

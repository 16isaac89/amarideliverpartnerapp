import React, { Component } from "react";
import { Alert, Modal, StyleSheet, Text, Pressable, View,Dimensions } from "react-native";
import { WebView } from 'react-native-webview';
import { connect } from 'react-redux';
import * as actions from '../../redux/actions';

class Payment extends Component {
  
  orderpaymentstatus = (data) =>{
    var regexp = /[?&]([^=#]+)=([^&#]*)/g,params = {},check;
    while (check = regexp.exec(data.url)) {
      params[check[1]] = check[2];
    }
    let status = params.status
      console.log(params)
    //  return
    //if(Object.keys(params).length <= 0){
     if(status === "successful"){
      console.log('succ')
      let txid = params.tx_ref
      let id = this.props.user.id
      let navigation = this.props.navigation
      alert('Your order has been paid for successfully, please be patient as we assign you a delivery agent thank you for choosing AmariHitch.')
      this.props.closepaymentmodal(navigation)
      //this.props.refundsuccess(id,txid)
       
    }else if(status === "cancelled"){
      console.log('cancel')
      let txid = params.tx_ref
      let id = this.props.user.id
      let payingfor = this.props.payingfor
      let navigation = this.props.navigation
      
      this.props.cancelorder(txid,payingfor,navigation)
      //this.props.refundfailed(id,txid)
    }
  // }
  //   else{
  //     this.props.walletmodalclose()
  //   }
  }
  state = {
    modalVisible: false
  };
  ActivityIndicatorLoadingView() {
    return (
      <ActivityIndicator
         color="#009688"
         size="large"
         style={styles.ActivityIndicatorStyle}
      /> 
    );
 }

  setModalVisible = (visible) => {
    this.setState({ modalVisible: visible });
  }

  render() {
    const { modalVisible } = this.state;
    return (
     
        <Modal
          animationType="slide"
          transparent={true}
          visible={this.props.payment1modal}
          onRequestClose={() => {
       return
          }}
        >
          <View style={styles.centeredView}>
            
          <View style={styles.modalView}>
          <Text style={{ fontSize:20,fontWeight:'bold', }}>Payment</Text>
          <WebView 
          style = {{marginTop: 1, width: Dimensions.get('window').width, height: Dimensions.get('window').height}}
          automaticallyAdjustContentInsets={false}
         domStorageEnabled={true}
         javaScriptEnabled={true}
         onNavigationStateChange={(data) => {
          this.orderpaymentstatus(data)
        }}
         originWhitelist={['*']}
         ref={this.WEBVIEW_REF}
         source={{uri: this.props.paymentlink}}
         startInLoadingState={true}
         //style={styles.webViewContainer}
          
          />
          </View>
          </View>
        </Modal>
       
    );
  }
}

function mapStateToProps( state ) {
    return { 
     paymentlink:state.order.paymenturl,
    payment1modal:state.order.paymentmodal,
    user:state.auth.user,
    payingfor:state.order.payingfor
    };
  }
  
  export default connect(mapStateToProps, actions)(Payment);

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    width:"100%",
    height:"100%",
    bottom:1,
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  },
  ActivityIndicatorStyle: {
    flex: 1,
    justifyContent: 'center',
},
});


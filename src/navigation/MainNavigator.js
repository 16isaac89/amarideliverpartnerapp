import React,{Component} from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { TransitionPresets, createStackNavigator } from '@react-navigation/stack';
import { LogBox } from 'react-native';


// import LoadingScreen from "../components/loadingScreen";
import BottomTabBarScreen from "../components/bottomTabBarScreen";
import PackageInfoScreen from "../screens/packageInfo/packageInfoScreen";
import PaymentScreen from "../screens/payment/paymentScreen";
import RestaurantsScreen from "../screens/restaurants/restaurantsScreen";
import RestaurantDetailsScreen from "../screens/restaurantDetails/restaurantDetailsScreen";
import ConfirmOrderScreen from "../screens/confirmOrder/confirmOrderScreen";
import GroceryDetailScreen from "../screens/groceryDetail/groceryDetailScreen";
import InviteFriendsScreen from "../screens/inviteFriend/inviteFriendsScreen";
import ProfileScreen from "../screens/profile/profileScreen";
import EditProfileScreen from "../screens/editProfile/editProfileScreen";
import NotificationsScreen from "../screens/notifications/notificationsScreen";
import TrackOrderScreen from "../screens/trackOrder/trackOrderScreen";
import WelcomeScreen from "../screens/auth/welcomeScreen";
import CreateAccountScreen from "../screens/auth/createAccountScreen";
import VerificationScreen from "../screens/auth/verificationScreen";
import SplashScreen from "../screens/splashScreen";
import LoginScreen from '../screens/auth/LoginScreen';
import RegisterScreen from '../screens/auth/RegisterScreen';
import { connect } from 'react-redux';
import * as actions from '../redux/actions';
import PackageInfoOne from '../screens/packageInfo/PackageInfoOne';
import Autocomplete from '../components/geolocation/Autocomplete';
import MapPicker from '../components/map/MapPicker';
import PackageInfoTwo from '../screens/packageInfo/PackageInfoTwo';
import PackageInfoThree from '../screens/packageInfo/PackageInfoThree'

LogBox.ignoreAllLogs();

const Stack = createStackNavigator();

class MainNavigator extends Component {
  render(){
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          ...TransitionPresets.SlideFromRightIOS,
        }}
      >
        {/* <Stack.Screen name="Loading" component={LoadingScreen} /> */}
        {
           this.props.isloggedin == false ? (
            <>
        <Stack.Screen name="Splash" component={SplashScreen} options={{ ...TransitionPresets.DefaultTransition }} />
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name='LoginScreen' component={LoginScreen}/>
        <Stack.Screen name='RegisterScreen' component={RegisterScreen}/>
        <Stack.Screen name="CreateAccount" component={CreateAccountScreen} />
        <Stack.Screen name="Verification" component={VerificationScreen} />
        </>
           )
        :(
        <>
        <Stack.Screen name="BottomTabBar" component={BottomTabBarScreen} options={{ ...TransitionPresets.DefaultTransition }} />
        <Stack.Screen name="PackageInfo" component={PackageInfoScreen} />
        <Stack.Screen name="Payment" component={PaymentScreen} />
        <Stack.Screen name="Restaurants" component={RestaurantsScreen} />
        <Stack.Screen name="RestaurantDetail" component={RestaurantDetailsScreen} />
        <Stack.Screen name="ConfirmOrder" component={ConfirmOrderScreen} />
        <Stack.Screen name="GroceryDetail" component={GroceryDetailScreen} />
        <Stack.Screen name="InviteFriends" component={InviteFriendsScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="Notifications" component={NotificationsScreen} />
        <Stack.Screen name="EditProfile" component={EditProfileScreen} />
        <Stack.Screen name="TrackOrder" component={TrackOrderScreen} />
        <Stack.Screen name="PackageInfoOne" component={PackageInfoOne} 
        options={{
          headerShown:true,
          title: 'Pickup And Dropoff',
        }}
        />
        <Stack.Screen name="Autocomplete" component={Autocomplete} 
        options={{
          headerShown:true,
          title: 'Pickup And Dropoff',
        }}
        />
        <Stack.Screen name="MapPicker" component={MapPicker} 
        options={{
          headerShown:true,
          title: 'Pickup And Dropoff Picker',
        }}
        />
        
        <Stack.Screen name="PackageInfoTwo" component={PackageInfoTwo} 
        options={{
          headerShown:true,
          title: 'Package information',
        }}
        />
         <Stack.Screen name="PackageInfoThree" component={PackageInfoThree} 
        options={{
          headerShown:true,
          title: 'Select Vehicle',
        }}
        />
        </>
        )
  }
      </Stack.Navigator>
    </NavigationContainer>
  );
      }
}

function mapStateToProps( state ) {
  return { 
    regloader:state.auth.regloader,
    isloggedin:state.auth.loggedin,
    internetstate:state.auth.internetstate,
    oldversion:state.auth.oldversion,
    newversion:state.auth.newversion,
  };
}

export default connect(mapStateToProps, actions)(MainNavigator);

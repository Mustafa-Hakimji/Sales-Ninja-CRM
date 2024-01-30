import React, {PureComponent} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';

// Auth Screens
import {SplashScreen} from '../screens/auth/splash';
import {appNavigationStates} from '../assets/constants/appConstants';
import SignUp from '../screens/signUp';
import SignIn from '../screens/signIn';

import DrawerOptions from '../screens/drawerOptions';
import ForgotPassword from '../screens/forgotPassword';
import HomeScreen from '../screens/home';
import Dashboard from '../screens/dashboard';
import Settings from '../screens/settings';
import ResetPassword from '../screens/resetPassword';
import ConsolidatedReport from '../screens/consolidatedReport';

const Stack = createStackNavigator();
// const Drawer = createDrawerNavigator();
const DrawerScreen = () => {
  const Drawer = createDrawerNavigator();

  return (
    <Drawer.Navigator
      drawerContent={props => <DrawerOptions {...props} />}
      screenOptions={{
        drawerType: 'front',
        headerShown: false,
        drawerPosition: 'left',
        drawerStyle: {width: '80%'},
      }}>
      <Drawer.Screen name="Feeds" component={HomeScreen} />
      <Drawer.Screen name="Dashboard" component={Dashboard} />
    </Drawer.Navigator>
  );
};

class AppNavigator extends PureComponent {
  static navigationRef: any;
  static appNavigatorRef = null;
  static isUserCameOnDashboard = false;

  constructor(props: any) {
    super(props);

    AppNavigator.appNavigatorRef = this;

    this.state = {
      navigationStack: appNavigationStates.auth,
    };
  }

  render() {
    const {navigationStack}: any = this.state;

    return (
      <NavigationContainer
        ref={ref => {
          AppNavigator.navigationRef = ref;
        }}>
        <Stack.Navigator
          screenOptions={{headerShown: false, animationEnabled: true}}>
          {navigationStack === appNavigationStates?.auth ? (
            <>
              <Stack.Screen name="Splash" component={SplashScreen} />
              <Stack.Screen name="SignIn" component={SignIn} />
              <Stack.Screen name="SignUp" component={SignUp} />
              <Stack.Screen name="Forgot" component={ForgotPassword} />
            </>
          ) : (
            <>
              <Stack.Screen name="Home" component={DrawerScreen} />
              <Stack.Screen name="Settings" component={Settings} />
              <Stack.Screen name="ResetPassword" component={ResetPassword} />
              <Stack.Screen name="Report" component={ConsolidatedReport} />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

export {AppNavigator};

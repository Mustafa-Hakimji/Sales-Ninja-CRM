import React, {useEffect} from 'react';
import {Text, View, Image, useColorScheme} from 'react-native';
import {StackActions} from '@react-navigation/native';

import {getStorageItems, setStorageItem} from '../../../utils/asyncStorage';
import {colors, updateConfigColors} from '../../../assets/constants/colors';
import Footer from '../../../components/footer';
import {setToken} from '../../../utils/contentManager/contentManager';
import {
  appNavigationStates,
  appThemes,
} from '../../../assets/constants/appConstants';
import {useContextHook} from '../../../context/contextProvider';
import {asyncStorageKeys} from '../../../assets/constants/asyncStorageKeys';
import {getEmployeeProfile, verifyToken} from '../../../utils/functions';
import {AppNavigator} from '../../../navigation';
import {splashStyles} from './style';
import {syncCallLogsEntryFunc} from '../../../utils/helpers/callLogsFunctions';

const SplashScreen = ({navigation}: any) => {
  const styles = splashStyles();
  const userTheme: any = useColorScheme();
  const {setLastSync} = useContextHook();

  const getToken = async () => {
    try {
      const token: any = await getStorageItems(asyncStorageKeys.authToken);
      setToken(token);
      if (token) {
        verifyToken();
        getEmployeeProfile(() => {
          syncCallLogsEntryFunc();
        });

        AppNavigator.appNavigatorRef.setState({
          navigationStack: appNavigationStates.user,
        });
      } else {
        navigation.dispatch(StackActions.replace('SignIn'));
      }
    } catch (error) {
      console.log('ERROR Get token', error);
    }
  };

  console.log('SPlash user Theme --> ', userTheme);

  const manageTheme = async () => {
    const theme = await getStorageItems(asyncStorageKeys.theme);

    if (theme) {
      if (theme === 'default') {
        updateConfigColors(userTheme);
        return;
      } else {
        updateConfigColors(theme);
        return;
      }
    } else {
      if (userTheme) {
        updateConfigColors(userTheme);
        return;
      } else {
        updateConfigColors(appThemes.dark);
        return;
      }
    }
  };

  useEffect(() => {
    manageTheme();
    const timeout = setTimeout(() => {
      getToken();
    }, 3000);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <View style={styles.container}>
      <Image
        style={styles.splashStyles}
        source={require('../../../assets/images/logo.png')}
      />
      <View style={styles.rowAround}>
        <Text style={[styles.textSplash, {color: colors.fadeWhite}]}>
          Sales{' '}
        </Text>
        <Text style={[styles.textSplash, {color: colors.appPrimaryColor}]}>
          Ninja
        </Text>
      </View>
      <Footer isTouchable={false} text={'Powered By REDVISION'} />
    </View>
  );
};

export {SplashScreen};

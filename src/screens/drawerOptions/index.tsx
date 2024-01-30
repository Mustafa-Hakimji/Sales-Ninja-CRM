import {
  Alert,
  Image,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import DeviceInfo from 'react-native-device-info';

import {drawerScreenStyles} from './styles';
import {getStorageItems, removeStorageItem} from '../../utils/asyncStorage';
import {asyncStorageKeys} from '../../assets/constants/asyncStorageKeys';
import {appNavigationStates} from '../../assets/constants/appConstants';
import {AppNavigator} from '../../navigation';
import Options from './options';
import {convertTimeStamp, getEmployeeProfile} from '../../utils/functions';
import {
  mapAndUploadRecordings,
  pickAndMapRecordings,
} from '../../utils/helpers/callLogsFunctions';
import {api} from '../../utils/ApiManager/api';
import {stopBackgrounServices} from '../../utils/helpers/backgroundActions';

const DrawerOptions = (props: any) => {
  const styles = drawerScreenStyles();

  const [lastSync, setLastSync] = useState('');
  const [userData, setUserData] = useState<any>([]);

  const version = DeviceInfo.getVersion();

  const navigation = useNavigation();

  const getLastSync = async () => {
    const response = await getStorageItems(asyncStorageKeys.lastSync);
    const formattedTime = convertTimeStamp(Number(response));
    setLastSync(formattedTime);
  };

  const getEmployeeDetails = async () => {
    const data = await getEmployeeProfile();

    console.log('Employee Profile--> ', data);

    setUserData(data);
  };

  const logoutUser = () => {
    removeStorageItem(asyncStorageKeys.theme);
    removeStorageItem(asyncStorageKeys.authToken);
    stopBackgrounServices();
    AppNavigator.appNavigatorRef.setState({
      navigationStack: appNavigationStates.auth,
    });
  };
  const handleLogout = () => {
    Alert.alert('Alert Title', 'Are you sure you want to logout?', [
      {
        text: 'Cancel',
        onPress: () => null,
        style: 'cancel',
      },
      {text: 'ok', onPress: () => logoutUser()},
    ]);
  };

  useEffect(() => {
    getLastSync();
    getEmployeeDetails();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity activeOpacity={0.5} style={styles.profileContainer}>
        <Image
          style={styles.profileImage}
          source={require('../../assets/images/demoProfile.png')}
        />
      </TouchableOpacity>
      <TouchableOpacity activeOpacity={0.5}>
        <Text style={styles.name}>{userData.fullName}</Text>
      </TouchableOpacity>

      <View>
        <TouchableOpacity
          activeOpacity={0.5}
          style={styles.lastSyncContainer}
          onPress={() => {
            pickAndMapRecordings();
          }}>
          <Image
            style={styles.lastSyncImage}
            source={require('../../assets/images/sync.png')}
          />
          <Text style={styles.lastSync}>last sync {lastSync}</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.divider} />

      <Options title={'Home'} onPress={() => navigation.navigate('Feeds')} />
      <Options
        title={'Dashboard'}
        onPress={() => navigation.navigate('Dashboard')}
      />

      <Options
        title={'Consolidate Report'}
        onPress={() => navigation.navigate('Report')}
      />
      <Options
        title={'Settings'}
        onPress={() => navigation.navigate('Settings')}
      />

      <Options
        title={'Logout'}
        style={styles.noBottonWidth}
        onPress={() => handleLogout()}
      />

      <View style={styles.brandContainer}>
        <View style={styles.versionContainer}>
          <Text style={styles.versionText}>Version - {version}</Text>
          <Text style={styles.versionText}>
            Powered by - REDVision Global LTD
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default DrawerOptions;

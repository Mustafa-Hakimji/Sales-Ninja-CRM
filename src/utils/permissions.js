import {PermissionsAndroid} from 'react-native';
import {showToast} from './helpers/toast';
import {messages} from './helpers/errorMessages';
import DeviceInfo from 'react-native-device-info';

const options = {
  title: 'Permission Alert',
  message: 'Access your call logs',
  buttonNeutral: 'Ask Me Later',
  buttonNegative: 'Cancel',
  buttonPositive: 'OK',
};

const getApiLevel = async () => {
  const level = await DeviceInfo.getApiLevel();
  console.log('Android version --> ', level);
  return level;
};

export const askPermissionToAccessCallLogs = async () => {
  try {
    //Ask for runtime permission
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.READ_CALL_LOG,
      options,
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      const androidVersion = await getApiLevel();
      if (androidVersion > 32) {
        askPermissionToAccessAudios();
      } else {
        askPermissionToReadStorage();
      }
    } else {
      showAlert({title: 'Message', message: 'callLogs Log permission denied'});
      askPermissionToAccessCallLogs();
    }
  } catch (e) {
    showAlert({
      title: 'Message',
      message: `Calllogs Log permission denied ${e}`,
    });
  }
};

export const askPermissionToAccessAudios = async () => {
  try {
    //Ask for runtime permission
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.READ_MEDIA_AUDIO,
      options,
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      // askPermissionToReadStorage();
    } else {
      console.log('Access Audios Permisson denied.');
      askPermissionToAccessAudios();
    }
  } catch (e) {
    console.log({
      title: 'Message',
      message: `Audios Log permission denied ${e}`,
    });
  }
};

export const askPermissionToReadStorage = async () => {
  try {
    //Ask for runtime permission
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
      options,
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      askPermissionToWriteStorage();
    } else {
      console.log('READ_EXTERNAL_STORAGE denied.');
      // askPermissionToReadStorage();
    }
  } catch (e) {
    console.log({
      title: 'Message',
      message: `READ_EXTERNAL_STORAGE Log permission denied ${e}`,
    });
  }
};

export const askPermissionToWriteStorage = async () => {
  try {
    //Ask for runtime permission
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      options,
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      showToast(messages.ALL_SET);
    } else {
      console.log('WRITE_EXTERNAL_STORAGE denied.');
      // askPermissionToWriteStorage();
    }
  } catch (e) {
    console.log({
      title: 'Message',
      message: `WRITE_EXTERNAL_STORAGE Log permission denied ${e}`,
    });
  }
};

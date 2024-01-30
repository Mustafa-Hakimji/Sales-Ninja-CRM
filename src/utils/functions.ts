import {Alert} from 'react-native';
import DocumentPicker from 'react-native-document-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';
import Sound from 'react-native-sound';

import {appNavigationStates} from '../assets/constants/appConstants';
import {asyncStorageKeys} from '../assets/constants/asyncStorageKeys';
import {api} from './ApiManager/api';
import {METHOD_TYPE} from './ApiManager/apiHandler';
import {API_URLS} from './ApiManager/urls';
import {getStorageItems, setStorageItem} from './asyncStorage';
import {showToast} from './helpers/toast';
import {AppNavigator} from '../navigation';

const logoutActions = () => {
  AsyncStorage.clear();
  AppNavigator?.appNavigatorRef.setState({
    navigationStack: appNavigationStates.auth,
  });
};

const validateEmail = (email: string) => {
  const emailPattern =
    /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/;
  if (!emailPattern.test(email)) {
    return true;
  }
  return false;
};

const validatePhoneNumber = (phoneNumber = '', countryCode = '+91') => {
  let pattern: any = '';

  switch (countryCode) {
    case '+91':
      // For countruy code numbers
      // pattern = /^(\+\d{1,2})?\s?\(?\d{10}\)?$/; //

      pattern = /^\d{10}$/; //
      break;

    //

    default:
      pattern = /^\d+$/;
  }

  if (!pattern.test(phoneNumber)) {
    return true;
  }

  return false;
};

const getEmployeeProfile = async (callback = () => {}) => {
  try {
    const response = await api({
      method: METHOD_TYPE.GET,
      url: API_URLS.EMPLOYEE_PROFILE,
    });

    if (response?.status === 200) {
      const {lastCallSync, lastCallRecordingSync} = response?.data?.data;
      await setStorageItem(asyncStorageKeys.lastSync, lastCallSync);
      await setStorageItem(asyncStorageKeys.lastRecSync, lastCallRecordingSync);
      callback();
      return response?.data?.data;
    }
  } catch (error) {
    showToast(error?.response?.data?.message);
  }
};

const verifyToken = async () => {
  try {
    const result = await api({
      url: API_URLS.VERIFY_TOKEN,
      method: METHOD_TYPE.GET,
      timeout: 5000,
    });

    if (result?.status === 200) {
      return true;
    }
  } catch (error) {
    showToast('Invalid token please login', 4);
    return false;
  }
};

const getHoursFormTS = (timestamp: string | number) => {
  const formattedTime = moment(timestamp).format('hh:mm A');
  return formattedTime;
};

const convertTimeStamp = (timestamp: number | string) => {
  const date = moment(timestamp);
  const formattedDateTime = date.format('DD-MMM-YYYY hh:mm:ss A');
  return formattedDateTime;
};

// Select recording path
const pickRecordingsPath = async (changePath?: boolean) => {
  try {
    const isRecoringPath = await getStorageItems(
      asyncStorageKeys.recordingsPath,
    );

    if (isRecoringPath && !changePath) {
      return;
    }

    const response = await DocumentPicker.pickDirectory({
      presentationStyle: 'fullScreen',
    });
    // console.log('Path --> ', response);

    const {uri}: any = response;
    const decodedRecordingPath = decodeURIComponent(uri);

    setStorageItem(asyncStorageKeys.recordingsPath, decodedRecordingPath);

    // console.log('Decoded Recording Path--> ', decodedRecordingPath);
  } catch (err) {
    console.log(err);
  }
};

// Create section function
const createSections = (data: any) => {
  const filteredData: any = {};
  const finalUIData: any = [];

  for (let i = 0; i < data.length; i++) {
    const timestamp = data[i].timestamp;

    const {
      _id,
      employeeId,
      phoneNumber,
      dateTime,
      duration,
      name,
      note,
      type,
      callRecording,
    } = data[i];

    const objPush = {
      _id,
      employeeId,
      phoneNumber,
      dateTime,
      duration,
      name,
      note,
      type,
      timestamp,
      callRecording,
    };

    const formattedDate = moment(data[i].timestamp).format('MMM-DD-YYYY');

    if (!filteredData[formattedDate]) {
      let data = [];
      data.push(objPush);
      filteredData[formattedDate] = [...data];
    } else {
      filteredData[formattedDate].push(objPush);
    }
  }

  const allDates = Object.keys(filteredData);

  for (const eachDate of allDates) {
    finalUIData.push({
      title: eachDate,
      data: filteredData[eachDate],
    });
  }
  return finalUIData;
};

// React native sound common function
const playRecording = async (recUrl: string, setDuration: any) => {
  const sound: any = new Sound(recUrl, '', (error: any, _sound: any) => {
    if (error) {
      console.log('Error condition');

      Alert.alert('error' + error.message);
      return;
    } else {
      setDuration(_sound.duration);
    }
  });
  return sound;
};

const pauseAndPlay = (instance: any, play: boolean) => {
  if (play) {
    instance.pause(() => {});
  } else {
    instance.play(() => {
      instance.release();
    });
  }
};

const getRecTime = (duration: string | number) => {
  let time = moment.duration(duration, 'seconds');
  let formattedTime = moment.utc(time.asMilliseconds()).format('mm:ss');

  return formattedTime;
};

const less120Days = () => {
  const currentDate = new Date();
  const minus120Days = 120 * 24 * 60 * 60 * 1000; // Convert days to milliseconds
  const resultDate = new Date(currentDate.getTime() - minus120Days);
  return resultDate;
};

export {
  validateEmail,
  validatePhoneNumber,
  getEmployeeProfile,
  verifyToken,
  logoutActions,
  convertTimeStamp,
  pickRecordingsPath,
  createSections,
  getHoursFormTS,
  playRecording,
  pauseAndPlay,
  getRecTime,
  less120Days,
};

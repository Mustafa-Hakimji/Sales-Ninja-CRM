import {PermissionsAndroid} from 'react-native';
import CallLogs from 'react-native-call-log';
import RNFS from 'react-native-fs';
import BackgroundService from 'react-native-background-actions';

import {getStorageItems, setStorageItem} from '../asyncStorage';
import {asyncStorageKeys} from '../../assets/constants/asyncStorageKeys';
import {api} from '../ApiManager/api';
import {API_URLS} from '../ApiManager/urls';
import {showToast} from './toast';
import {messages} from './errorMessages';
import {METHOD_TYPE} from '../ApiManager/apiHandler';

import {
  FIFTEEN_MINUTES,
  THIRTEEN_MINUTES,
} from '../../assets/constants/timeoutConstants';

const options = {
  title: 'Permission Alert',
  message: 'Access your call logs',
  buttonNeutral: 'Ask Me Later',
  buttonNegative: 'Cancel',
  buttonPositive: 'OK',
};

let callSyncStarted = false;
let recordingSyncStarted = false;

const syncCallLogsEntryFunc = async () => {
  if (callSyncStarted) {
    return;
  }

  await syncCallLogs();
};

const syncRecordingEntry = async () => {
  if (recordingSyncStarted) {
    return;
  }

  await pickAndMapRecordings();
};

// Get Call logs from local device.
const getCallLogs = async () => {
  try {
    const minTime = await getStorageItems(asyncStorageKeys.lastSync);
    if (!minTime) {
      return;
    }

    if (BackgroundService.isRunning()) {
      const filter = {
        minTimestamp: minTime, // (Number or String) timestamp in milliseconds since UNIX epoch
        // if this filter is set, load(limit, filter) will only return call logs with timestamp >= minTimestamp
        maxTimestamp: Date.now(), // (Number or String) timestamp in milliseconds since UNIX epoch
        // if this filter is set, load(limit, filter) will only return call logs with timestamp <= maxTimestamp
        // phoneNumbers: '', // (String or an Array of String)
        // if this filter is set, load(limit, filter) will only return call logs for this/these phone numbers
      };

      const logs = await CallLogs.load(-1, filter).then((callLogs: any) => {
        return callLogs;
      });

      return logs;
    }
    //Ask for runtime permission

    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.READ_CALL_LOG,
      options,
    );

    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      const filter = {
        minTimestamp: minTime, // (Number or String) timestamp in milliseconds since UNIX epoch
        // if this filter is set, load(limit, filter) will only return call logs with timestamp >= minTimestamp
        maxTimestamp: Date.now(), // (Number or String) timestamp in milliseconds since UNIX epoch
        // if this filter is set, load(limit, filter) will only return call logs with timestamp <= maxTimestamp
        // phoneNumbers: '', // (String or an Array of String)
        // if this filter is set, load(limit, filter) will only return call logs for this/these phone numbers
      };

      const logs = await CallLogs.load(-1, filter).then((callLogs: any) => {
        return callLogs;
      });
      return logs;
    } else {
      console.log('Log permission denied');
      return null;
    }
  } catch (e) {
    console.log('Error getting call logs ', e);
    return null;
  }
};

// Sync Call logs to server.
const syncCallLogs = async (canRestart = true, isAppOpen?: boolean) => {
  // console.log('Can Start --> ', canRestart);

  try {
    const callLogs = await getCallLogs();

    // console.log('syncCallLogs:', callLogs);

    if (!callLogs || callLogs.length === 0) {
      if (isAppOpen) {
        showToast(messages.SYNC_SUCCESSFUL);
      }
      return;
    }

    const response = await api({
      url: API_URLS.CALL_SYNC,
      data: {callLogs},
    });
    if (response?.status === 200) {
      const lastSync = response?.data?.data?.lastCallSync;
      await setStorageItem(asyncStorageKeys.lastSync, lastSync);
      if (isAppOpen) {
        showToast(messages.SYNC_SUCCESSFUL);
      }
    }
  } catch (error) {
    if (isAppOpen) {
      showToast(error?.response?.data?.message);
    }
    console.log('ERROR WILE SYNC CALL --> ', error?.response?.data);
  } finally {
    callSyncStarted = true;
    if (canRestart && !BackgroundService.isRunning()) {
      setTimeout(() => {
        syncCallLogs();
      }, FIFTEEN_MINUTES);
    }
  }
};

// Upload Recordings API
const uploadRecordings = async (
  recording: any,
  timestamp: number | string,
  phoneNumber: string,
) => {
  try {
    const splittedName = recording.name.split('.');
    const recordingType = splittedName[splittedName.length - 1];

    const data = new FormData();
    data.append('recording', {
      uri: `file://${recording.path}`,
      name: recording.name,
      type: `audio/${recordingType}`,
    });

    const numberTS = Number(timestamp);

    data.append('timestamp', numberTS);
    data.append('phoneNumber', phoneNumber);

    const response = await api(
      {
        url: API_URLS.UPLOAD_RECORDINGS,
        data,
      },
      2,
    );

    console.log('Response overall', response.data.code);
    if (response?.data?.code === 201) {
      await setStorageItem(
        asyncStorageKeys.lastRecSync,
        response.data?.data?.lastCallRecordingSync,
      );
      console.log('Response 201', response);
    }

    if (response?.data?.code === 205) {
      await setStorageItem(
        asyncStorageKeys.lastRecSync,
        response.data?.data?.lastCallRecordingSync,
      );
      console.log('Response 205', response);
    }

    return true;
  } catch (error) {
    console.log('ERROR Uploading calls --> ', Object.entries(error));

    return false;
  }
};

// Get all unsynced recording calls
const unsyncRecordingsCalls = async () => {
  try {
    const lastRecSync = await getStorageItems(asyncStorageKeys.lastRecSync);

    if (!lastRecSync) {
      return;
    }

    const response = await api({
      url: API_URLS.UNSYNCED_RECOEDING_CALLS(lastRecSync),
      method: METHOD_TYPE.GET,
    });

    if (response?.status === 200) {
      return response?.data?.data;
    }
  } catch (error) {
    console.log('ERROR unsyncRecordingsCalls:', Object.entries(error));
  }
};

// Mapping call logs with recordings function.
const mapAndUploadRecordings = async (logs: any, record: any) => {
  const finalRecordings = [];
  const recordings = record.sort(
    (a: any, b: any) => new Date(a.mtime) - new Date(b.mtime),
  );

  const callLogs = logs.sort(
    (a: any, b: any) => parseInt(a.timestamp) - parseInt(b.timestamp),
  );

  // Testing Purpose code
  // console.log('LOOP RECORDING --> ', recordings);
  // console.log('LOOP RECORDING --> ', recordings.length);
  // console.log(
  //   '-----------------------------------------------------------------------------------------',
  // );
  // console.log('LOOP CALL LOGS --> ', callLogs);
  // console.log('LOOP CALL LOGS --> ', callLogs.length);

  for (let i = 0; i < callLogs.length; i++) {
    const timestamp =
      Number(callLogs[i].timestamp) + callLogs[i].duration * 1000;
    const compareTS = timestamp;

    for (let j = 0; j < recordings.length; j++) {
      const recDate = recordings[j].mtime;
      const recTSString = Date.parse(recDate);

      // Testing Purpose code
      // console.log(
      //   'CONDITION RESULT  GREATER THAN --> ',
      //   recTSString >= compareTS,
      // );

      if (recTSString >= compareTS && callLogs[i].duration > 0) {
        const nameIncludes = recordings[j]?.name
          ?.toLowerCase()
          ?.includes(callLogs[i]?.name?.toLowerCase());

        const correctNumber = callLogs[i]?.phoneNumber?.split('-');
        const numberIncludes = recordings[j]?.name?.includes(correctNumber[1]);

        // Testing Purpose code
        // console.log('NAME INCLUDES CONDITION--> ', nameIncludes);
        // console.log('NUMBER INCLUDES CONDITION--> ', numberIncludes);
        // console.log('RECORDING NAME-- --> ', recordings[j]?.name);

        if (nameIncludes || numberIncludes) {
          const recMap = {
            call: callLogs[i],
            rec: recordings[j],
          };

          // Testing Purpose code
          // finalRecordings.push(recMap);

          // Upload each recording start

          const uploadResult = await uploadRecordings(
            recordings[j],
            callLogs[i].timestamp,
            callLogs[i].phoneNumber,
          );

          console.log('Upload recording --> ', uploadResult);

          if (!uploadResult) {
            return;
          }

          // Upload each recording end
          recordings.splice(j, 1);
          break;
        }
      }
    }
  }

  // Testing Purpose code
  // console.log(
  //   'Loop final output --> ',
  //   finalRecordings,
  //   finalRecordings.length,
  // );
};

// Pick and Map Call recording function.
const pickAndMapRecordings = async (canRestart = true) => {
  try {
    const recordingPath = await getStorageItems(
      asyncStorageKeys.recordingsPath,
    );

    const lastRecSync = await getStorageItems(asyncStorageKeys.lastRecSync);

    // Checkong file exist or not with upload path.
    // const isFileExist = await RNFS.exists(
    //   'file:///storage/emulated/0/Call/Call recording Mustafa Hakimji_231129_170647.m4a',
    // );
    // console.log('IS FILE EXIST --> ', isFileExist);

    const folderPath = recordingPath.split(':');
    const directoryPath =
      RNFS.ExternalStorageDirectoryPath + '/' + folderPath[2];

    const files = await RNFS.readDir(directoryPath);

    const filteredFiles = files.filter((recording: any) => {
      const recTimeStamp = new Date(recording.mtime);

      return recTimeStamp >= lastRecSync;
    });

    // console.log('RNFS Recordings --> ', filteredFiles);
    // console.log('Filtered Files Calls --> :', filteredFiles);

    await syncCallLogs();

    const callLogs = await unsyncRecordingsCalls();

    mapAndUploadRecordings(callLogs, filteredFiles);
  } catch (error) {
    console.log('Error:', error);
  } finally {
    recordingSyncStarted = true;
    if (canRestart) {
      setTimeout(() => {
        pickAndMapRecordings();
      }, THIRTEEN_MINUTES);
    }
  }
};

// Get call logs API with pagination for Home page.
const getCallLogsApi = async (
  page: number = 1,
  limit: number = 20,
  type?: string | null,
) => {
  try {
    const response = await api({
      url: API_URLS.CALL_LOG_LIST(page, limit),
      data: {type},
    });
    if (response?.status === 200) {
    }
  } catch (error) {
    console.log('Error getting call logs--> ', error);
  }
};

export {
  syncCallLogs,
  getCallLogs,
  getCallLogsApi,
  mapAndUploadRecordings,
  unsyncRecordingsCalls,
  pickAndMapRecordings,
  syncCallLogsEntryFunc,
  syncRecordingEntry,
};

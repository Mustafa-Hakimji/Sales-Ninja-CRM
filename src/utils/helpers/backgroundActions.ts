import BackgroundService from 'react-native-background-actions';

import {
  FIFTEEN_MINUTES,
  ONE_MINUTE,
  SIXTY_MINUTES,
  TWO_MINUTES,
} from '../../assets/constants/timeoutConstants';
import {pickAndMapRecordings, syncCallLogs} from './callLogsFunctions';

const sleep = (time: any) =>
  new Promise(resolve => setTimeout(() => resolve(null), time));

const syncCallLogsInBackground = async (taskDataArguments: any) => {
  // Example of an infinite loop task
  const {delay} = taskDataArguments;
  await new Promise(async resolve => {
    for (let i = 0; BackgroundService.isRunning(); i++) {
      console.log('background services', i);
      await syncCallLogs(false);
      await sleep(delay);
    }
  });
};

const options1: any = {
  taskName: 'Example',
  taskTitle: 'ExampleTask title',
  taskDesc: 'ExampleTask description',
  taskIcon: {
    name: 'ic_launcher',
    type: 'mipmap',
  },
  color: '#ff00ff',
  linkingURI: 'yourSchemeHere://chat/jane',
  parameters: {
    delay: FIFTEEN_MINUTES,
  },
};

const startSyncCallInBG = async () => {
  await BackgroundService.start(syncCallLogsInBackground, options1);
  await BackgroundService.start(syncRecordingsInBackground, options2);
  console.log('Both Logs Background services started');
};

const syncRecordingsInBackground = async (taskDataArguments: any) => {
  // Example of an infinite loop task
  const {delay} = taskDataArguments;
  await new Promise(async resolve => {
    for (let i = 0; BackgroundService.isRunning(); i++) {
      console.log('background services', i);
      await pickAndMapRecordings();
      await sleep(delay);
    }
  });
};

const options2: any = {
  taskName: 'Example',
  taskTitle: 'ExampleTask title',
  taskDesc: 'ExampleTask description',
  taskIcon: {
    name: 'ic_launcher',
    type: 'mipmap',
  },
  color: '#ff00ff',
  linkingURI: 'yourSchemeHere://chat/jane',
  parameters: {
    delay: SIXTY_MINUTES * 2,
  },
};

const startSyncRecordingsBG = async () => {
  await BackgroundService.start(syncRecordingsInBackground, options2);
  console.log('Recordings Background services started');
};
const stopBackgrounServices = async () => {
  console.log('BG SERVICES STOPPED');

  await BackgroundService.stop();
};

export {startSyncCallInBG, startSyncRecordingsBG, stopBackgrounServices};

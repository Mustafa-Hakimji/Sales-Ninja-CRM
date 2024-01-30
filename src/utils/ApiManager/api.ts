import axios from 'axios';
import {StackActions} from '@react-navigation/native';

import {getHeaders} from './headers';
import {AppNavigator} from '../../navigation';
import {HTTP_STATUS_CODE, METHOD_TYPE, TIMEOUT_SECONDS} from './apiHandler';
import {getBaseURL} from './urls';
import {appNavigationStates} from '../../assets/constants/appConstants';
import {logoutActions} from '../functions';
import {setToken} from '../contentManager/contentManager';

const showAPILogs = false;

export const api = (apiData: any, headersType: number = 1) => {
  const options = {
    method: METHOD_TYPE.POST,
    headers:
      headersType === 1
        ? getHeaders({
            contentType: 'application/json',
          })
        : getHeaders({
            contentType: 'multipart/form-data',
          }),
    timeout: 1000 * TIMEOUT_SECONDS,
    ...apiData,
  };

  if (apiData.url.includes(getBaseURL())) {
    options.headers = {
      ...options.headers,
    };
  }

  if (showAPILogs) {
    console.log('API request ==> ', options);
  }

  return new Promise((resolve, reject) => {
    axios(options)
      .then(response => {
        if (showAPILogs) {
          console.log('API response ==> ', response);
        }
        if (
          response.status === HTTP_STATUS_CODE.UNAUTHORISED_TOKEN &&
          response.request.responseURL.includes(getBaseURL())
        ) {
          resetRouteAndLogout();
          return;
        }
        resolve(response);
      })
      .catch(error => {
        if (showAPILogs) {
          console.log('API error !!! ', error);
        }

        if (
          error &&
          error.response &&
          error.response.status === HTTP_STATUS_CODE.UNAUTHORISED_TOKEN &&
          error.request.responseURL.includes(getBaseURL())
        ) {
          resetRouteAndLogout();
          return;
        }
        reject(error);
      });
  });
};

const resetRouteAndLogout = () => {
  if (AppNavigator.isUserCameOnDashboard) {
    AppNavigator.appNavigatorRef.setState({
      navigationStack: appNavigationStates.auth,
    });
  } else {
    AppNavigator.navigationRef.dispatch(StackActions.replace('Splash'));
  }
  logoutActions();
  setToken('');
};

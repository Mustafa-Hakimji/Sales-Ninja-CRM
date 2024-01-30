import {paginationConstant} from '../../assets/constants/appConstants';

let BASE_URL = 'http://192.168.1.110:3101';

const API_URLS = {
  EMPLOYEE_LOGIN: `${BASE_URL}/employee/phone-login`,
  EMPLOYEE_SIGNUP: `${BASE_URL}/employee/create-employee`,
  EMPLOYEE_FORGOTPASSWORD: `${BASE_URL}/employee/forgot-password-link`,
  EMPLOYEE_PROFILE: `${BASE_URL}/employee/get-employee`,
  VERIFY_TOKEN: `${BASE_URL}/employee/get-token-validation`,
  CALL_SYNC: `${BASE_URL}/employee/add-call-sync`,
  RESET_PASSWORD: `${BASE_URL}/employee/change-password`,
  UPLOAD_RECORDINGS: `${BASE_URL}/employee/save-recordings`,
  UPLOAD_NOTES: `${BASE_URL}/employee/update-note`,

  UNSYNCED_RECOEDING_CALLS: (lastCallRecSync: string | number) =>
    `${BASE_URL}/call-reports/get-last-recording-sync-calls?lastCallRecSync=${lastCallRecSync}`,
  CALL_LOG_LIST: (pg = 1, lmt = paginationConstant.limit) =>
    `${BASE_URL}/call-reports/phone-call-logs?pg=${pg}&lm=${lmt}`,
};

const getBaseURL = () => BASE_URL;

export {getBaseURL, API_URLS};

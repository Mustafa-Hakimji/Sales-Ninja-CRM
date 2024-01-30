const userData = {
  token: '',
};

const getToken = () => userData.token;

const setToken = (token = '') => {
  userData.token = token;
};

// --------- Login Data ---------

let loginData = {};

export const getLoginData = () => {
  return loginData;
};

export {userData, getToken, setToken};

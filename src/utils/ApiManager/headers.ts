import {getToken} from '../contentManager/contentManager';

type Argumrnts = {
  token?: string | null;
  contentType: string | null;
};

export const getHeaders = ({contentType}: Argumrnts) => {
  const headers = {
    'Content-Type': contentType ? contentType : 'application/json',
  };
  const token = getToken();

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  return headers;
};

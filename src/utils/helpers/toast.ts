import Toast from 'react-native-simple-toast';

export const showToast = (message = '', duration = 2, position = 'center') => {
  if (position === 'center') {
    Toast.showWithGravity(message, duration, Toast.CENTER);
  }
  if (position === 'top') {
    Toast.showWithGravity(message, duration, Toast.TOP);
  }
  if (position === 'bottom') {
    Toast.showWithGravity(message, duration, Toast.BOTTOM);
  }
};

export const toastForCommonError = () =>
  showToast(
    'There is a problem while communicating with server.\nMaybe you are not Connected to Internet',
    2.5,
  );

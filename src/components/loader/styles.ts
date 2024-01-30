import {StyleSheet} from 'react-native';

const loaderStyles = () =>
  StyleSheet.create({
    container: {
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      backgroundColor: '#FFFFFF80',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 20,
      position: 'absolute',
    },
  });

export {loaderStyles};

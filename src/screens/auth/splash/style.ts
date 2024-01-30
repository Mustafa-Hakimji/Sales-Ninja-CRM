import {StyleSheet} from 'react-native';
import FONTS from '../../../assets/constants/fonts';
import {fontSize} from '../../../assets/constants/fontSize';

const splashStyles = () =>
  StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'black',
    },

    splashStyles: {
      height: 200,
      width: 200,
    },

    textSplash: {
      fontFamily: FONTS.POPPINSBOLD,
      fontSize: fontSize.TwentyThreePoint,
    },

    rowAround: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'center',
    },
  });

export {splashStyles};

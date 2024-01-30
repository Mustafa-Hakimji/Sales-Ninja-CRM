import {StyleSheet} from 'react-native';
import {fontSize} from '../../assets/constants/fontSize';
import {colors} from '../../assets/constants/colors';

const togglePlayStyles = () =>
  StyleSheet.create({
    playContainer: {
      marginRight: 10,
    },
    playIcon: {alignItems: 'flex-end'},
    playImage: {
      height: fontSize.TwentyEigthPoint,
      width: fontSize.TwentyEigthPoint,
      marginBottom: 5,
    },
    timeStyle: {
      color: colors.callLogSubText,
      fontSize: fontSize.ElevenPoint,
      textAlign: 'right',
    },
    nextImage: {
      height: fontSize.TwentyFivePoint,
      width: fontSize.TwentyFivePoint,
      marginBottom: 5,
      opacity: 0.7,
    },
  });

export {togglePlayStyles};

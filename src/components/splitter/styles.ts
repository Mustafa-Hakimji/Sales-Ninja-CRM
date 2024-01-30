import {StyleSheet} from 'react-native';
import {colors} from '../../assets/constants/colors';
import FONTS from '../../assets/constants/fonts';

const splitterStyles = () =>
  StyleSheet.create({
    orContainer: {
      alignSelf: 'stretch',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'row',
      marginVertical: 20,
      backgroundColor: colors.backgroundColor,
    },
    orLineView: {
      alignItems: 'center',
      justifyContent: 'center',
      height: 1,
      width: 100,
      backgroundColor: colors.splitter,
    },
    orText: {
      textAlign: 'center',
      color: colors.splitter,
      fontFamily: FONTS.POPPINSBOLD,
    },
  });

export {splitterStyles};

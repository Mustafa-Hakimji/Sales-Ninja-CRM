import {StyleSheet} from 'react-native';
import {colors} from '../../assets/constants/colors';
import FONTS from '../../assets/constants/fonts';
import {fontSize} from '../../assets/constants/fontSize';

const headerStyles = () =>
  StyleSheet.create({
    container: {
      height: 60,
      backgroundColor: colors.appPrimaryColor,
      width: '100%',
      flexDirection: 'row',
      alignItems: 'center',
    },
    screenName: {
      marginHorizontal: 20,
    },
    options: {},
    heading: {
      fontSize: fontSize.ThirteenPoint,
      fontFamily: FONTS.POPPINSBOLD,
      color: colors.white,
    },
    icon: {
      height: 35,
      width: 35,
      marginHorizontal: 25,
    },
    backIcon: {
      height: 28,
      width: 28,
      marginHorizontal: 25,
      tintColor: colors.white,
    },
  });

export {headerStyles};

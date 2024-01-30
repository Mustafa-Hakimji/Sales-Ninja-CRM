import {StyleSheet} from 'react-native';
import {colors} from '../../assets/constants/colors';
import {layout} from '../../assets/constants/layout';
import {fontSize} from '../../assets/constants/fontSize';
import FONTS from '../../assets/constants/fonts';

const selectThemeStyles = () =>
  StyleSheet.create({
    btn: {
      flexDirection: 'row',
      alignItems: 'center',
      width: '95%',
      borderRadius: 20,
      padding: 10,
    },

    modalContainer: {
      width: layout.window.width,
      height: layout.window.height,
      justifyContent: 'center',
      alignItems: 'center',
    },

    optionsContainer: {
      alignItems: 'center',
      width: '80%',
      paddingVertical: 15,
      borderRadius: 20,
      backgroundColor: colors.themeModalBg,
    },

    radioContainer: {
      height: 20,
      width: 20,
      borderRadius: 10,
      borderWidth: 0.8,
      borderColor: colors.appPrimaryColor,
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 10,
    },

    radioFilled: {
      backgroundColor: colors.appPrimaryColor,
      height: 11,
      width: 11,
      borderRadius: 5.5,
    },

    confirmContainer: {
      flexDirection: 'row',
      alignSelf: 'flex-end',
      alignItems: 'center',
      marginVertical: 5,
    },
    confirmBtn: {
      justifyContent: 'center',
      alignItems: 'center',
      borderColor: colors.textThemeColor,
      marginHorizontal: 20,
    },
    optText: {
      fontSize: fontSize.TwelvePoint,
      color: colors.backgroundLight,
      fontFamily: FONTS.POPPINSREGULAR,
    },
    conBtnTxt: {
      fontSize: fontSize.ThirteenPoint,
      color: colors.backgroundLight,
      fontFamily: FONTS.POPPINSREGULAR,
    },
  });

export {selectThemeStyles};

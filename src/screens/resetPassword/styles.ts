import {StyleSheet} from 'react-native';
import {colors} from '../../assets/constants/colors';
import FONTS from '../../assets/constants/fonts';
import {fontSize} from '../../assets/constants/fontSize';

const resetPasswordStyles = () =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.backgroundColor,
      justifyContent: 'center',
      alignItems: 'center',
    },
    keyboardViewContainer: {
      flex: 1,
      backgroundColor: colors.backgroundColor,
    },
    image: {
      height: 125,
      width: 125,
      marginVertical: 10,
      alignSelf: 'center',
      marginTop: 40,
    },

    headingTxt: {
      color: colors.textThemeColor,
      fontSize: fontSize.ThirtyOnePoint,
      fontFamily: FONTS.POPPINSMEDIUM,
      marginBottom: 35,
      textAlign: 'center',
    },

    buttonTextStyle: {
      fontFamily: FONTS.POPPINSBOLD,
      fontSize: fontSize.SixteenPoint,
    },

    button: {
      width: '95%',
      marginTop: 10,
      borderRadius: 7,
      alignSelf: 'center',
      marginBottom: 150,
    },

    textDontHave: {
      color: colors.fadeText,
      fontSize: fontSize.FourteenPoint,
      fontFamily: FONTS.POPPINSREGULAR,
    },

    textSignUp: {
      color: colors.appPrimaryColor,
      fontFamily: FONTS.POPPINSSEMIBOLD,
      textAlign: 'center',
    },

    forgot: {
      fontFamily: FONTS.POPPINSSEMIBOLD,
      fontSize: fontSize.FifteenPoint,
      color: colors.appPrimaryColor,
    },

    forgotContainer: {
      marginTop: 30,
      alignSelf: 'center',
    },

    dontHaveContainer: {
      marginBottom: 100,
      alignSelf: 'center',
    },
  });

export {resetPasswordStyles};

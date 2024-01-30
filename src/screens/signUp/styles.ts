import {StyleSheet} from 'react-native';
import {colors} from '../../assets/constants/colors';
import FONTS from '../../assets/constants/fonts';
import {fontSize} from '../../assets/constants/fontSize';

const signUpStyles = () =>
  StyleSheet.create({
    containerCenter: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: colors.backgroundColor,
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
      marginTop: fontSize.TwentyPoint,
    },

    headingTxt: {
      fontSize: fontSize.ThirtyOnePoint,
      fontFamily: FONTS.POPPINSMEDIUM,
      marginBottom: 35,
      textAlign: 'center',
      color: colors.textThemeColor,
    },

    buttonTextStyle: {
      fontFamily: FONTS.POPPINSBOLD,
      fontSize: 18,
    },

    button: {
      width: '95%',
      marginTop: 10,
      borderRadius: 7,
      alignSelf: 'center',
    },

    textDontHave: {
      color: colors.fadeText,
      fontSize: fontSize.FourteenPoint,
      fontFamily: FONTS.POPPINSREGULAR,
      marginVertical: 20,
      textAlign: 'center',
    },

    textSignUp: {
      color: colors.appPrimaryColor,
      fontFamily: FONTS.POPPINSSEMIBOLD,
    },

    forgot: {
      fontFamily: FONTS.POPPINSSEMIBOLD,
      fontSize: fontSize.FifteenPoint,
      color: colors.appPrimaryColor,
    },

    haveAccount: {
      marginBottom: 70,
    },
  });

export {signUpStyles};

import {StyleSheet} from 'react-native';
import {colors} from '../../assets/constants/colors';
import FONTS from '../../assets/constants/fonts';
import {fontSize} from '../../assets/constants/fontSize';

const forgotStyles = () =>
  StyleSheet.create({
    mainContainercenter: {
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
      marginVertical: 40,
      alignSelf: 'center',
    },

    headingTxt: {
      color: colors.textThemeColor,
      fontSize: fontSize.ThirtyOnePoint,
      fontFamily: FONTS.POPPINSMEDIUM,
      marginBottom: 20,
      textAlign: 'center',
    },

    buttonTextStyle: {
      fontFamily: FONTS.POPPINSBOLD,
      fontSize: fontSize.FifteenPoint,
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

    forgotButton: {
      marginTop: 30,
      alignSelf: 'center',
    },

    dontHaveContainer: {
      alignSelf: 'center',
      marginBottom: 150,
    },
  });
export {forgotStyles};

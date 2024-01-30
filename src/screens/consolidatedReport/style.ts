import {StyleSheet} from 'react-native';
import {colors} from '../../assets/constants/colors';
import FONTS from '../../assets/constants/fonts';
import {fontSize} from '../../assets/constants/fontSize';

const reportStyles = () =>
  StyleSheet.create({
    mainContainer: {
      flex: 1,
      backgroundColor: colors.backgroundColor,
    },
    subContainer: {
      flex: 1,
      justifyContent: 'center',
      //   alignItems: 'center',
    },

    rowContainer: {
      flexDirection: 'row',
      justifyContent: 'space-evenly',
      alignItems: 'center',
      width: '95%',
      alignSelf: 'center',
    },

    callTypes: {
      color: colors.textThemeColor,
      fontFamily: FONTS.POPPINSBOLD,
      marginVertical: 20,
    },

    callTypeContainer: {
      width: '80%',
      alignSelf: 'center',
    },

    callTypeButton: {
      padding: 10,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 20,
      backgroundColor: colors.backgroundColor,
      marginVertical: 10,
      borderWidth: 0.7,
      borderColor: colors.callLogSubText,
    },

    callTypeSelectedButton: {
      padding: 10,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 20,
      backgroundColor: colors.appPrimaryColor,
      marginVertical: 10,
      borderWidth: 0.7,
      borderColor: colors.textThemeColor,
    },

    callTypeText: {
      color: colors.callLogSubText,
      textTransform: 'capitalize',
      fontFamily: FONTS.POPPINSSEMIBOLD,
      fontSize: fontSize.ThirteenPoint,
    },

    callTypeSelectedText: {
      color: colors.white,
      textTransform: 'capitalize',
      fontFamily: FONTS.POPPINSSEMIBOLD,
      fontSize: fontSize.ThirteenPoint,
    },

    getReportBtn: {
      paddingVertical: 13,
      backgroundColor: colors.appPrimaryColor,
      justifyContent: 'center',
      alignItems: 'center',
      alignSelf: 'center',
      width: '95%',
      borderRadius: 10,
      marginVertical: 10,
    },

    resetBtn: {
      paddingVertical: 13,
      backgroundColor: colors.callLogSubText,
      justifyContent: 'center',
      alignItems: 'center',
      alignSelf: 'center',
      width: '95%',
      borderRadius: 10,
      marginVertical: 10,
    },

    reserGetText: {
      fontSize: fontSize.FifteenPoint,
      fontFamily: FONTS.POPPINSBOLD,
      color: colors.white,
    },
  });

export {reportStyles};

import {StyleSheet} from 'react-native';
import {colors} from '../../assets/constants/colors';
import {fontSize} from '../../assets/constants/fontSize';
import FONTS from '../../assets/constants/fonts';

const callNotesModalStyles = () =>
  StyleSheet.create({
    mainContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
      backgroundColor: `${colors.black}40`,
    },

    subContainer: {
      paddingVertical: 20,
      backgroundColor: colors.backgroundColor,
      width: '90%',
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: 0.7,
      borderColor: colors.grayDark,
      borderRadius: 10,
    },

    rowContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 10,
      borderRadius: 10,
      width: '90%',
    },

    userContainer: {
      flex: 1,
    },

    image: {
      height: fontSize.ThirtyTwoPoint,
      width: fontSize.ThirtyTwoPoint,
      marginRight: 5,
    },
    playIcon: {
      marginBottom: 5,
    },
    playImage: {
      height: fontSize.TwentyEigthPoint,
      width: fontSize.TwentyEigthPoint,
    },
    playContainer: {
      marginRight: 10,
      justifyContent: 'flex-end',
      alignItems: 'flex-end',
    },
    time: {
      fontSize: fontSize.TenPoint,
    },
    name: {
      fontSize: fontSize.FourteenPoint,
      fontFamily: FONTS.POPPINSREGULAR,
      color: colors.callLogText,
    },
    subName: {
      fontSize: fontSize.TwelvePoint,
      fontFamily: FONTS.POPPINSREGULAR,
      color: colors.callLogSubText,
    },

    inputContainer: {
      backgroundColor: colors.noteBackgroundColor,
      borderRadius: 10,
      width: '90%',
      maxHeight: 200,
      minHeight: 200,
      borderWidth: 0.4,
      borderColor: colors.textThemeColor,
      justifyContent: 'center',
      alignItems: 'center',
    },
    input: {
      borderRadius: 10,
      backgroundColor: colors.noteBackgroundColor,
      width: '95%',
      color: colors.black,
      fontSize: fontSize.FifteenPoint,
      fontFamily: FONTS.POPPINSREGULAR,
      minHeight: 190,
      textAlignVertical: 'top',
    },
    btnStyle: {
      width: '90%',
      marginTop: 10,
      borderRadius: 10,
    },
    btnText: {
      fontFamily: FONTS.POPPINSBOLD,
      fontSize: fontSize.FifteenPoint,
    },
    closeBtn: {
      position: 'absolute',
      left: 5,
      top: 5,
      backgroundColor: colors.appPrimaryColor,
      height: 25,
      width: 25,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 15,
    },
    closeBtnText: {color: colors.white, fontSize: fontSize.TenPoint},
  });

export {callNotesModalStyles};

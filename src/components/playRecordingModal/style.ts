import {StyleSheet} from 'react-native';
import {colors} from '../../assets/constants/colors';
import {fontSize} from '../../assets/constants/fontSize';
import FONTS from '../../assets/constants/fonts';

const playRecmodalStyles = () =>
  StyleSheet.create({
    mainContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
      backgroundColor: `${colors.black}20`,
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
      tintColor: colors.textThemeColor,
    },
    closeBtn: {
      marginBottom: 5,
    },

    closeBtnText: {
      fontSize: fontSize.TwentyPoint,
      color: colors.textThemeColor,
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

    playRecordingContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 10,
      width: '90%',
      backgroundColor: colors.callLogBackgroundColor,
      borderRadius: 0,
      paddingHorizontal: 10,
    },

    playImage: {
      height: fontSize.ThirtyFivePoint,
      width: fontSize.ThirtyFivePoint,
    },
    divideImage: {
      height: fontSize.FortyEigthPoint,
      marginHorizontal: 5,
    },

    slider: {
      flex: 1,
    },

    recTime: {
      textAlign: 'right',
      marginRight: 10,
      color: colors.appPrimaryColor,
    },
  });

export {playRecmodalStyles};

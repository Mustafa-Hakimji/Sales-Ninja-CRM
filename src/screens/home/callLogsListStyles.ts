import {StyleSheet} from 'react-native';
import {layout} from '../../assets/constants/layout';
import {colors} from '../../assets/constants/colors';
import FONTS from '../../assets/constants/fonts';
import {fontSize} from '../../assets/constants/fontSize';

const allCallStyles = () =>
  StyleSheet.create({
    container: {
      flex: 1,
      width: layout.window.width,
      backgroundColor: colors.backgroundColor,
    },

    listContainer: {
      paddingVertical: 20,
      marginVertical: 5,
      backgroundColor: colors.callLogBackgroundColor,
      borderRadius: 10,
      width: '90%',
      alignSelf: 'center',
      elevation: 2,
      shadowColor: colors.textThemeColor,
    },

    listRowContainer: {flexDirection: 'row', alignItems: 'center'},

    title: {
      fontFamily: FONTS.POPPINSSEMIBOLD,
      fontSize: fontSize.FifteenPoint,
      color: colors.callLogTitle,
      marginLeft: '5%',
      marginVertical: 10,
    },

    images: {
      height: fontSize.TwentyEigthPoint,
      width: fontSize.TwentyEigthPoint,
      marginHorizontal: 10,
      tintColor: colors.textThemeColor,
    },

    userDetailsContainer: {
      flex: 1,
    },

    playContainer: {
      marginRight: 10,
    },

    playIcon: {alignItems: 'flex-end'},
    playImage: {
      height: fontSize.TwentyEigthPoint,
      width: fontSize.TwentyEigthPoint,
      marginBottom: 5,
    },

    nextImage: {
      height: fontSize.TwentyFivePoint,
      width: fontSize.TwentyFivePoint,
      marginBottom: 5,
      opacity: 0.5,
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

    redirectIconsContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-around',
      width: '100%',
      alignSelf: 'center',
    },

    splitterImages: {
      height: 25,
      width: 25,
      marginTop: 10,
    },

    timeStyle: {
      color: colors.callLogSubText,
      fontSize: fontSize.ElevenPoint,
      textAlign: 'right',
    },
  });

export {allCallStyles};

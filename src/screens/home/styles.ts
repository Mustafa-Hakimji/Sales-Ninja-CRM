import {Dimensions, StyleSheet} from 'react-native';
import {colors} from '../../assets/constants/colors';
import {fontSize} from '../../assets/constants/fontSize';
import FONTS from '../../assets/constants/fonts';

const width = Dimensions.get('window').width;
export const homeScreenStyles = () =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.backgroundColor,
      alignItems: 'center',
    },
    scrollView: {
      flex: 1,
      backgroundColor: colors.lightBackgroundGrey,
    },
    menuList: {
      height: 60,
      backgroundColor: colors.callLogTopTab,
      alignSelf: 'stretch',
      justifyContent: 'space-around',
      alignItems: 'center',
    },
    tab: {
      backgroundColor: colors.callLogTopTab,
      marginRight: 5,
    },
    tabImages: {height: 32, width: 32, tintColor: colors.textThemeColor},

    tabText: {
      color: colors.callLogTitle,
      fontSize: fontSize.ThirteenPoint,
      fontFamily: FONTS.POPPINSREGULAR,
    },

    selectedTabText: {
      color: colors.appPrimaryColor,
      fontSize: fontSize.ThirteenPoint,
      fontFamily: FONTS.POPPINSBOLD,
    },
    selectedTabImage: {
      height: 32,
      width: 32,
      tintColor: colors.appPrimaryColor,
    },

    versionText: {
      alignSelf: 'center',
      marginVertical: 3,
    },
  });

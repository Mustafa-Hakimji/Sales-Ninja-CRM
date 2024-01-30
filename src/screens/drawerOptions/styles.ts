import {StyleSheet} from 'react-native';
import {colors} from '../../assets/constants/colors';
import FONTS from '../../assets/constants/fonts';
import {fontSize} from '../../assets/constants/fontSize';

const drawerScreenStyles = () =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.drawerBackground,
      alignItems: 'center',
    },
    logoutButton: {
      padding: 10,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'steelblue',
      marginVertical: 20,
      width: '80%',
      alignSelf: 'center',
    },
    profileContainer: {
      marginTop: 30,
      alignItems: 'center',
    },

    profileImage: {
      height: 120,
      width: 120,
      borderRadius: 60,
      marginBottom: 20,
    },
    name: {
      fontFamily: FONTS.POPPINSSEMIBOLD,
      fontSize: fontSize.FifteenPoint,
      color: colors.DrawerUserName,
    },
    lastSync: {
      fontFamily: FONTS.POPPINSREGULAR,
      fontSize: fontSize.TwelvePoint,
      color: colors.drawerText,
    },
    lastSyncContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },

    lastSyncImage: {
      width: 30,
      height: 30,
      borderRadius: 15,
      tintColor: colors.drawerText,
    },
    noBottonWidth: {
      borderBottomWidth: 0,
    },
    divider: {
      width: '100%',
      borderBottomWidth: 0.5,
      borderBottomColor: colors.drawerBottonline,
      marginBottom: 20,
    },

    brandImage: {
      height: 60,
      width: 60,
      borderRadius: 30,
      marginRight: 10,
    },

    brandContainer: {
      position: 'absolute',
      bottom: 10,
      alignItems: 'center',
      width: '95%',
      // backgroundColor: 'black',
    },

    logoContainer: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'center',
      width: '60%',
    },

    nameTheme: {
      fontFamily: FONTS.POPPINSBOLD,
      fontSize: fontSize.EighteenPoint,
      color: colors.appPrimaryColor,
    },
    nameSimple: {
      fontSize: fontSize.EighteenPoint,
      color: colors.textThemeColor,
      fontFamily: FONTS.POPPINSBOLD,
    },

    versionContainer: {
      borderRadius: 20,
      width: '100%',
      alignItems: 'center',
    },
    versionText: {
      fontSize: fontSize.NinePoint,
      fontFamily: FONTS.POPPINSREGULAR,
      marginVertical: 5,
      color: colors.drawerText,
    },
  });

const optionStyles = () =>
  StyleSheet.create({
    container: {
      alignSelf: 'flex-start',
      marginLeft: 20,
      marginVertical: 10,
      borderBottomWidth: 0.5,
      borderBottomColor: colors.drawerBottonline,
      width: '60%',
      maxWidth: '100%',
    },
    text: {
      fontFamily: FONTS.POPPINSMEDIUM,
      marginBottom: 5,
      fontSize: fontSize.FourteenPoint,
      color: colors.drawerText,
    },
  });

export {drawerScreenStyles, optionStyles};

import {StyleSheet} from 'react-native';
import {colors} from '../../assets/constants/colors';
import FONTS from '../../assets/constants/fonts';
import {fontSize} from '../../assets/constants/fontSize';

const settingsStyles = () =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.backgroundColor,
      alignItems: 'center',
    },

    noBorder: {
      borderBottomWidth: 0,
    },

    // Options Component Styles
    optionsContainer: {
      flexDirection: 'row',
      width: '90%',
      //   backgroundColor: 'steelblue',
      marginVertical: 5,
      alignItems: 'center',
    },
    image: {
      height: 30,
      width: 30,
      tintColor: colors.textThemeColor,
    },
    subOptionContainer: {
      flexDirection: 'row',
      width: '88%',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginLeft: 12,
      borderBottomWidth: 1,
      borderColor: colors.optionsBorderColor,
      paddingVertical: 15,
    },
    text: {
      color: colors.textThemeColor,
      fontFamily: FONTS.POPPINSREGULAR,
      fontSize: fontSize.ThirteenPoint,
    },

    pathText: {
      color: colors.pathColor,
      fontFamily: FONTS.POPPINSREGULAR,
      fontSize: fontSize.TwelvePoint,
    },
    endImage: {
      height: 15,
      tintColor: colors.optionsBorderColor,
    },
  });

export {settingsStyles};

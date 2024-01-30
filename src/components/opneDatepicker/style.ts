import {StyleSheet} from 'react-native';
import FONTS from '../../assets/constants/fonts';
import {fontSize} from '../../assets/constants/fontSize';
import {colors} from '../../assets/constants/colors';

const openPickerStyles = () =>
  StyleSheet.create({
    btnRowContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      borderWidth: 0.7,
      borderColor: colors.appPrimaryColor,
      borderRadius: 10,
      padding: 10,
    },

    calendarImage: {
      height: 30,
      width: 30,
      tintColor: colors.appPrimaryColor,
      marginRight: 10,
    },

    titleText: {
      fontFamily: FONTS.POPPINSREGULAR,
      fontSize: fontSize.NinePoint,
      color: colors.callLogSubText,
    },

    selectedDate: {
      fontFamily: FONTS.POPPINSREGULAR,
      fontSize: fontSize.ThirteenPoint,
      color: colors.textThemeColor,
    },
  });

export {openPickerStyles};

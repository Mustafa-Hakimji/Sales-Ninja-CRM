import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {colors} from '../../assets/constants/colors';
import FONTS from '../../assets/constants/fonts';
import {fontSize} from '../../assets/constants/fontSize';

type Props = {
  isTouchable: boolean;
  text: string;
};
const Footer = ({isTouchable, text}: Props) => {
  return (
    <>
      {isTouchable ? (
        <TouchableOpacity
          hitSlop={{bottom: 10, top: 10}}
          style={styles.footerContainer}
          activeOpacity={0.8}>
          <Text style={[styles.containerText, {color: colors.textThemeColor}]}>
            {text}
          </Text>
        </TouchableOpacity>
      ) : (
        <Text style={styles.footer}>{text}</Text>
      )}
    </>
  );
};

export default Footer;

const styles = StyleSheet.create({
  footer: {
    position: 'absolute',
    bottom: 20,
    textAlign: 'center',
    color: colors.fadeWhite,
    fontFamily: FONTS.POPPINSREGULAR,
  },
  footerContainer: {
    position: 'absolute',
    bottom: 20,
    justifyContent: 'center',
    width: '100%',
    alignItems: 'center',
  },
  containerText: {
    color: colors.fadeWhite,
    fontFamily: FONTS.POPPINSREGULAR,
    fontSize: fontSize.TwelvePoint,
  },
});

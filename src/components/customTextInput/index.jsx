import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Image,
  Platform,
} from 'react-native';
import FONTS from '../../assets/constants/fonts';
import {fontSize} from '../../assets/constants/fontSize';
import {colors} from '../../assets/constants/colors';
// import CustomDropDown from '../customDropDown';
import {layout} from '../../assets/constants/layout';

const textInputFontSize = Platform.select({
  android: layout.window.width >= 600 ? 15 : fontSize.ThirteenPoint,
  ios: fontSize.ThirteenPoint,
});

const inputStyles = () =>
  StyleSheet.create({
    container: {
      alignSelf: 'stretch',
      marginVertical: 10,
    },
    inputView: {
      borderWidth: 0.8,
      borderColor:
        colors.backgroundColor === colors.backgroundLight
          ? colors.backgroundDark
          : colors.inputBordergrey,
      width: '95%',
      alignSelf: 'center',
      borderRadius: 6,
    },
    headerText: {
      color: colors.black,
      fontFamily: FONTS.POPPINSREGULAR,
      fontSize: fontSize.FourteenPoint,
      alignSelf: 'stretch',
    },
    inputContainer: {
      alignSelf: 'stretch',
      flexDirection: 'row',
    },
    dropDownView: {
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: 5,
    },
    dropDown: {
      borderBottomWidth: 0,
      borderBottomColor: 'transparent',
    },
    textStyles: {
      flex: null,
      marginVertical: 0,
      marginBottom: 2,
    },
    leftView: {
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: 15,
    },
    input: {
      color: colors.textThemeColor,
      fontSize: fontSize.ThirteenPoint,
      fontFamily: FONTS.POPPINSREGULAR,
      paddingVertical: 15,
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 15,
      // backgroundColor: 'blue',
    },
    button: {
      width: 40,
      height: 40,
      alignItems: 'center',
      justifyContent: 'center',
      alignSelf: 'center',
    },
    image: {
      width: 30,
      height: 30,
      tintColor: colors.textThemeColor,
    },
    rightImage: {width: 12, height: 12},
    bottomText: {
      color: colors.black,
      fontFamily: FONTS.POPPINSBOLD,
      fontSize: fontSize.TenPoint,
      alignSelf: 'stretch',
    },
  });

const CustomTextInputComponent = ({
  showHeader = false,
  header = '',
  placeHolder = '',
  value = '',
  secureTextEntry = false,
  inputStyle = {},
  onChangeText = e => {},
  onFocus = () => {},
  onBlur = () => {},
  editable = true,
  autoCorrect = false,
  keyboardType = 'default',
  multiline = false,
  capitalize = false,
  maxLength = null,

  textInputRef = () => null,

  showLeftView = false,
  leftImage = null,
  leftImageStyles = {},

  showRightView = false,
  rightImage = null,
  isLoading = false,
  rightAction = () => null,

  showBottomText = false,
  bottomText = '',
}) => {
  const styles = inputStyles();
  const [isfocussed, toggleFocussed] = useState(false);
  const [showtoggle, togglePasswordVisibility] = useState(secureTextEntry);

  let autoCapitalize = 'sentences';
  if (keyboardType === 'email-address') {
    autoCapitalize = 'none';
  }
  if (capitalize) {
    autoCapitalize = 'characters';
  }
  const focusedViewStyles = isfocussed
    ? {borderColor: colors.appPrimaryColor}
    : {};
  const focussedHeaderStyle = isfocussed ? {color: colors.appPrimaryColor} : {};
  const leftImageFocusedStyle = isfocussed
    ? {tintColor: colors.appPrimaryColor}
    : {};

  return (
    <View style={styles.container}>
      <View style={[styles.inputView, focusedViewStyles]}>
        <View style={styles.inputContainer}>
          {showLeftView && (
            <View style={styles.leftView}>
              <Image
                style={[styles.image, leftImageStyles, leftImageFocusedStyle]}
                source={leftImage}
              />
            </View>
          )}
          <TextInput
            ref={ref => textInputRef(ref)}
            secureTextEntry={showtoggle}
            editable={editable}
            value={value}
            placeholder={placeHolder}
            placeholderTextColor={colors.textThemeColor}
            autoCorrect={autoCorrect}
            autoCapitalize={autoCapitalize}
            style={[styles.input, {width: secureTextEntry ? '85%' : '100%'}]}
            onChangeText={text => onChangeText(text)}
            maxLength={maxLength}
            onFocus={() => {
              onFocus();
              toggleFocussed(true);
            }}
            onBlur={() => {
              onBlur();
              toggleFocussed(false);
            }}
            keyboardType={keyboardType}
            multiline={multiline}
          />
          {secureTextEntry && (
            <TouchableOpacity
              style={styles.button}
              onPress={() => togglePasswordVisibility(!showtoggle)}>
              <Image
                resizeMode="contain"
                style={styles.image}
                source={
                  showtoggle
                    ? require('../../assets/images/login/show.png')
                    : require('../../assets/images/login/hide.png')
                }
              />
            </TouchableOpacity>
          )}

          {showRightView && isLoading && (
            <View style={styles.button}>
              <ActivityIndicator animating size="small" color={colors.black} />
            </View>
          )}
          {showRightView && !isLoading && (
            <TouchableOpacity
              hitSlop={{top: 20, left: 20, bottom: 20, right: 20}}
              style={styles.button}
              onPress={() => rightAction()}>
              <Image
                source={rightImage}
                resizeMode={'contain'}
                style={styles.rightImage}
              />
            </TouchableOpacity>
          )}
        </View>
      </View>
      {showBottomText && <Text style={styles.bottomText}>{bottomText}</Text>}
    </View>
  );
};

export const CustomTextInput = React.memo(CustomTextInputComponent);

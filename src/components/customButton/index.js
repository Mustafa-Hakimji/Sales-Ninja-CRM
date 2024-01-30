import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Animated,
} from 'react-native';
import {colors} from '../../assets/constants/colors';
import FONTS from '../../assets/constants/fonts';
import {fontSize} from '../../assets/constants/fontSize';

const buttonStyles = () =>
  StyleSheet.create({
    button: {
      backgroundColor: colors.appPrimaryColor,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: 20,
      paddingVertical: 10,
    },
    underLineView: {
      backgroundColor: colors.appPrimaryColor,
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      height: 2,
    },
    image: {
      width: 20,
      height: 20,
      marginHorizontal: 8,
    },
    buttonText: {
      color: colors.white,
      fontFamily: FONTS.ClanProMedium,
      fontSize: fontSize.FifteenPoint,
    },
    underLineStyle: {
      borderBottomWidth: 2,
      borderBottomColor: colors.appPrimaryColor,
    },
    selectedView: {
      width: 20,
      height: 20,
      borderRadius: 10,
      borderWidth: 1,
      borderColor: colors.appPrimaryColor,
      alignItems: 'center',
      justifyContent: 'center',
      marginHorizontal: 10,
    },
    selectedInnerView: {
      width: 12,
      height: 12,
      borderRadius: 6,
      backgroundColor: colors.appPrimaryColor,
    },

    animatedButtonBG: {
      backgroundColor: colors.appPrimaryColor,
    },
    animatedButtonContainer: {
      paddingHorizontal: 0,
      paddingVertical: 0,
    },
    animatedButton: {
      flex: 1,
      paddingHorizontal: 0,
      paddingVertical: 0,
      backgroundColor: colors.transparent,
    },

    // Button image styles
    buttonImageContainer: {
      backgroundColor: colors.transparent,
      alignItems: 'center',
      justifyContent: 'center',
    },
    buttonImage: {
      width: 30,
      height: 30,
    },

    // Top Image Button
    topbutton: {
      backgroundColor: colors.appPrimaryColor,
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: 20,
      paddingVertical: 10,
    },
  });

const CustomButtonComponent = ({
  onPress = () => {},
  onLongPress = () => {},
  onPressIn = () => {},
  onPressOut = () => {},
  disabled = false,
  text = '',
  buttonStyle = {},
  textStyle = {},
  image = null,
  imageStyle = {},
  rightImage = null,
  showSelection = false,
  isSelected = false,
  showUnderLine = false,
  numberOfLines = 5,
  activeOpacity = 1,
}) => {
  const styles = buttonStyles();
  let selectedViewStyle = {};
  let selectedInnerViewStyle = {};
  if (showSelection) {
    if (isSelected) {
      selectedViewStyle = {borderColor: colors.appPrimaryColor};
      selectedInnerViewStyle = {backgroundColor: colors.appPrimaryColor};
    } else {
      selectedViewStyle = {borderColor: colors.lightgrey};
      selectedInnerViewStyle = {backgroundColor: colors.lightgrey};
    }
  }
  return (
    <TouchableOpacity
      activeOpacity={activeOpacity}
      disabled={disabled}
      style={[styles.button, buttonStyle]}
      onPress={() => onPress()}
      onPressIn={onPressIn}
      onPressOut={onPressOut}
      onLongPress={() => onLongPress()}>
      {image && (
        <Image
          style={[styles.image, imageStyle]}
          source={image}
          resizeMode="contain"
        />
      )}
      {showSelection && (
        <View style={[styles.selectedView, selectedViewStyle]}>
          <View style={[styles.selectedInnerView, selectedInnerViewStyle]} />
        </View>
      )}
      <Text
        style={[styles.buttonText, textStyle]}
        numberOfLines={numberOfLines}>
        {text}
      </Text>
      {rightImage && (
        <Image
          style={[styles.image, imageStyle]}
          source={rightImage}
          resizeMode="contain"
        />
      )}
      {showUnderLine && <View style={styles.underLineView} />}
    </TouchableOpacity>
  );
};

export const CustomImageButton = ({
  onPress = () => {},
  onLongPress = () => {},
  disabled = false,
  containerStyle = {},
  image = null,
  imageStyle = {},
  otherProps = {},
}) => {
  const styles = buttonStyles();

  return (
    <TouchableOpacity
      style={[styles.buttonImageContainer, containerStyle]}
      activeOpacity={0.9}
      disabled={disabled}
      onPress={onPress}
      onLongPress={onLongPress}
      {...otherProps}>
      <Image
        style={[styles.buttonImage, imageStyle]}
        resizeMode={'contain'}
        source={image}
      />
    </TouchableOpacity>
  );
};

const CustomAnimatedButtonComponent = props => {
  const styles = buttonStyles();
  const scaleAnimation = new Animated.Value(1);
  const onPressIn = () => {
    Animated.spring(scaleAnimation, {
      toValue: 0.95,
      useNativeDriver: false,
      isInteraction: false,
    }).start();
  };
  const onPressOut = () => {
    Animated.spring(scaleAnimation, {
      toValue: 1,
      useNativeDriver: false,
      isInteraction: false,
    }).start();
  };
  const scale = {transform: [{scale: scaleAnimation}]};
  const customStyles = {
    paddingHorizontal: 20,
    paddingVertical: 10,
  };
  if (props.buttonStyle && props.buttonStyle.paddingHorizontal) {
    customStyles.paddingHorizontal = props.buttonStyle.paddingHorizontal;
  }
  if (props.buttonStyle && props.buttonStyle.paddingVertical) {
    customStyles.paddingVertical = props.buttonStyle.paddingVertical;
  }
  if (props.buttonStyle && props.buttonStyle.padding) {
    customStyles.padding = props.buttonStyle.padding;
  }

  return (
    <Animated.View
      style={[
        styles.animatedButtonBG,
        props.buttonStyle,
        styles.animatedButtonContainer,
        scale,
      ]}>
      <CustomButtonComponent
        {...props}
        buttonStyle={[styles.animatedButton, customStyles]}
        onPressIn={onPressIn}
        onPressOut={onPressOut}
      />
    </Animated.View>
  );
};

export const CustomButtonWithTopImage = ({
  onPress = () => {},
  onLongPress = () => {},
  onPressIn = () => {},
  onPressOut = () => {},
  disabled = false,
  text = '',
  buttonStyle = {},
  textStyle = {},
  image = null,
  imageStyle = {},
}) => {
  const styles = buttonStyles();

  return (
    <TouchableOpacity
      disabled={disabled}
      style={[styles.topbutton, buttonStyle]}
      onPress={() => onPress()}
      onPressIn={onPressIn}
      onPressOut={onPressOut}
      onLongPress={() => onLongPress()}>
      <Image style={[styles.image, imageStyle]} source={image} />
      <Text style={[styles.buttonText, textStyle]}>{text}</Text>
    </TouchableOpacity>
  );
};

export const CustomButton = React.memo(CustomButtonComponent);
export const CustomAnimatedButton = React.memo(CustomAnimatedButtonComponent);

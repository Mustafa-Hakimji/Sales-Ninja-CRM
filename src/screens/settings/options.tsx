import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {settingsStyles} from './styles';

type Props = {
  title: string;
  onPress: any;
  style?: any | {};
  imageSource: any;
  path?: string;
};
const SettingOptions = ({title, onPress, style, imageSource, path}: Props) => {
  const styles = settingsStyles();
  return (
    <TouchableOpacity
      activeOpacity={0.5}
      onPress={onPress}
      style={styles.optionsContainer}>
      <Image style={styles.image} source={imageSource} />
      <View style={[styles.subOptionContainer, style]}>
        <View>
          <Text style={styles.text}>{title}</Text>
          {path && <Text style={styles.pathText}>{path}</Text>}
        </View>
        <Image
          style={styles.endImage}
          source={require('../../assets/images/settingsPage/greater.png')}
        />
      </View>
    </TouchableOpacity>
  );
};

export default SettingOptions;

const styles = StyleSheet.create({});

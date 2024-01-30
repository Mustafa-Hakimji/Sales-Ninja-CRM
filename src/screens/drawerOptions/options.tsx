import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {optionStyles} from './styles';

type Props = {
  title: string;
  onPress: any;
  style?: any | {};
};
const Options = ({onPress, title, style = {}}: Props) => {
  const styles = optionStyles();
  return (
    <TouchableOpacity
      activeOpacity={0.5}
      style={[styles.container, style]}
      onPress={onPress}>
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
};

export default Options;

const styles = StyleSheet.create({});

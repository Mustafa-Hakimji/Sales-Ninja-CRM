import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';

type Props = {
  imageStyles?: {} | any;
  imagePath: any;
  onPress?: any;
};

const ImageIcons = ({imageStyles, imagePath, onPress}: Props) => {
  return (
    <TouchableOpacity activeOpacity={0.5} onPress={onPress}>
      <Image style={imageStyles} source={imagePath} />
    </TouchableOpacity>
  );
};

export default ImageIcons;

const styles = StyleSheet.create({});

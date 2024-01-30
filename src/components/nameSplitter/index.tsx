import {View, Text} from 'react-native';
import React from 'react';
import {nameSplitterStyles} from './styles';

const NameSplitter = () => {
  const styles = nameSplitterStyles();
  return <View style={styles.splitter} />;
};

export default NameSplitter;

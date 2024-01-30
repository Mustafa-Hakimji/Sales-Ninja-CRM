import {StyleSheet} from 'react-native';
import {colors} from '../../assets/constants/colors';

const nameSplitterStyles = () =>
  StyleSheet.create({
    splitter: {
      alignSelf: 'center',
      width: '80%',
      borderWidth: 0.5,
      borderColor: colors.callLogListSplitter,
      marginVertical: 10,
    },
  });

export {nameSplitterStyles};

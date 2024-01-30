import {Text, View} from 'react-native';
import {splitterStyles} from './styles';

const Splitter = () => {
  const styles = splitterStyles();

  return (
    <View style={styles.orContainer}>
      <View style={styles.orLineView} />
      <Text style={styles.orText}> OR </Text>
      <View style={styles.orLineView} />
    </View>
  );
};

export default Splitter;

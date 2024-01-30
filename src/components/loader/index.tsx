import {ActivityIndicator, View} from 'react-native';
import {colors} from '../../assets/constants/colors';
import {loaderStyles} from './styles';

const ActivityLoader = () => {
  const styles = loaderStyles();

  return (
    <View style={styles.container}>
      <ActivityIndicator
        animating
        color={colors.appPrimaryColor}
        size={'large'}
      />
    </View>
  );
};

export default ActivityLoader;

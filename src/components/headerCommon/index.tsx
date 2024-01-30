import {
  Image,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import {headerStyles} from './style';
import {colors} from '../../assets/constants/colors';

type Props = {
  screen: string;
};
const Header = ({screen = 'Home'}: Props) => {
  const styles = headerStyles();
  const navigation = useNavigation();
  useEffect(() => {
    StatusBar.setBackgroundColor(colors.appPrimaryColor);
    StatusBar.setBarStyle('light-content');
  }, []);
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => {
          if (screen === 'Home') {
            navigation?.openDrawer();
          } else {
            navigation.goBack();
          }
        }}
        style={styles.options}>
        {screen === 'Home' ? (
          <Image
            style={styles.icon}
            source={require('../../assets/images/menuSmall.png')}
          />
        ) : (
          <Image
            style={styles.backIcon}
            source={require('../../assets/images/back.png')}
          />
        )}
      </TouchableOpacity>
      <View style={styles.screenName}>
        <Text style={styles.heading}>{screen}</Text>
      </View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({});

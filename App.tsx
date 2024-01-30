import 'react-native-gesture-handler';
import {SafeAreaView, StatusBar, StyleSheet, View} from 'react-native';
import React, {useEffect} from 'react';
import {AppNavigator} from './src/navigation';
import ContextProvider from './src/context/contextProvider';
import {colors} from './src/assets/constants/colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundColor,
  },
});

const App = () => {
  return (
    <ContextProvider>
      <SafeAreaView style={styles.container}>
        <View style={styles.container}>
          <AppNavigator />
        </View>
      </SafeAreaView>
    </ContextProvider>
  );
};

export default App;

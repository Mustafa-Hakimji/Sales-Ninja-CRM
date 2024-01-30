import {Text, View, Image, TouchableOpacity, Alert} from 'react-native';
import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';

import {CustomTextInput} from '../../components/customTextInput';
import {CustomButton} from '../../components/customButton';
import Splitter from '../../components/splitter';
import Footer from '../../components/footer';
import {setStorageItem} from '../../utils/asyncStorage';
import {validateEmail} from '../../utils/functions';
import {api} from '../../utils/ApiManager/api';
import {API_URLS} from '../../utils/ApiManager/urls';
import {showToast} from '../../utils/helpers/toast';
import {setToken} from '../../utils/contentManager/contentManager';
import {asyncStorageKeys} from '../../assets/constants/asyncStorageKeys';
import {appNavigationStates} from '../../assets/constants/appConstants';
import {signInStyles} from './styles';
import {demoLogin} from '../../assets/constants/credentials';
import {AppNavigator} from '../../navigation';

const SignIn = () => {
  const styles = signInStyles();
  const navigation = useNavigation();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [loading, setLoading] = useState(false);

  const getAccessToken = async () => {
    if (!email || !password) {
      Alert.alert('Both fields are required');
      return;
    }

    if (validateEmail(email)) {
      Alert.alert('Please enter a valid Email !!');
      return;
    }
    try {
      setLoading(true);
      const response = await api({
        url: API_URLS.EMPLOYEE_LOGIN,
        data: {
          email,
          password,
          appVersion: '1.0',
          deviceName: 'POCO F5',
        },
      });

      if (response?.status === 200) {
        const token = response?.data?.data?.token;
        await setStorageItem(asyncStorageKeys.authToken, token);
        setToken(token);
        setLoading(false);
        setEmail('');
        setPassword('');
        AppNavigator.appNavigatorRef.setState({
          navigationStack: appNavigationStates.user,
        });
      }
    } catch (error) {
      setLoading(false);
      console.log('Error while signing in ', error);
      showToast(error?.response?.data?.message);
    }
  };

  return (
    <View style={styles.mainContainerCenter}>
      <KeyboardAwareScrollView style={styles.keyboardViewContainer}>
        <Image
          style={styles.image}
          source={require('../../assets/images/logo.png')}
        />
        <Text style={styles.headingTxt}>Sign In</Text>

        <CustomTextInput
          value={email}
          placeHolder="Email address"
          onChangeText={e => setEmail(e)}
          keyboardType="email-address"
        />

        <CustomTextInput
          secureTextEntry={true}
          value={password}
          placeHolder="Password"
          onChangeText={e => setPassword(e)}
        />

        <CustomButton
          disabled={loading}
          text={loading ? 'Loading...' : 'CONTINUE'}
          textStyle={styles.buttonTextStyle}
          buttonStyle={styles.button}
          onPress={getAccessToken}
        />

        <TouchableOpacity
          onPress={() => navigation.navigate('Forgot')}
          style={styles.forgotContainer}
          activeOpacity={0.8}>
          <Text style={styles.forgot}>FORGOT PASSWORD</Text>
        </TouchableOpacity>

        <Splitter />

        <TouchableOpacity
          style={styles.dontHaveContainer}
          onPress={() => navigation.navigate('SignUp')}
          activeOpacity={0.8}>
          <Text style={styles.textDontHave}>
            Don't have an account?{' '}
            <Text style={styles.textSignUp}>SIGN UP</Text>
          </Text>
        </TouchableOpacity>
        <Footer isTouchable={true} text={'Terms of use | Privacy policy'} />
      </KeyboardAwareScrollView>
    </View>
  );
};

export default SignIn;

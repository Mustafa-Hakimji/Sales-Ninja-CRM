import {Image, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';

import {CustomTextInput} from '../../components/customTextInput';
import {CustomButton} from '../../components/customButton';
import Splitter from '../../components/splitter';
import Footer from '../../components/footer';
import {validateEmail} from '../../utils/functions';
import {api} from '../../utils/ApiManager/api';
import {API_URLS} from '../../utils/ApiManager/urls';
import {showToast} from '../../utils/helpers/toast';
import {messages} from '../../utils/helpers/errorMessages';
import {forgotStyles} from './styles';

const ForgotPassword = () => {
  const styles = forgotStyles();

  const navigation = useNavigation();

  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const resetPassword = async () => {
    if (validateEmail(email)) {
      showToast(messages.INVALID_EMAIL);
      return;
    }
    try {
      setLoading(true);
      const response = await api({
        url: API_URLS.EMPLOYEE_FORGOTPASSWORD,
        data: {email},
      });
      if (response?.status === 200) {
        showToast(response?.data?.message);
        setLoading(false);
        setEmail('');
        setTimeout(() => navigation.navigate('SignIn'), 2000);
        return;
      }
    } catch (error) {
      showToast(error?.response?.data?.message);
      setLoading(false);
    }
  };

  return (
    <View style={styles.mainContainercenter}>
      <KeyboardAwareScrollView style={styles.keyboardViewContainer}>
        <Image
          style={styles.image}
          source={require('../../assets/images/logo.png')}
        />
        <Text style={styles.headingTxt}>Forgot Password</Text>

        <CustomTextInput
          value={email}
          placeHolder="Email address"
          onChangeText={e => setEmail(e)}
          keyboardType="email-address"
        />

        <CustomButton
          disabled={loading}
          text={loading ? 'Loading...' : 'CONTINUE'}
          textStyle={styles.buttonTextStyle}
          buttonStyle={styles.button}
          onPress={resetPassword}
        />

        <TouchableOpacity
          onPress={() => navigation.navigate('SignIn')}
          style={styles.forgotButton}
          activeOpacity={0.8}>
          <Text style={styles.forgot}>SIGN IN</Text>
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

export default ForgotPassword;

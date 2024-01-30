import {
  Alert,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';

import {CustomButton} from '../../components/customButton';
import {CustomTextInput} from '../../components/customTextInput';
import Footer from '../../components/footer';
import {validateEmail, validatePhoneNumber} from '../../utils/functions';
import {api} from '../../utils/ApiManager/api';
import {API_URLS} from '../../utils/ApiManager/urls';
import {useNavigation} from '@react-navigation/native';
import {showToast} from '../../utils/helpers/toast';
import {messages} from '../../utils/helpers/errorMessages';
import {signUpStyles} from './styles';

const SignUp = () => {
  const styles = signUpStyles();
  const navigation = useNavigation();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [org, setOrg] = useState('ANO-8749-9201');
  const [loading, setLoading] = useState(false);

  const handleSignUp = async () => {
    if (!name || !mobile || !email || !org) {
      showToast(messages.EMPTY_FIELDS);
      return;
    }

    if (validateEmail(email)) {
      showToast(messages.INVALID_EMAIL);
      return;
    }

    if (validatePhoneNumber(mobile)) {
      showToast(messages.INVALID_MOBILE);
      return;
    }

    try {
      setLoading(true);
      const response = await api({
        url: API_URLS.EMPLOYEE_SIGNUP,
        data: {
          fullName: name,
          email,
          mobileNumber: mobile,
          organizationId: org,
        },
      });

      if (response?.status === 200) {
        setLoading(false);
        showToast(messages.SIGNUP_SUCCESS);
        setName('');
        setEmail('');
        setMobile('');
        setOrg('');
      }
      navigation.navigate('SignIn');
    } catch (error) {
      console.log('err', error?.response?.data);
      showToast(error?.response?.data?.message);
      setLoading(false);
    }
  };

  return (
    <View style={styles.containerCenter}>
      <KeyboardAwareScrollView style={styles.keyboardViewContainer}>
        <Image
          style={styles.image}
          source={require('../../assets/images/logo.png')}
        />
        <Text style={styles.headingTxt}>Sign Up</Text>

        <CustomTextInput
          value={name}
          onChangeText={e => setName(e)}
          placeHolder="Full Name"
          keyboardType="email-address"
        />
        <CustomTextInput
          value={mobile}
          onChangeText={e => setMobile(e)}
          placeHolder="Mobile Number"
          keyboardType="email-address"
        />

        <CustomTextInput
          value={org}
          onChangeText={e => setOrg(e)}
          placeHolder="Organisation ID"
          keyboardType="email-address"
        />

        <CustomTextInput
          value={email}
          onChangeText={e => setEmail(e)}
          placeHolder="Official Email ID"
          keyboardType="email-address"
        />

        <CustomButton
          disabled={loading}
          text={loading ? 'Loading...' : 'CONTINUE'}
          textStyle={styles.buttonTextStyle}
          buttonStyle={styles.button}
          onPress={handleSignUp}
        />

        <TouchableOpacity
          onPress={() => navigation.navigate('SignIn')}
          activeOpacity={0.8}
          style={styles.haveAccount}>
          <Text style={styles.textDontHave}>
            I have an account? <Text style={styles.textSignUp}>SIGN IN</Text>
          </Text>
        </TouchableOpacity>
        <Footer isTouchable={true} text={'Terms of use | Privacy policy'} />
      </KeyboardAwareScrollView>
    </View>
  );
};

export default SignUp;

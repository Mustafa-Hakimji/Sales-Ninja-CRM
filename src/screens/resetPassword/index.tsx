import {Text, View, Image} from 'react-native';
import React, {useState} from 'react';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';

import {resetPasswordStyles} from './styles';
import {CustomTextInput} from '../../components/customTextInput';
import {CustomButton} from '../../components/customButton';
import {useNavigation} from '@react-navigation/native';
import {messages} from '../../utils/helpers/errorMessages';
import {api} from '../../utils/ApiManager/api';
import {METHOD_TYPE} from '../../utils/ApiManager/apiHandler';
import {showToast} from '../../utils/helpers/toast';
import Footer from '../../components/footer';
import {API_URLS} from '../../utils/ApiManager/urls';
import {logoutActions} from '../../utils/functions';
import Header from '../../components/headerCommon';

const ResetPassword = () => {
  const styles = resetPasswordStyles();
  const navigation = useNavigation();

  const [oldPass, setoldpass] = useState('');
  const [newPass, setNewPass] = useState('');
  const [verifyPass, setVerifyPass] = useState('');
  const [loading, setLoading] = useState(false);

  const resetPassword = async () => {
    setLoading(true);
    if (!oldPass || !newPass) {
      showToast(messages.EMPTY_FIELDS);
      return;
    }

    if (newPass !== verifyPass) {
      showToast(messages.NOT_SAME);
      return;
    }

    try {
      setLoading(true);
      const response = await api({
        method: METHOD_TYPE.PATCH,
        url: API_URLS.RESET_PASSWORD,
        data: {oldPassword: oldPass, newPassword: newPass},
      });

      if (response?.status === 201) {
        showToast(response?.data?.message);
        setTimeout(() => logoutActions(), 1500);
        setLoading(false);
      }
    } catch (error) {
      console.log(error?.response?.data);
      setLoading(false);
    }
    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <Header screen="Reset Password" />
      <KeyboardAwareScrollView style={styles.keyboardViewContainer}>
        <Image
          style={styles.image}
          source={require('../../assets/images/logo.png')}
        />
        <Text style={styles.headingTxt}>Reset Password</Text>

        <CustomTextInput
          secureTextEntry={true}
          value={oldPass}
          placeHolder="Old Password"
          onChangeText={e => setoldpass(e)}
        />

        <CustomTextInput
          secureTextEntry={true}
          value={newPass}
          placeHolder="New Password"
          onChangeText={e => setNewPass(e)}
        />

        <CustomTextInput
          secureTextEntry={true}
          value={verifyPass}
          placeHolder="Verify Password"
          onChangeText={e => setVerifyPass(e)}
        />

        <CustomButton
          disabled={loading}
          text={loading ? 'Loading...' : 'CONTINUE'}
          textStyle={styles.buttonTextStyle}
          buttonStyle={styles.button}
          onPress={resetPassword}
        />

        <Footer isTouchable={true} text={'Terms of use | Privacy policy'} />
      </KeyboardAwareScrollView>
    </View>
  );
};

export default ResetPassword;

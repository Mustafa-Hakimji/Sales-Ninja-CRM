import {StyleSheet, Text, View, Image, Alert} from 'react-native';
import React, {useEffect, useState} from 'react';

import {settingsStyles} from './styles';
import SettingOptions from './options';
import Header from '../../components/headerCommon';
import {screenName} from '../../assets/constants/screenNames';
import {settingOptions} from './settingOptions';
import SelectThemeModal from '../../components/selectTheme';
import {useNavigation} from '@react-navigation/native';
import {pickRecordingsPath} from '../../utils/functions';
import {getStorageItems} from '../../utils/asyncStorage';
import {asyncStorageKeys} from '../../assets/constants/asyncStorageKeys';
import {useContextHook} from '../../context/contextProvider';
import {syncCallLogs} from '../../utils/helpers/callLogsFunctions';

const Settings = () => {
  const styles = settingsStyles();

  const [loading, setLoading] = useState(false);

  const {recPath, setRecPath} = useContextHook();

  const getCurrentRecordingPath = async () => {
    const path = await getStorageItems(asyncStorageKeys.recordingsPath);
    setRecPath(path);
  };

  const navigation = useNavigation();

  const settingOptionsList = [
    {
      name: settingOptions.theme,
      image: require('../../assets/images/settingsPage/theme.png'),
    },
    {
      name: loading ? settingOptions.syncing : settingOptions.sync,
      image: require('../../assets/images/sync.png'),
    },
    {
      name: settingOptions.path,
      image: require('../../assets/images/settingsPage/recording.png'),
      path: recPath,
    },
    {
      name: settingOptions.resetPassword,
      image: require('../../assets/images/settingsPage/resetPass.png'),
      //   style: styles.noBorder,
    },
  ];

  const [modalVisible, setModalVisible] = useState(false);

  const action = (screenName: string) => {
    switch (screenName) {
      case settingOptions.theme:
        setModalVisible(true);

        break;

      case settingOptions.sync:
        syncCalls();
        break;

      case settingOptions.path:
        pickRecordingsPath(true);

        break;

      case settingOptions.resetPassword:
        navigation.navigate('ResetPassword');

        break;

      default:
        break;
    }
  };

  const syncCalls = async () => {
    setLoading(true);
    await syncCallLogs(true, true);
    setLoading(false);
  };

  useEffect(() => {
    getCurrentRecordingPath();
  }, []);

  return (
    <View style={styles.container}>
      <Header screen={screenName.setting} />

      {settingOptionsList.map((option, index) => (
        <SettingOptions
          key={`options_${index}`}
          title={option.name}
          onPress={() => action(option.name)}
          imageSource={option.image}
          path={option.path}
        />
      ))}
      {modalVisible && (
        <SelectThemeModal visible={modalVisible} setVisible={setModalVisible} />
      )}
    </View>
  );
};

export default Settings;

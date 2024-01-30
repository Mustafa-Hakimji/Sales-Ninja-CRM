import {
  Modal,
  Text,
  View,
  useColorScheme,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';

import {getStorageItems, setStorageItem} from '../../utils/asyncStorage';
import {
  appNavigationStates,
  appThemes,
} from '../../assets/constants/appConstants';
import {asyncStorageKeys} from '../../assets/constants/asyncStorageKeys';
import {selectThemeStyles} from './styles';
import {AppNavigator} from '../../navigation';

type Props = {
  visible: boolean;
  setVisible: any;
};
const SelectThemeModal = ({visible, setVisible}: Props) => {
  const styles = selectThemeStyles();

  const userTheme = useColorScheme();

  const [selectedOption, setSelectedOption] = useState<
    null | string | undefined
  >(null);

  const options = [
    {id: 1, title: 'Dark', type: appThemes.dark},
    {id: 2, title: 'Light', type: appThemes.light},
    {id: 3, title: 'System', type: appThemes.default},
  ];

  const handleTheme = async (type: string) => {
    setSelectedOption(type);
  };

  const handleYes = () => {
    setStorageItem(asyncStorageKeys.theme, appThemes[selectedOption]);
    setVisible(false);
    AppNavigator.appNavigatorRef.setState({
      navigationStack: appNavigationStates.auth,
    });
  };

  const setInitialTheme = async () => {
    const storedTheme = await getStorageItems(asyncStorageKeys.theme);

    if (storedTheme) {
      setSelectedOption(storedTheme);
      return;
    } else {
      setSelectedOption(userTheme);
      return;
    }
  };

  useEffect(() => {
    setInitialTheme();
  }, []);

  return (
    <Modal
      transparent={true}
      visible={visible}
      onRequestClose={() => setVisible(false)}
      onPointerDown={() => setVisible(false)}>
      <View style={styles.modalContainer}>
        <View style={styles.optionsContainer}>
          <Text style={styles.conBtnTxt}>Select theme</Text>
          {options.map((item, index) => {
            return (
              <TouchableOpacity
                key={index}
                onPress={() => handleTheme(item.type)}
                style={styles.btn}>
                <View style={styles.radioContainer}>
                  {item.type === selectedOption && (
                    <View style={styles.radioFilled} />
                  )}
                </View>
                <View>
                  <Text style={styles.optText}>{item.title}</Text>
                </View>
              </TouchableOpacity>
            );
          })}
          {selectedOption && (
            <View style={styles.confirmContainer}>
              <TouchableOpacity
                onPress={() => {
                  setVisible(false);
                  setSelectedOption(null);
                }}
                style={styles.confirmBtn}>
                <Text style={styles.conBtnTxt}>cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => {
                  handleYes();
                }}
                style={styles.confirmBtn}>
                <Text style={styles.conBtnTxt}>confirm</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    </Modal>
  );
};

export default SelectThemeModal;

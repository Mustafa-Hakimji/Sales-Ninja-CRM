import AsyncStorage from '@react-native-async-storage/async-storage';

const getStorageItems = async (key: string) => {
  const data: any = await AsyncStorage.getItem(key);

  if (typeof data === 'string') {
    return data;
  } else {
    const formattedData = JSON.parse(data);
    return formattedData;
  }
};

const setStorageItem = async (key: string, data: any) => {
  console.log('ASYNC SET KEY --> ', key);
  console.log('ASYNC SET DATA --> ', data);
  if (typeof data === 'string') {
    await AsyncStorage.setItem(key, data);
    return;
  }
  await AsyncStorage.setItem(key, JSON.stringify(data));
  return;
};

const removeStorageItem = async (key: string) => {
  await AsyncStorage.removeItem(key);
};

export {getStorageItems, setStorageItem, removeStorageItem};

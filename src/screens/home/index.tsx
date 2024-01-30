import {
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';

import {syncCallLogsEntryFunc} from '../../utils/helpers/callLogsFunctions';
import {
  askPermissionToAccessCallLogs,
  askPermissionToWriteStorage,
} from '../../utils/permissions';

import {homeScreenStyles} from './styles';
import {useContextHook} from '../../context/contextProvider';
import {AppNavigator} from '../../navigation';
import {CustomButton} from '../../components/customButton';
import {layout} from '../../assets/constants/layout';
import Header from '../../components/headerCommon';
import {pickRecordingsPath} from '../../utils/functions';
import {
  startSyncCallInBG,
  startSyncRecordingsBG,
} from '../../utils/helpers/backgroundActions';

import {setToken} from '../../utils/contentManager/contentManager';
import {getStorageItems} from '../../utils/asyncStorage';
import CallLogs from './callLogs';
import {calltypeUI} from '../../assets/constants/callTypes';
import RNFS from 'react-native-fs';
import {asyncStorageKeys} from '../../assets/constants/asyncStorageKeys';

const {width} = layout.window;

// console.log('DIRECTORY PATH --> ', RNFS.ExternalStorageDirectoryPath);
// console.log('CachesDirectoryPath PATH --> ', RNFS.CachesDirectoryPath);

const HomeScreen = () => {
  const {lastSync} = useContextHook();

  const styles = homeScreenStyles();

  useEffect(() => {
    AppNavigator.isUserCameOnDashboard = true;
    askPermissionToAccessCallLogs();
    pickRecordingsPath();
    syncCallLogsEntryFunc();
    return () => {
      AppNavigator.isUserCameOnDashboard = false;
    };
  }, []);

  const [selectedTab, setSelectedTab] = useState<number>(0);
  const [localCallLogs, setLocalCallLogs] = useState<any>();

  const portfolioTabsList = [
    {
      title: 'ALL',
      image: require('../../assets/images/callTypes/all.png'),
      type: calltypeUI.all,
    },
    {
      title: 'INCOMING',
      image: require('../../assets/images/callTypes/incoming.png'),
      type: calltypeUI.incoming,
    },
    {
      title: 'OUTGOING',
      image: require('../../assets/images/callTypes/outgoing.png'),
      type: calltypeUI.outgoing,
    },
    {
      title: 'REJECTED',
      image: require('../../assets/images/callTypes/rejected.png'),
      type: calltypeUI.rejected,
    },
  ];

  const scrollSectionToIndex = (index = 0) => {
    setSelectedTab(index);
    tabsList?.current.scrollToIndex({index, viewPosition: 0.5});
    tabsContainer?.current.scrollTo({
      x: index * width,
      y: 0,
      animated: true,
    });
  };

  const onScroll = (event: any) => {
    const xPosition = event.nativeEvent.contentOffset.x;

    let tab = Math.round(xPosition / width);

    if (tab < 0) {
      tab = 0;
    }
    scrollSectionToIndex(tab);
  };

  const tabsList = useRef<null | any>(null);
  const tabsContainer = useRef<null | any>(null);

  useEffect(() => {
    startSyncCallInBG();
    startSyncRecordingsBG();
  }, []);

  return (
    <View style={styles.container}>
      <Header screen={'Home'} />
      <View style={styles.menuList}>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          ref={tabsList}
          data={portfolioTabsList}
          keyExtractor={(item, index) => `${item}_${index}`}
          renderItem={({item, index}) => (
            <CustomButton
              text={item.title}
              image={item.image}
              imageStyle={
                selectedTab === index
                  ? styles.selectedTabImage
                  : styles.tabImages
              }
              showUnderLine={selectedTab === index}
              buttonStyle={styles.tab}
              textStyle={
                selectedTab === index ? styles.selectedTabText : styles.tabText
              }
              onPress={() => scrollSectionToIndex(index)}
            />
          )}
        />
      </View>
      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={25}
        // onScroll
        onMomentumScrollEnd={event => onScroll(event)}
        ref={tabsContainer}
        style={{flex: 1}}>
        <CallLogs type={calltypeUI.all} />
        <CallLogs type={calltypeUI.incoming} />
        <CallLogs type={calltypeUI.outgoing} />
        <CallLogs type={calltypeUI.rejected} />
      </ScrollView>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});

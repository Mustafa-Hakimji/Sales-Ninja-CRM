import {
  ActivityIndicator,
  RefreshControl,
  SectionList,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';

import {allCallStyles} from './callLogsListStyles';
import {api} from '../../utils/ApiManager/api';
import {API_URLS} from '../../utils/ApiManager/urls';
import {colors} from '../../assets/constants/colors';
import {calltypeUI} from '../../assets/constants/callTypes';
import ActivityLoader from '../../components/loader';
import {createSections} from '../../utils/functions';
import ImageIcons from '../../components/imageIcons';
import NameSplitter from '../../components/nameSplitter';
import CallNotesModal from '../../components/callNotes';
import PlayRecordingModal from '../../components/playRecordingModal';
import TogglePlayButton from '../../components/togglePlayIcon';

type Props = {
  type?: string | null;
};
const CallLogs = ({type}: Props) => {
  const styles = allCallStyles();

  const [displayData, setDisplayData] = useState<[] | any>([]);
  const [appendData, setAppendData] = useState<[] | any>([]);
  const [selectedLog, setSelectedLog] = useState<null | number>(null);
  const [lastPageApi, setLastPageApi] = useState(false);

  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [page, setPage] = useState(0);
  const [notesModal, setNotesModal] = useState(false);
  const [items, setItems] = useState<null | any>(null);
  const [playRecordingModal, setPlayRecordingModal] = useState(false);

  const showLoadMoreLoader = page >= 1 && loading;
  const showMainLoader = page === 0 && loading;

  const updateNotes = (data: any) => {
    for (let eachData of appendData) {
      if (data.id === eachData._id) {
        eachData.note = data.note;
        break;
      }
    }
    const sectionList = createSections(appendData);
    setDisplayData(sectionList);
  };

  const getAllCallLogs = async (isRefreshing = false) => {
    try {
      let currentPage = page;

      if ((!isRefreshing && lastPageApi) || loading || refreshing) {
        return;
      }

      if (isRefreshing) {
        setRefreshing(isRefreshing);
        setPage(0);
        setSelectedLog(null);
        currentPage = 0;
      } else {
        setLoading(true);
      }

      currentPage += 1;

      const data = {callType: [type]};

      if (type === calltypeUI.all) {
        delete data?.callType;
      }

      const response = await api({
        url: API_URLS.CALL_LOG_LIST(currentPage),
        data,
      });

      if (response?.status === 200) {
        const {data, lastPage} = response?.data?.data;
        let newData = data;

        setLastPageApi(lastPage);

        if (currentPage > 1) {
          newData = [...appendData, ...data];
        }

        setAppendData(newData);

        const sectionList = createSections(newData);

        setDisplayData(sectionList);

        setPage(currentPage);
      }
    } catch (error) {
      console.log('ERROR --> ', Object.entries(error));
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    getAllCallLogs();
  }, []);

  const renderFooter = () => {
    if (showLoadMoreLoader) {
      return (
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            paddingVertical: 20,
          }}>
          <ActivityIndicator
            size="large"
            color={colors.textThemeColor}
            animating={true}
          />
        </View>
      );
    }
    return null;
  };

  return (
    <View style={styles.container}>
      <SectionList
        showsVerticalScrollIndicator={false}
        sections={displayData}
        keyExtractor={item => item.dateTime}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={() => getAllCallLogs(true)}
          />
        }
        renderItem={({item}) => {
          return (
            <View style={styles.listContainer}>
              <TouchableOpacity
                activeOpacity={0.9}
                style={styles.listRowContainer}
                onPress={() => {
                  setSelectedLog(item.dateTime);
                }}>
                <View>
                  {item.type === calltypeUI.incoming && item.duration > 0 && (
                    <ImageIcons
                      imagePath={require('../../assets/images/callTypes/incoming.png')}
                      imageStyles={styles.images}
                    />
                  )}

                  {item.type === calltypeUI.outgoing && item.duration > 0 && (
                    <ImageIcons
                      imagePath={require('../../assets/images/callTypes/outgoing.png')}
                      imageStyles={styles.images}
                    />
                  )}

                  {item.duration <= 0 && (
                    <ImageIcons
                      imagePath={require('../../assets/images/callTypes/rejected.png')}
                      imageStyles={styles.images}
                    />
                  )}
                </View>
                <View style={styles.userDetailsContainer}>
                  <Text style={styles.name}>
                    {item.name ? item.name : item.phoneNumber}
                  </Text>
                  <Text style={styles.subName}>{item.phoneNumber}</Text>
                </View>

                <TogglePlayButton
                  item={item}
                  setItems={setItems}
                  setPlayRecordingModal={setPlayRecordingModal}
                  setSelectedLog={setSelectedLog}
                />
              </TouchableOpacity>
              {selectedLog === item.dateTime && (
                <View>
                  <NameSplitter />

                  <View style={styles.redirectIconsContainer}>
                    <ImageIcons
                      imageStyles={styles.splitterImages}
                      imagePath={require('../../assets/images/edit.png')}
                      onPress={() => {
                        setNotesModal(true);
                        setItems(item);
                      }}
                    />

                    <ImageIcons
                      imageStyles={styles.splitterImages}
                      imagePath={require('../../assets/images/message.png')}
                      onPress={() => console.log('Image 2')}
                    />

                    <ImageIcons
                      imageStyles={styles.splitterImages}
                      imagePath={require('../../assets/images/whatsapp.png')}
                      onPress={() => console.log('Image 3')}
                    />

                    <ImageIcons
                      imageStyles={styles.splitterImages}
                      imagePath={require('../../assets/images/callRed.png')}
                      onPress={() => console.log('Image 4')}
                    />
                  </View>
                </View>
              )}
            </View>
          );
        }}
        renderSectionHeader={({section}) => (
          <View>
            <Text style={styles.title}>{section.title}</Text>
          </View>
        )}
        onEndReached={() => getAllCallLogs()}
        ListFooterComponent={() => (showLoadMoreLoader ? renderFooter() : null)}
      />
      {notesModal && (
        <CallNotesModal
          item={items}
          visible={notesModal}
          setVisible={setNotesModal}
          updateNotes={updateNotes}
        />
      )}

      {playRecordingModal && (
        <PlayRecordingModal
          visible={playRecordingModal}
          setVisible={setPlayRecordingModal}
          item={items}
        />
      )}
      {showMainLoader && <ActivityLoader />}
    </View>
  );
};

export default CallLogs;

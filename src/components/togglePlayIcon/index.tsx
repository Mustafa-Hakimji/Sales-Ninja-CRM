import {View, Text, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import {togglePlayStyles} from './style';
import {getHoursFormTS} from '../../utils/functions';
import {showToast} from '../../utils/helpers/toast';
import {messages} from '../../utils/helpers/errorMessages';

type Props = {
  item: any;
  setPlayRecordingModal?: any;
  setItems?: any;
  setSelectedLog?: any;
};

const TogglePlayButton = ({
  item,
  setPlayRecordingModal,
  setItems,
  setSelectedLog,
}: Props) => {
  const styles = togglePlayStyles();

  return (
    <View>
      {item.callRecording ? (
        <View style={styles.playContainer}>
          <TouchableOpacity
            onPress={() => {
              setPlayRecordingModal(true);

              if (setItems) {
                setItems(item);
              }
            }}
            activeOpacity={0.5}
            style={styles.playIcon}>
            <Image
              source={require('../../assets/images/play.png')}
              style={styles.playImage}
            />
          </TouchableOpacity>
          <Text style={styles.timeStyle}>{getHoursFormTS(item.timestamp)}</Text>
        </View>
      ) : (
        <View style={styles.playContainer}>
          <TouchableOpacity
            onPress={() => {
              if (setSelectedLog) {
                setSelectedLog(item.dateTime);
              } else {
                showToast(messages.REC_UNAVAILABLE);
              }
            }}
            activeOpacity={0.5}
            style={styles.playIcon}>
            <Image
              source={require('../../assets/images/next.png')}
              style={styles.nextImage}
            />
          </TouchableOpacity>
          <Text style={styles.timeStyle}>{getHoursFormTS(item.timestamp)}</Text>
        </View>
      )}
    </View>
  );
};

export default TogglePlayButton;

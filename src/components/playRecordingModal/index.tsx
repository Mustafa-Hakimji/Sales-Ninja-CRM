import {Image, Modal, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import Slider from '@react-native-community/slider';

import {playRecmodalStyles} from './style';
import {getRecTime, pauseAndPlay, playRecording} from '../../utils/functions';
import NameSplitter from '../nameSplitter';
import {colors} from '../../assets/constants/colors';

type Props = {
  item: any;
  visible: boolean;
  setVisible: any;
  setPreviousmodal?: any;
};

const PlayRecordingModal = ({
  item,
  visible,
  setVisible,
  setPreviousmodal,
}: Props) => {
  const styles = playRecmodalStyles();

  const url = 'https://dl.espressif.com/dl/audio/ff-16b-2c-44100hz.m4a';

  const [curRecording, setCurRecordig] = useState<null | any>(null);
  const [playPause, setPlayPause] = useState(false);
  const [duration, setDuration] = useState(0);
  const [value, setValue] = useState(0);

  const {name, phoneNumber, callRecording} = item;

  const setInstance = async () => {
    const data = await playRecording(callRecording, setDuration);
    setCurRecordig(data);
  };

  const playSound = () => {
    pauseAndPlay(curRecording, playPause);
  };

  useEffect(() => {
    setInstance();
  }, []);

  useEffect(() => {
    let interval: any;
    if (curRecording && duration) {
      interval = setInterval(
        () =>
          curRecording.getCurrentTime((seconds: any) => {
            if (Math.round(seconds + 1) >= Math.round(duration)) {
              setPlayPause(false);
              setValue(0);
              curRecording.stop();
            }

            setValue(Math.round(seconds));
          }),
        1000,
      );
    }
    return () => clearInterval(interval);
  }, [curRecording, duration]);

  return (
    <Modal
      onRequestClose={() => setVisible(false)}
      visible={visible}
      transparent>
      <View style={styles.mainContainer}>
        <View style={styles.subContainer}>
          <View style={styles.rowContainer}>
            <View>
              <Image
                source={require(`../../assets/images/callTypes/incoming.png`)}
                style={styles.image}
              />
            </View>
            <View style={styles.userContainer}>
              <Text style={styles.name}>{name ? name : phoneNumber}</Text>
              <Text style={styles.subName}>{phoneNumber}</Text>
            </View>

            <View style={styles.playContainer}>
              <TouchableOpacity
                activeOpacity={0.5}
                onPress={() => {
                  setVisible(false);
                  setCurRecordig(null);
                  setPlayPause(false);
                  curRecording.stop();
                  curRecording.release();
                  setCurRecordig(null);
                }}
                style={styles.closeBtn}>
                <Text style={styles.closeBtnText}>X</Text>
              </TouchableOpacity>
            </View>
          </View>

          <NameSplitter />

          <View style={[styles.playRecordingContainer]}>
            {playPause ? (
              <TouchableOpacity
                activeOpacity={0.5}
                onPress={() => {
                  playSound();
                  setPlayPause(false);
                }}>
                <Image
                  style={styles.playImage}
                  source={require('../../assets/images/pause.png')}
                />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                activeOpacity={0.5}
                disabled={!duration}
                onPress={() => {
                  playSound();
                  setPlayPause(true);
                }}>
                <Image
                  style={styles.playImage}
                  source={require('../../assets/images/play.png')}
                />
              </TouchableOpacity>
            )}

            {/* <Image
              style={styles.divideImage}
              source={require('../../assets/images/divide.png')}
            /> */}
            <View style={styles.slider}>
              <Slider
                onSlidingComplete={value => {
                  curRecording.setCurrentTime(value);
                }}
                maximumTrackTintColor={colors.appPrimaryColor}
                minimumValue={0}
                maximumValue={duration}
                value={value}
              />
            </View>
            <View>
              <Text style={styles.recTime}>{getRecTime(duration - value)}</Text>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default PlayRecordingModal;

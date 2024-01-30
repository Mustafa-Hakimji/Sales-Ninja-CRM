import {
  Image,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';

import {callNotesModalStyles} from './styles';
import ImageIcons from '../imageIcons';
import {getHoursFormTS} from '../../utils/functions';
import NameSplitter from '../nameSplitter';
import {CustomButton} from '../customButton';
import {api} from '../../utils/ApiManager/api';
import {API_URLS} from '../../utils/ApiManager/urls';
import {showToast} from '../../utils/helpers/toast';
import {messages} from '../../utils/helpers/errorMessages';
import {METHOD_TYPE} from '../../utils/ApiManager/apiHandler';
import {colors} from '../../assets/constants/colors';
import PlayRecordingModal from '../playRecordingModal';
import TogglePlayButton from '../togglePlayIcon';

type Props = {
  visible: boolean;
  setVisible: any;
  item: any;
  updateNotes: any;
};

const CallNotesModal = ({item, visible, setVisible, updateNotes}: Props) => {
  const styles = callNotesModalStyles();

  const {name, phoneNumber, type, note, _id, timestamp} = item;

  const [notes, setNotes] = useState(note);

  const [playRecModal, setPlayRecModal] = useState(false);

  const saveNotes = async () => {
    try {
      if (!notes) {
        showToast(messages.EMPLTY_NOTE);
        return;
      }

      const response = await api({
        method: METHOD_TYPE.PATCH,
        url: API_URLS.UPLOAD_NOTES,
        data: {noteId: _id, note: notes},
      });

      if (response?.status === 200) {
        showToast(messages.NOTE_SAVED);
        const notesData = {
          id: _id,
          note: notes,
          timestamp,
        };
        updateNotes(notesData);
        setVisible(false);
      }
    } catch (error) {
      console.log('ERROR SAVING NOTES --> ', Object.entries(error));
    }
  };

  const handlePlayRec = () => {
    setPlayRecModal(true);
  };
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
              <TogglePlayButton
                setPlayRecordingModal={setPlayRecModal}
                item={item}
              />

              <Text style={styles.time}>{getHoursFormTS(timestamp)}</Text>
            </View>
          </View>

          <NameSplitter />

          <View style={styles.inputContainer}>
            <TextInput
              multiline={true}
              value={notes}
              onChangeText={e => setNotes(e)}
              style={styles.input}
              placeholderTextColor={colors.black}
              numberOfLines={4}
            />
          </View>
          <CustomButton
            textStyle={styles.btnText}
            buttonStyle={styles.btnStyle}
            text="Save"
            onPress={saveNotes}
          />

          <TouchableOpacity
            style={styles.closeBtn}
            onPress={() => setVisible(false)}>
            <Text style={styles.closeBtnText}>X</Text>
          </TouchableOpacity>
        </View>
      </View>

      {playRecModal && (
        <PlayRecordingModal
          visible={playRecModal}
          setVisible={setPlayRecModal}
          item={item}
        />
      )}
    </Modal>
  );
};

export default CallNotesModal;

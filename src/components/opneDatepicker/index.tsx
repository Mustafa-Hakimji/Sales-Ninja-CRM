import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import DatePicker from 'react-native-date-picker';

import {openPickerStyles} from './style';
import {less120Days} from '../../utils/functions';

type Props = {
  title: string;
  displayDate: string;
  setDate: any;
  minDateProp?: any;
};
const OpenDatepicker = ({title, displayDate, setDate, minDateProp}: Props) => {
  const styles = openPickerStyles();

  const [openPicker, setOpenPicker] = useState(false);

  const minDate = minDateProp ? minDateProp : less120Days();

  const handlePress = () => {
    setOpenPicker(true);
  };

  return (
    <View>
      <TouchableOpacity activeOpacity={0.5} onPress={() => handlePress()}>
        <View style={styles.btnRowContainer}>
          <View>
            <Image
              style={styles.calendarImage}
              source={require('../../assets/images/calendar.png')}
            />
          </View>
          <View>
            <Text style={styles.titleText}>{title}</Text>
            <Text style={styles.selectedDate}>
              {displayDate.toLocaleDateString()}
            </Text>
          </View>
        </View>
      </TouchableOpacity>

      <DatePicker
        modal
        open={openPicker}
        date={new Date(displayDate)}
        minimumDate={minDate}
        maximumDate={new Date()}
        onConfirm={date => {
          setDate(date);
          setOpenPicker(false);
        }}
        onCancel={() => {
          setOpenPicker(false);
        }}
      />
    </View>
  );
};

export default OpenDatepicker;

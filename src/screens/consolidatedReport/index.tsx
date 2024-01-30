import {View, Text, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';

import {reportStyles} from './style';
import OpenDatepicker from '../../components/opneDatepicker';
import Header from '../../components/headerCommon';
import {calltypeUI} from '../../assets/constants/callTypes';
import {CustomButton} from '../../components/customButton';
import {showToast} from '../../utils/helpers/toast';
import {messages} from '../../utils/helpers/errorMessages';
import ActivityLoader from '../../components/loader';

const ConsolidatedReport = () => {
  const styles = reportStyles();

  const [startDate, setStartDate] = useState<null | any>(new Date());
  const [endDate, setEndDate] = useState<null | any>(new Date());
  const [selectedCallTypes, setSelectedCallTypes] = useState<
    [] | Array<string>
  >([]);
  const [loading, setLoading] = useState(false);

  const handleCallTypeSelecet = (callType: string) => {
    if (selectedCallTypes.includes(callType)) {
      setSelectedCallTypes(
        selectedCallTypes.filter((item: string) => item !== callType),
      );
    } else {
      setSelectedCallTypes([...selectedCallTypes, callType]);
    }
  };

  const getReports = async () => {
    if (!startDate || !endDate) {
      showToast(messages.EMPTY_DATE);
      return;
    }
    if (endDate < startDate) {
      showToast(messages.INCORRECT_DATES);
      return;
    }
    try {
      setLoading(true);
    } catch (error) {
      console.log('Error getting reports --> ', Object.entries(error));
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setEndDate(new Date());
    setStartDate(new Date());
    setSelectedCallTypes([]);
  };

  return (
    <View style={styles.mainContainer}>
      <Header screen={'Consolidate Report'} />
      <View style={styles.subContainer}>
        <View style={styles.rowContainer}>
          <OpenDatepicker
            title={'From'}
            setDate={setStartDate}
            displayDate={startDate}
          />
          <OpenDatepicker
            title={'To'}
            setDate={setEndDate}
            displayDate={endDate}
            minDateProp={startDate}
          />
        </View>

        <View style={styles.callTypeContainer}>
          <Text style={styles.callTypes}>Call Types</Text>
          <View style={styles.rowContainer}>
            <View>
              <TouchableOpacity
                activeOpacity={0.5}
                onPress={() => handleCallTypeSelecet(calltypeUI.incoming)}
                style={
                  selectedCallTypes.includes(calltypeUI.incoming)
                    ? styles.callTypeSelectedButton
                    : styles.callTypeButton
                }>
                <Text
                  style={
                    selectedCallTypes.includes(calltypeUI.incoming)
                      ? styles.callTypeSelectedText
                      : styles.callTypeText
                  }>
                  {calltypeUI.incoming}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                activeOpacity={0.5}
                onPress={() => handleCallTypeSelecet(calltypeUI.outgoing)}
                style={
                  selectedCallTypes.includes(calltypeUI.outgoing)
                    ? styles.callTypeSelectedButton
                    : styles.callTypeButton
                }>
                <Text
                  style={
                    selectedCallTypes.includes(calltypeUI.outgoing)
                      ? styles.callTypeSelectedText
                      : styles.callTypeText
                  }>
                  {calltypeUI.outgoing}
                </Text>
              </TouchableOpacity>
            </View>

            <View>
              <TouchableOpacity
                activeOpacity={0.5}
                onPress={() => handleCallTypeSelecet(calltypeUI.missed)}
                style={
                  selectedCallTypes.includes(calltypeUI.missed)
                    ? styles.callTypeSelectedButton
                    : styles.callTypeButton
                }>
                <Text
                  style={
                    selectedCallTypes.includes(calltypeUI.missed)
                      ? styles.callTypeSelectedText
                      : styles.callTypeText
                  }>
                  {calltypeUI.missed}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                activeOpacity={0.5}
                onPress={() => handleCallTypeSelecet(calltypeUI.rejected)}
                style={
                  selectedCallTypes.includes(calltypeUI.rejected)
                    ? styles.callTypeSelectedButton
                    : styles.callTypeButton
                }>
                <Text
                  style={
                    selectedCallTypes.includes(calltypeUI.rejected)
                      ? styles.callTypeSelectedText
                      : styles.callTypeText
                  }>
                  {calltypeUI.rejected}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
      <CustomButton
        activeOpacity={0.5}
        textStyle={styles.reserGetText}
        buttonStyle={styles.getReportBtn}
        text="VIEW REPORT"
        onPress={getReports}
      />
      <CustomButton
        activeOpacity={0.5}
        textStyle={styles.reserGetText}
        buttonStyle={styles.resetBtn}
        text="RESET"
        onPress={handleReset}
      />
      {loading && <ActivityLoader />}
    </View>
  );
};

export default ConsolidatedReport;

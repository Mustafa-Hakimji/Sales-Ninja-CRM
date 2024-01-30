import React from 'react';
import {RefreshControl} from 'react-native';
import {colors} from '../../assets/constants/colors';

const RefreshView = ({
  refreshing = false,
  onRefresh = (param: any) => null,
}) => (
  <RefreshControl
    tintColor={colors.appPrimaryColor}
    colors={[colors.appPrimaryColor, colors.blue]}
    refreshing={refreshing}
    onRefresh={() => onRefresh()}
  />
);

export default RefreshView;

import React, {memo} from 'react';
import {TextStyle, View, ViewStyle} from 'react-native';

import Typography from '../../../components/typography';

import {flexStyles} from '../../../../styles';

type Props = {
  style?: ViewStyle;
  headerTextStyle?: TextStyle;
  descTextStyle?: TextStyle;
  label: string;
  value: string;
};

const ListHeaderItem = ({
  style,
  headerTextStyle,
  descTextStyle,
  label,
  value,
}: Props) => (
  <View style={[flexStyles.vertical, style]}>
    <Typography type="description" style={headerTextStyle}>
      {value}
    </Typography>
    <Typography type="description" style={descTextStyle}>
      {label}
    </Typography>
  </View>
);

export default memo(ListHeaderItem);

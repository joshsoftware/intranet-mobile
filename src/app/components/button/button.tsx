import React, {memo} from 'react';
import {TextStyle, ViewStyle, TouchableOpacity} from 'react-native';

import colors from '../../constant/colors';
import Typography from '../typography';

type Props = {
  style?: ViewStyle;
  textStyle?: TextStyle;
  title: string;
  onPress: () => void;
  fill?: boolean;
  color?: string;
};

const Button = ({style, textStyle, title, onPress, fill, color}: Props) => {
  const styles = {
    borderWidth: !fill ? 2 : 0,
    borderRadius: 4,
    backgroundColor: fill ? color : colors.WHITE,
    borderColor: color,
  };
  return (
    <TouchableOpacity onPress={onPress} style={[styles, style]}>
      <Typography style={textStyle}>{title}</Typography>
    </TouchableOpacity>
  );
};

export default memo(Button);

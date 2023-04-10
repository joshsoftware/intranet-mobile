import React, {memo} from 'react';
import {
  TextStyle,
  ViewStyle,
  TouchableOpacity,
  StyleSheet,
  TouchableOpacityProps,
} from 'react-native';

import Typography from '../typography';

import colors from '../../constant/colors';
import fonts from '../../constant/fonts';

type Props = TouchableOpacityProps & {
  style?: ViewStyle;
  textStyle?: TextStyle;
  title: string;
};

const Button = ({style, textStyle, title, ...props}: Props) => {
  return (
    <TouchableOpacity {...props} style={[styles.btn, style]}>
      <Typography style={{...styles.txt, ...textStyle}} type="title">
        {title}
      </Typography>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  btn: {
    height: 40,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.PRIMARY,
    marginVertical: 10,
    borderColor: colors.PRIMARY,
  },
  txt: {
    color: colors.WHITE,
    fontFamily: fonts.POPPINS,
    lineHeight: 20,
  },
});

export default memo(Button);

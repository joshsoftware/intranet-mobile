import React, {memo} from 'react';
import {TextStyle, ViewStyle, TouchableOpacity, StyleSheet} from 'react-native';

import Typography from '../typography';

import colors from '../../constant/colors';
import fonts from '../../constant/fonts';

type Props = {
  style?: ViewStyle;
  textStyle?: TextStyle;
  title: string;
  onPress: () => void;
};

const Button = ({style, textStyle, title, onPress}: Props) => {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.btn, style]}>
      <Typography style={{...styles.txt, ...textStyle}} type="title">
        {title}
      </Typography>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  btn: {
    height: 40,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.PRIMARY,
    width: '100%',
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

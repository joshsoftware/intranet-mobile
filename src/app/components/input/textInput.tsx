import React from 'react';
import {
  StyleSheet,
  TextInput,
  TextInputProps,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';

import colors from '../../constant/colors';
import fonts from '../../constant/fonts';

import {borderStyles, flexStyles} from '../../../styles';

type Props = TextInputProps & {
  style?: ViewStyle;
  textStyle?: TextStyle;
  startIcon?: SVGElement;
  value: string | undefined;
};

const Input = ({style, textStyle, startIcon, value, ...props}: Props) => (
  <View
    style={[borderStyles.thinBorder, flexStyles.horizontal, styles.box, style]}>
    <>{startIcon}</>
    <TextInput
      style={[value ? styles.text : styles.placeholder, textStyle]}
      value={value}
      {...props}
    />
  </View>
);

const styles = StyleSheet.create({
  box: {
    padding: 5,
    justifyContent: 'flex-start',
    height: 40,
    marginVertical: 5,
  },
  text: {
    color: colors.SECONDARY,
    lineHeight: 16,
    fontFamily: fonts.ARIAL,
    fontSize: 14,
    padding: 5,
    width: '100%',
  },
  placeholder: {
    color: colors.PLACEHOLDER_TEXT,
    lineHeight: 16,
    fontFamily: fonts.OVERPASS,
    fontSize: 14,
    padding: 5,
    width: '100%',
  },
});

export default Input;

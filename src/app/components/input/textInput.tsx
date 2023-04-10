import React, {memo, useMemo} from 'react';
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
};

const Input = ({style, textStyle, startIcon, value, ...props}: Props) => {
  const selectedStyle = useMemo(
    () => (value ? styles.text : styles.placeholder),
    [value],
  );

  return (
    <View
      style={[
        borderStyles.thinBorder,
        flexStyles.horizontal,
        styles.box,
        style,
      ]}>
      <>{startIcon}</>
      <TextInput style={[selectedStyle, textStyle]} value={value} {...props} />
    </View>
  );
};

const styles = StyleSheet.create({
  box: {
    padding: 5,
    justifyContent: 'flex-start',
    marginVertical: 5,
  },
  text: {
    color: colors.SECONDARY,
    lineHeight: 20,
    fontFamily: fonts.ARIAL,
    fontSize: 16,
    padding: 5,
    width: '100%',
  },
  placeholder: {
    color: colors.PLACEHOLDER_TEXT,
    lineHeight: 20,
    fontFamily: fonts.OVERPASS,
    fontSize: 16,
    padding: 5,
    width: '100%',
  },
});

export default memo(Input);

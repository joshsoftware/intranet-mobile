import React from 'react';
import {StyleSheet, Text, TextInput, TextInputProps} from 'react-native';

import colors from '../constant/colors';

type Props = TextInputProps & {error?: string};

const InputBox = ({error, ...props}: Props) => {
  return (
    <>
      <TextInput
        {...props}
        style={[styles.textInput, error ? styles.errorStyle : {}]}
        placeholderTextColor="#C7C6C6"
      />
      {error && <Text style={styles.errorText}>{error}</Text>}
    </>
  );
};

const styles = StyleSheet.create({
  textInput: {
    fontSize: 16,
    marginBottom: 9,
    paddingHorizontal: 8,
    color: colors.TERTIARY_TEXT,
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderBottomWidth: 1,
    borderBottomColor: colors.TEXT_INPUT_BORDER,
  },
  errorStyle: {
    borderBottomColor: colors.ERROR_RED,
  },
  errorText: {
    color: colors.ERROR_RED,
  },
});

export default InputBox;

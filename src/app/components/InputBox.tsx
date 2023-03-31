import React from 'react';
import {StyleSheet, Text, TextInput, TextInputProps} from 'react-native';

import colors from '../constant/colors';

type Props = TextInputProps & {error?: string};

const InputBox = (props: Props) => {
  return (
    <>
      <TextInput
        {...props}
        style={[styles.textInput, props.error ? styles.errorStyle : {}]}
        placeholderTextColor="#C7C6C6"
      />
      {props.error && <Text style={styles.errorText}>{props.error}</Text>}
    </>
  );
};

export default InputBox;

const styles = StyleSheet.create({
  textInput: {
    height: 40,
    marginVertical: 9,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: colors.BORDER,
    paddingHorizontal: 20,
    color: colors.TERTIARY_TEXT,
  },
  errorStyle: {
    borderColor: colors.ERROR_RED,
  },
  errorText: {
    color: colors.ERROR_RED,
  },
});

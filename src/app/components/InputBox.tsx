import React from 'react';
import {StyleSheet, Text, TextInput, TextInputProps} from 'react-native';

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
    borderColor: '#D6D6D6',
    paddingHorizontal: 20,
    color: '#333333',
  },
  errorStyle: {
    borderColor: 'red',
  },
  errorText: {
    color: 'red',
  },
});

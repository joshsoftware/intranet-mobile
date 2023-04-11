import React from 'react';
import {StyleSheet, Text, TextInput, TextInputProps, View} from 'react-native';

import colors from '../../constant/colors';
import {SvgProps} from 'react-native-svg';

type Props = TextInputProps & {error?: string; StartIcon?: React.FC<SvgProps>};

const InputBox = ({error, StartIcon, ...props}: Props) => {
  let style = props.style;

  if (style) {
    if (Array.isArray(style)) {
      style.push(styles.textInput);
    } else {
      style = [style, styles.textInput];
    }
  }

  return (
    <>
      <View style={[styles.container, error ? styles.errorStyle : {}]}>
        {StartIcon && (
          <StartIcon style={styles.startIcon} height={12} width={12} />
        )}
        <TextInput {...props} style={style} placeholderTextColor="#C7C6C6" />
      </View>
      {error && <Text style={styles.errorText}>{error}</Text>}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
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
  startIcon: {
    marginLeft: 4,
    marginRight: 15,
  },
  errorStyle: {
    borderBottomColor: colors.ERROR_RED,
  },
  errorText: {
    color: colors.ERROR_RED,
  },
  textInput: {
    color: colors.SECONDARY,
  },
});

export default InputBox;

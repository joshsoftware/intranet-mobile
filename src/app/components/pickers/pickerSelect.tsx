import React, {memo} from 'react';
import {StyleSheet, View, ViewStyle} from 'react-native';
import RNPickerSelect, {
  PickerSelectProps,
  PickerStyle,
} from 'react-native-picker-select';

import Typography from '../typography';

import colors from '../../constant/colors';

type Props = PickerSelectProps & {
  containerStyle?: ViewStyle;
  error?: string;
  textStyle?: PickerStyle;
};

const PickerSelect = ({containerStyle, error, textStyle, ...props}: Props) => {
  return (
    <>
      <View
        style={[styles.container, error ? styles.error : {}, containerStyle]}>
        <RNPickerSelect style={{...textStyle}} {...props} />
      </View>
      {error && (
        <Typography style={styles.errorText} type="description">
          {error}
        </Typography>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 40,
    justifyContent: 'center',
    marginBottom: 3,
    width: '100%',
    borderColor: colors.TEXT_INPUT_BORDER,
    borderBottomWidth: 1,
  },
  errorText: {
    color: colors.ERROR_RED,
  },
  error: {
    borderBottomColor: colors.ERROR_RED,
  },
});

export default memo(PickerSelect);

import React, {memo, useMemo} from 'react';
import {Platform, StyleSheet, View, ViewStyle} from 'react-native';

import RNPickerSelect, {
  PickerSelectProps,
  PickerStyle,
} from 'react-native-picker-select';

import strings from '../../constant/strings';
import colors from '../../constant/colors';
import fonts from '../../constant/fonts';

import {flexStyles, borderStyles} from '../../../styles';

type Props = PickerSelectProps & {
  style?: ViewStyle;
  textStyle?: PickerStyle;
};

const PickerSelect = ({style, textStyle, ...props}: Props) => {
  const selectedStyle = useMemo(
    () =>
      Platform.OS === 'ios'
        ? {inputIOS: styles.header}
        : {
            inputAndroid:
              props.value && props.value.match(strings.NO_SELECT)
                ? styles.placeholder
                : styles.header,
          },
    [props.value],
  );

  return (
    <View style={flexStyles.vertical}>
      <View style={[borderStyles.thinBorder, style]}>
        <RNPickerSelect style={{...textStyle, ...selectedStyle}} {...props} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    color: colors.SECONDARY,
    lineHeight: 16,
    fontFamily: fonts.ARIAL,
    fontSize: 14,
  },
  placeholder: {
    color: colors.SECONDARY_TEXT,
    lineHeight: 16,
    fontFamily: fonts.OVERPASS,
    fontSize: 14,
  },
});

export default memo(PickerSelect);

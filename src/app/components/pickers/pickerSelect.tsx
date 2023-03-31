import React, {memo, useMemo} from 'react';
import {Platform, StyleSheet, View, ViewStyle} from 'react-native';

import RNPickerSelect, {Item, PickerStyle} from 'react-native-picker-select';

import Typography from '../typography';

import strings from '../../constant/strings';
import colors from '../../constant/colors';
import fonts from '../../constant/fonts';

import {flexStyles, borderStyles} from '../../../styles';

type Props = {
  style?: ViewStyle;
  textStyle?: PickerStyle;
  label: String;
  placeHolder: Item;
  state: String;
  onChange: (text: string) => void;
  itemsList: Item[];
};

const PickerSelect = ({
  label,
  placeHolder,
  state,
  onChange,
  itemsList,
  style,
  textStyle,
}: Props) => {
  const selectedStyle = useMemo(
    () =>
      Platform.OS === 'ios'
        ? {inputIOS: styles.header}
        : {
            inputAndroid: state.match(strings.NO_SELECT)
              ? styles.placeholder
              : styles.header,
          },
    [state],
  );

  return (
    <View style={flexStyles.horizontal}>
      <Typography type="header">{label}</Typography>
      <View style={[borderStyles.thinBorder, style]}>
        <RNPickerSelect
          onValueChange={onChange}
          items={itemsList}
          value={state}
          placeholder={placeHolder}
          style={{...textStyle, ...selectedStyle}}
        />
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

import React, {memo, PropsWithChildren} from 'react';
import {StyleProp, StyleSheet, Text, TextStyle} from 'react-native';

import colors from '../../constant/colors';
import fonts from '../../constant/fonts';

type Props = PropsWithChildren & {
  style?: StyleProp<TextStyle>;
  numberOfLines?: number;
  type?:
    | 'title'
    | 'header'
    | 'subheader'
    | 'description'
    | 'label'
    | 'text'
    | 'secondaryText'
    | 'error';
};

const Typography = ({children, type = 'title', style, numberOfLines}: Props) => (
  <Text style={[styles[type], style]} numberOfLines={numberOfLines}>
    {children}
  </Text>
);

const styles = StyleSheet.create({
  title: {
    color: colors.PRIMARY,
    fontFamily: fonts.ARIAL,
    fontSize: 14,
  },
  header: {
    color: colors.SECONDARY,
    fontFamily: fonts.ARIAL,
    fontSize: 14,
  },
  subheader: {
    color: colors.SECONDARY,
    fontFamily: fonts.ARIAL,
    fontSize: 12,
  },
  description: {
    color: colors.SECONDARY_TEXT,
    fontFamily: fonts.OVERPASS,
    fontSize: 12,
  },
  smallText: {
    color: colors.SECONDARY,
    fontFamily: fonts.OVERPASS,
    fontSize: 10,
  },
  label: {
    color: colors.LABEL_COLOR_PRIMARY,
    fontFamily: fonts.ARIAL,
    fontSize: 14,
  },
  text: {
    color: colors.SECONDARY,
    fontFamily: fonts.ARIAL,
    fontSize: 14,
  },
  secondaryText: {
    color: colors.SECONDARY_TEXT,
    fontFamily: fonts.ARIAL,
    fontSize: 14,
  },
  error: {
    color: colors.ERROR_RED,
    fontFamily: fonts.ARIAL,
    fontSize: 12,
  },
});
export default memo(Typography);

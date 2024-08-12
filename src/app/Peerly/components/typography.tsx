import React, {memo, PropsWithChildren} from 'react';
import {StyleProp, StyleSheet, Text, TextProps, TextStyle} from 'react-native';

import colors from '../constants/colors';
import fonts from '../constants/fonts';

type Props = PropsWithChildren<TextProps> & {
  style?: StyleProp<TextStyle>;
  type?:
    | 'title'
    | 'header'
    | 'subheader'
    | 'description'
    | 'label'
    | 'text'
    | 'secondaryText'
    | 'error'
    | 'h1'
    | 'h2'
    | 'h3'
    | 'h4'
    | 'h5'
    | 'h6'
    | 'h7';
};

const Typography = ({
  children,
  type = 'title',
  style,
  numberOfLines,
  ellipsizeMode,
  onPress,
  ...rest
}: Props) => (
  <Text
    style={[styles[type], style]}
    numberOfLines={numberOfLines}
    ellipsizeMode={ellipsizeMode}
    onPress={onPress}
    {...rest}>
    {children}
  </Text>
);

const styles = StyleSheet.create({
  h1: {
    color: colors.BLACK,
    fontFamily: fonts.POPPINS,
    fontSize: 18,
    fontWeight: '600',
  },
  h2: {
    color: colors.BLACK,
    fontFamily: fonts.POPPINS,
    fontSize: 16,
  },
  h3: {
    color: colors.BLACK,
    fontFamily: fonts.POPPINS,
    fontSize: 14,
  },
  h4: {
    color: colors.BLACK,
    fontFamily: fonts.POPPINS,
    fontSize: 12,
  },
  h5: {
    color: colors.BLACK,
    fontFamily: fonts.POPPINS,
    fontSize: 10,
  },
  h6: {
    color: colors.BLACK,
    fontFamily: fonts.POPPINS,
    fontSize: 8,
  },
  h7: {
    color: colors.BLACK,
    fontFamily: fonts.POPPINS,
    fontSize: 6,
  },
  h8: {
    color: colors.BLACK,
    fontFamily: fonts.POPPINS,
    fontSize: 4,
  },
  title: {
    color: colors.PRIMARY,
    lineHeight: 16,
    fontFamily: fonts.ARIAL,
    fontSize: 14,
  },
  header: {
    color: colors.SECONDARY,
    lineHeight: 16,
    fontFamily: fonts.ARIAL,
    fontSize: 14,
  },
  subheader: {
    color: colors.SECONDARY,
    lineHeight: 14,
    fontFamily: fonts.ARIAL,
    fontSize: 12,
  },
  description: {
    color: colors.SECONDARY_TEXT,
    lineHeight: 14,
    fontFamily: fonts.OVERPASS,
    fontSize: 12,
  },
  smallText: {
    color: colors.SECONDARY,
    lineHeight: 12,
    fontFamily: fonts.OVERPASS,
    fontSize: 10,
  },
  label: {
    color: colors.LABEL_COLOR_PRIMARY,
    lineHeight: 16,
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
    paddingTop: 5,
  },
});

export default memo(Typography);

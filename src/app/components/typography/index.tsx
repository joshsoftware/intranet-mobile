import React, {memo, PropsWithChildren} from 'react';
import {StyleSheet, Text, TextStyle} from 'react-native';

import colors from '../../constant/colors';
import fonts from '../../constant/fonts';

type Props = PropsWithChildren & {
  style?: TextStyle;
  type?:
    | 'title'
    | 'header'
    | 'subheader'
    | 'description'
    | 'label'
    | 'text'
    | 'secondaryText'
    | 'secondaryLabel';
};

const Typography = ({children, type = 'title', style}: Props) => (
  <Text style={[styles[type], style]}>{children}</Text>
);

const styles = StyleSheet.create({
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
  secondaryLabel: {
    color: colors.SECONDARY_TEXT,
    fontFamily: fonts.ARIAL,
    fontSize: 14,
  },
});
export default memo(Typography);

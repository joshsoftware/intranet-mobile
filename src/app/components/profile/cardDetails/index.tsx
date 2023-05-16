import React, {PropsWithChildren} from 'react';
import {StyleSheet, View, ViewStyle} from 'react-native';

import Typography from '../../typography';

import colors from '../../../constant/colors';
import fonts from '../../../constant/fonts';

type Props = PropsWithChildren & {
  title: string;
  cardStyle?: ViewStyle;
};

const CardDetails = ({children, title, cardStyle}: Props) => {
  return (
    <View style={[styles.detailContainer, cardStyle]}>
      <Typography style={styles.title} type="header">
        {title}
      </Typography>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  detailContainer: {
    flex: 1,
    marginBottom: 16,
    backgroundColor: colors.TERNARY_BACKGROUND,
    flexDirection: 'column',
    padding: 16,
    elevation: 5,
  },
  title: {
    fontFamily: fonts.ARIAL_BOLD,
    paddingBottom: 21.5,
    textTransform: 'capitalize',
  },
});

export default CardDetails;

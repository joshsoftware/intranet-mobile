import React, {PropsWithChildren, useMemo} from 'react';
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
      <Typography
        style={styles.title}
        type="header"
        fontFamily={fonts.ARIAL_AND_BOLD}>
        {title}
      </Typography>
      {useMemo(() => children, [])}
    </View>
  );
};

const styles = StyleSheet.create({
  detailContainer: {
    borderRadius: 3,
    flex: 1,
    marginBottom: 16,
    backgroundColor: colors.TERNARY_BACKGROUND,
    flexDirection: 'column',
    padding: 16,
    shadowColor: colors.SHADOW_COLOR,
    shadowRadius: 6,
    elevation: 6,
    margin: 10,
  },
  title: {
    paddingBottom: 21.5,
    textTransform: 'capitalize',
  },
});

export default CardDetails;

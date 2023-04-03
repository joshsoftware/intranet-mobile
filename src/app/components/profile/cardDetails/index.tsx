import {PropsWithChildren} from 'react';

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
        style={styles.titlePadding}
        type="header"
        fontFamily={fonts.ARIAL_AND_BOLD}>
        {title}
      </Typography>
      {children}
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
  titlePadding: {
    paddingBottom: 21.5,
  },
});

export default CardDetails;

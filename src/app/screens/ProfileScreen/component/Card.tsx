import React from 'react';
import {StyleSheet, View} from 'react-native';

import Typography from '../../../components/typography';

import colors from '../../../constant/colors';
import fonts from '../../../constant/fonts';

interface Props {
  title: string;
  children: React.ReactNode;
}

function Card({title, children}: Props) {
  return (
    <View style={styles.container}>
      <Typography style={styles.title}>{title}</Typography>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 16,
    backgroundColor: colors.TERNARY_BACKGROUND,
    padding: 16,
    elevation: 5,
    borderRadius: 10,
  },
  title: {
    color: colors.SECONDARY,
    fontFamily: fonts.ARIAL_BOLD,
    fontWeight: 'bold',
    paddingBottom: 20,
    textTransform: 'capitalize',
  },
});

export default Card;

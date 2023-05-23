import React from 'react';
import {StyleSheet, View} from 'react-native';

import Typography from '../../../components/typography';

import colors from '../../../constant/colors';

interface Props {
  title: string;
  children: React.ReactNode;
}

function Card({title, children}: Props) {
  return (
    <View style={styles.container}>
      <Typography style={styles.title} type="header">
        {title}
      </Typography>
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
    fontWeight: 'bold',
    paddingBottom: 10,
    textTransform: 'capitalize',
  },
});

export default Card;

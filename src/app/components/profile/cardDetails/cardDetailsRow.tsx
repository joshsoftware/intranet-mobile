import React from 'react';
import {StyleSheet, View} from 'react-native';

import labelFormatter from '../../../utils/userProfile/labelFormatter';
import dataFormatter from '../../../utils/userProfile/dataFormatter';

import Typography from '../../typography';

type Props = {
  label: string;
  data: string | string[];
};

const CardDetailsRow = ({label, data}: Props) => {
  const formattedData: string = dataFormatter(data);
  const isEmail: boolean =
    typeof formattedData === 'string' && formattedData.includes('@');
  return (
    <View style={styles.detailsData}>
      <Typography style={styles.labelFlex} type="label">
        {labelFormatter(label)}
      </Typography>
      <Typography
        style={[styles.contentStyle, isEmail ? styles.emailText : {}]}
        type="header">
        {formattedData}
      </Typography>
    </View>
  );
};

const styles = StyleSheet.create({
  detailsData: {
    flexDirection: 'row',
    flex: 1,
    paddingBottom: 20,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  labelFlex: {
    textTransform: 'capitalize',
    paddingRight: 20,
  },
  contentStyle: {
    lineHeight: 20,
    flex: 1,
    flexWrap: 'wrap',
    textAlign: 'right',
  },
  emailText: {
    textTransform: 'lowercase',
  },
});

export default CardDetailsRow;

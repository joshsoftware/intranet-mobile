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
        style={[
          styles.contentStyle,
          isEmail ? {textTransform: 'lowercase'} : {},
        ]}
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
  },
  labelFlex: {
    flexBasis: '50%',
    textTransform: 'capitalize',
  },
  contentStyle: {
    flexBasis: '50%',
    lineHeight: 20,
    textAlign: 'right',
  },
});
export default CardDetailsRow;

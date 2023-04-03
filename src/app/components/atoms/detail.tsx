import React from 'react';

import {StyleSheet, View} from 'react-native';

import Typography from '../typography';

interface DetailInterface {
  label: string;
  data: string;
}
const Detail = ({detail}: {detail: DetailInterface}) => {
  const {label, data} = detail;
  return (
    <View style={styles.detailsData}>
      <Typography style={styles.labelFlex} type="label">
        {label}
      </Typography>
      <Typography style={styles.contentFlex} alignment="right" type="header">
        {data}
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
  },
  contentFlex: {
    flexBasis: '50%',
  },
});
export default Detail;

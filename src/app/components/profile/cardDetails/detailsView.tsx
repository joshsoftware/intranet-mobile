import React from 'react';
import {StyleSheet, View} from 'react-native';

import CardDetailsRow from './cardDetailsRow';

import {detailsKeyType, detailsType} from '../../../types';

type Props = {
  data: detailsType;
};

const DetailsView = ({data}: Props) => {
  console.log(data);
  const keys: detailsKeyType[] = Object.keys(data) as detailsKeyType[];

  return (
    <View style={styles.detailsContainer}>
      {keys.map((key: detailsKeyType, index: number) => (
        <CardDetailsRow key={index} label={key} data={data[key]} />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  detailsContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-around',
    flex: 1,
  },
});

export default DetailsView;

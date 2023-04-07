import React, {useMemo} from 'react';
import {StyleSheet, View} from 'react-native';

import CardDetailsRow from './cardDetailsRow';

import {detailsType} from '../../../types';

type Props = {
  data: detailsType;
};

const DetailsView = ({data}: Props) => {
  const dataArray = Object.entries(data);

  return (
    <View style={styles.detailsContainer}>
      {dataArray.map(([key, content], index: number) =>
        useMemo(
          () => <CardDetailsRow key={index} label={key} data={content} />,
          [key, content],
        ),
      )}
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

import React, {useMemo} from 'react';
import {StyleSheet, View} from 'react-native';

import CardDetailsRow from './cardDetailsRow';

import {detailsType} from '../../../types';

type Props = {
  data: detailsType;
};

// const modify = (data: Object[]) => {
//   return data.reduce((refdata: [], data: Object) => {
//     console.log(data, Object.entries(data));
//     return [...refdata, ...Object.entries(data)];
//   }, []);
// };

const DetailsView = ({data}: Props) => {
  console.log(data);
  const dataArray = Object.entries(data);

  return (
    <View style={styles.detailsContainer}>
      {dataArray.map(([key, content], index: number) =>
        useMemo(
          () =>
            key !== 'typeOfAddress' && (
              <CardDetailsRow key={index} label={key} data={content} />
            ),
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

import React from 'react';
import {StyleSheet, View, Text} from 'react-native';

import ScreenWrapper from '../component/ScreenWrapper';
import Card from '../component/Card';
import DetailRow from '../component/DetailRow';

import colors from '../../../constant/colors';
import {IAssetData} from '../interface/assets';

const Assets = ({currentAsset, previousAsset}: IAssetData) => {
  const currentAssets = currentAsset.map(({name, startDate, isActive}) => (
    <DetailRow label={name} value={[startDate, isActive ? 'yes' : 'no']} />
  ));

  const previousAssets = previousAsset.map(
    ({name, startDate, endDate, isActive}) => (
      <DetailRow
        label={name}
        value={[startDate, endDate, isActive ? 'yes' : 'no']}
      />
    ),
  );

  return (
    <ScreenWrapper>
      <Card title="Current Assets">
        {currentAssets.length ? (
          <>
            <View style={styles.row}>
              <View style={styles.flexStart}>
                <Text style={styles.heading}>Name</Text>
              </View>
              <View style={styles.flexEnd}>
                <Text style={styles.heading}>Start Date</Text>
              </View>
              <View style={styles.flexEnd}>
                <Text style={styles.heading}>Is Active</Text>
              </View>
            </View>
            {currentAssets}
          </>
        ) : (
          <Text>No Asset Data found !</Text>
        )}
      </Card>

      <Card title="Pervious Assets">
        {previousAssets.length ? (
          <>
            <View style={styles.row}>
              <View style={styles.flexStart}>
                <Text style={styles.heading}>Name</Text>
              </View>
              <View style={styles.flexEnd}>
                <Text style={styles.heading}>Start Date</Text>
              </View>
              <View style={styles.flexEnd}>
                <Text style={styles.heading}>End Date</Text>
              </View>
              <Text style={styles.heading}>Is Active</Text>
            </View>
            {previousAssets}
          </>
        ) : (
          <Text>No Asset Data found !</Text>
        )}
      </Card>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  heading: {
    color: colors.SECONDARY,
  },
  flexStart: {
    flex: 1,
    alignContent: 'flex-start',
  },
  flexEnd: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
});

export default React.memo(Assets);

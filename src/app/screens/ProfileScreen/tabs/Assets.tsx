import React from 'react';
import {StyleSheet, View} from 'react-native';

import ScreenWrapper from '../component/ScreenWrapper';
import Card from '../component/Card';
import Typography from '../../../components/typography';

import {IAssetData, IAsset} from '../interface/assets';

const Assets = ({currentAsset, previousAsset}: IAssetData) => {
  const currentAssetReducedData = reduceData(currentAsset || []);
  const previousAssetReducedData = reduceData(previousAsset || []);

  return (
    <ScreenWrapper>
      <Card title="Current Assets">
        {currentAsset.length ? (
          <View style={styles.row}>
            <View style={styles.column}>
              <Typography style={styles.padding} type="text">
                Name
              </Typography>
              {currentAssetReducedData.name.map(name => (
                <Typography style={styles.padding} type="secondaryText">
                  {name}
                </Typography>
              ))}
            </View>
            <View style={[styles.column, styles.flexEnd]}>
              <Typography style={styles.padding} type="text">
                Start Date
              </Typography>
              {currentAssetReducedData.startDate.map(date => (
                <Typography style={styles.padding} type="text">
                  {date}
                </Typography>
              ))}
            </View>
            <View style={[styles.column, styles.flexEnd]}>
              <Typography style={styles.padding} type="text">
                Active
              </Typography>
              {currentAssetReducedData.isActive.map(isActive => (
                <Typography style={styles.padding} type="text">
                  {isActive ? 'yes' : 'no'}
                </Typography>
              ))}
            </View>
          </View>
        ) : (
          <Typography type="secondaryText">No Current Assets!</Typography>
        )}
      </Card>

      <Card title="Previous Assets">
        {previousAsset.length ? (
          <View style={styles.row}>
            <View style={styles.column}>
              <Typography style={styles.padding} type="text">
                Name
              </Typography>
              {previousAssetReducedData.name.map(name => (
                <Typography style={styles.padding} type="secondaryText">
                  {name}
                </Typography>
              ))}
            </View>
            <View style={[styles.wideColumn, styles.flexEnd]}>
              <Typography style={styles.padding} type="text">
                Start Date
              </Typography>
              {previousAssetReducedData.startDate.map(date => (
                <Typography style={styles.padding} type="text">
                  {date}
                </Typography>
              ))}
            </View>
            <View style={[styles.wideColumn, styles.flexEnd]}>
              <Typography style={styles.padding} type="text">
                End Date
              </Typography>
              {previousAssetReducedData.endDate.map(date => (
                <Typography style={styles.padding} type="text">
                  {date}
                </Typography>
              ))}
            </View>
            <View style={[styles.column, styles.flexEnd]}>
              <Typography style={styles.padding} type="text">
                Active
              </Typography>
              {previousAssetReducedData.isActive.map(isActive => (
                <Typography style={styles.padding} type="text">
                  {isActive ? 'yes' : 'no'}
                </Typography>
              ))}
            </View>
          </View>
        ) : (
          <Typography type="secondaryText">No Previous Assets!</Typography>
        )}
      </Card>
    </ScreenWrapper>
  );
};

function reduceData(dataList: IAsset[]) {
  const result = {
    name: [] as string[],
    startDate: [] as string[],
    endDate: [] as string[],
    isActive: [] as boolean[],
  };

  return dataList.reduce((acc, asset) => {
    if (asset.name) {
      acc.name.push(asset.name);
    }

    if (asset.startDate) {
      acc.startDate.push(asset.startDate);
    }

    if (asset.endDate) {
      acc.endDate.push(asset.endDate);
    }

    if (asset.isActive) {
      acc.isActive.push(asset.isActive);
    }

    return acc;
  }, result);
}

const styles = StyleSheet.create({
  column: {
    flex: 1,
  },
  wideColumn: {
    flex: 2,
  },
  row: {
    flexDirection: 'row',
  },
  flexEnd: {
    alignItems: 'flex-end',
  },
  padding: {
    paddingVertical: 10,
  },
});

export default React.memo(Assets);

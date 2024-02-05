import React, {useState, useMemo} from 'react';
import {StyleSheet, Text, View} from 'react-native';

import {filterDataByStatus} from '../utils';

import colors from '../../../constant/colors';
import FlatSectionList, {FlatSectionListData} from './FlatSectionList';
import {TimesheetStatusFilter} from '../interface';

interface IProps<T> {
  data: FlatSectionListData<T>;
  defaultStatus: TimesheetStatusFilter;
  refreshing: boolean;
  onRefresh: () => void;
  renderItem: (
    item: T,
    superStatus: string,
    subSectionId: number,
  ) => React.ReactElement;
}

const StatusFilterList = <T,>(props: IProps<T>) => {
  const {data, defaultStatus, refreshing, onRefresh, renderItem} = props;

  const [selectedStatus, setSelectedStatus] =
    useState<TimesheetStatusFilter>(defaultStatus);

  const statusTiles = Object.values(TimesheetStatusFilter).map(text => (
    <Text
      key={text}
      onPress={() => setSelectedStatus(text)}
      style={[
        styles.tile,
        selectedStatus === text ? styles.activeTile : styles.inactiveTile,
      ]}>
      {text}
    </Text>
  ));

  const filteredData = useMemo(() => {
    return filterDataByStatus(data, selectedStatus);
  }, [data, selectedStatus]);

  return (
    <>
      <View style={styles.container}>{statusTiles}</View>
      <FlatSectionList
        data={filteredData}
        refreshing={refreshing}
        renderItem={renderItem}
        onRefresh={onRefresh}
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 5,
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  tile: {
    borderRadius: 16,
    paddingVertical: 5,
    paddingHorizontal: 16,
  },
  activeTile: {
    fontWeight: 'bold',
    color: colors.WHITE,
    backgroundColor: colors.PRIMARY,
  },
  inactiveTile: {
    borderWidth: 1,
    color: colors.SECONDARY,
    backgroundColor: colors.LIGHT_GREY_BACKGROUND,
    borderColor: colors.GREY_BORDER_COLOR,
  },
});

export default StatusFilterList;

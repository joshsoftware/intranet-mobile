import React, {useState, useMemo} from 'react';
import {StyleSheet, Text, View, TouchableWithoutFeedback} from 'react-native';

import {filterDataByStatus} from '../utils';

import colors from '../../../constant/colors';
import FlatSectionList, {FlatSectionListData} from './FlatSectionList';
import {TimesheetStatusFilter} from '../interface';

interface IProps<T> {
  data: FlatSectionListData<T>;
  defaultStatus: TimesheetStatusFilter;
  refreshing: boolean;
  ListEmptyComponent: React.FC;
  onRefresh: () => void;
  renderItem: (
    item: T,
    superStatus: string,
    subSectionId?: number,
    subSection?: string,
  ) => React.ReactElement;
}

const StatusFilterList = <T,>(props: IProps<T>) => {
  const {
    data,
    defaultStatus,
    refreshing,
    ListEmptyComponent,
    onRefresh,
    renderItem,
  } = props;

  const [selectedStatus, setSelectedStatus] =
    useState<TimesheetStatusFilter>(defaultStatus);

  const statusTiles = Object.values(TimesheetStatusFilter).map(text => (
    <TouchableWithoutFeedback
      key={text}
      onPress={() => setSelectedStatus(text)}>
      <View
        style={[
          styles.tile,
          selectedStatus === text ? styles.activeTile : styles.inactiveTile,
        ]}>
        <Text
          style={
            selectedStatus === text
              ? styles.activeTileText
              : styles.inactiveTileText
          }>
          {text}
        </Text>
      </View>
    </TouchableWithoutFeedback>
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
        ListEmptyComponent={ListEmptyComponent}
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
    overflow: 'hidden',
  },
  activeTile: {
    backgroundColor: colors.PRIMARY,
  },
  inactiveTile: {
    borderWidth: 1,
    backgroundColor: colors.LIGHT_GREY_BACKGROUND,
    borderColor: colors.GREY_BORDER_COLOR,
  },
  activeTileText: {
    fontWeight: 'bold',
    color: colors.WHITE,
  },
  inactiveTileText: {
    color: colors.SECONDARY,
  },
});

export default StatusFilterList;

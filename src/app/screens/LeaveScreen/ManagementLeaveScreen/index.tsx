import {
  ActivityIndicator,
  FlatList,
  ListRenderItemInfo,
  RefreshControl,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import React, {useCallback, useEffect, useMemo, useState} from 'react';

import FilterModal from '../component/FilterModal';
import LeaveListItem from '../component/LeaveListItem';
import Typography from '../../../components/typography';
import {useManagerLeaveList} from '../leave.hooks';

import {ILeaveFilters, ILeaveListItemData} from '../interface';
import colors from '../../../constant/colors';

type Props = {
  isModalVisible: boolean;
  toggleFilterModal: () => void;
  isPendingRoute: boolean;
  startDate: Date;
  endDate: Date;
};

const leaveListRenderItem = ({
  item,
}: ListRenderItemInfo<ILeaveListItemData>) => <LeaveListItem {...item} />;

const ManagementLeaveScreen: React.FC<Props> = ({
  isModalVisible,
  toggleFilterModal,
  isPendingRoute,
  startDate,
  endDate,
}) => {
  const [filters, setFilters] = useState<ILeaveFilters>({
    leave_type: '',
    pending_flag: isPendingRoute,
    active_or_all_flags: 'active',
    from: startDate,
    to: endDate,
  });

  const {
    data,
    isLoading,
    isError,
    error,
    refetch,
    isRefetching,
    fetchNextPage,
    isFetchingNextPage,
  } = useManagerLeaveList(filters);

  const changeFilters = useCallback(
    (updatedFilters: Partial<ILeaveFilters>) => {
      setFilters(prevFilters => ({...prevFilters, ...updatedFilters}));
    },
    [],
  );

  useEffect(() => {
    setFilters(prevFilters => ({
      ...prevFilters,
      from: startDate,
      end: endDate,
    }));
  }, [startDate, endDate]);

  const refreshControlComponent = useMemo(
    () => (
      <RefreshControl
        refreshing={!isFetchingNextPage && isRefetching}
        onRefresh={refetch}
      />
    ),
    [isFetchingNextPage, isRefetching, refetch],
  );

  const listFooterComponent = useMemo(
    () =>
      isFetchingNextPage ? (
        <ActivityIndicator
          style={styles.paddingVertical}
          color={colors.PRIMARY}
        />
      ) : null,
    [isFetchingNextPage],
  );

  const renderContent = useCallback(() => {
    if (isLoading) {
      return (
        <View style={styles.centerContainer}>
          <ActivityIndicator size="large" color={colors.PRIMARY} />
        </View>
      );
    }
    if (isError) {
      return (
        <ScrollView
          contentContainerStyle={styles.centerContainer}
          refreshControl={refreshControlComponent}>
          <Typography type="error">{error}</Typography>
        </ScrollView>
      );
    }
    if (!data) {
      return (
        <View style={styles.centerContainer}>
          <Typography type="error">Could not get leaves!</Typography>
        </View>
      );
    }
    if (!data.length) {
      return (
        <View style={styles.centerContainer}>
          <Typography type="secondaryText">No Leaves!</Typography>
        </View>
      );
    }

    return (
      <FlatList
        data={data}
        refreshControl={refreshControlComponent}
        onEndReached={() => fetchNextPage()}
        ListFooterComponent={listFooterComponent}
        renderItem={leaveListRenderItem}
      />
    );
  }, [
    data,
    error,
    fetchNextPage,
    isError,
    isLoading,
    listFooterComponent,
    refreshControlComponent,
  ]);

  return (
    <>
      {renderContent()}
      <FilterModal
        isVisible={isModalVisible}
        closeModal={toggleFilterModal}
        filters={filters}
        changeFilters={changeFilters}
      />
    </>
  );
};

const styles = StyleSheet.create({
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentContainer: {
    paddingHorizontal: 10,
    paddingVertical: 9,
  },
  paddingVertical: {
    paddingVertical: 10,
  },
  accordionSectionContainer: {
    backgroundColor: colors.WHITE,
    elevation: 5,
    marginBottom: 16,
    borderRadius: 10,
    marginHorizontal: 16,
  },
});

export default ManagementLeaveScreen;

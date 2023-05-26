import React, {useCallback, useMemo, useState} from 'react';
import {
  ActivityIndicator,
  RefreshControl,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';

import FilterModal from './FilterModal';
import Typography from '../../../components/typography';
import Touchable from '../../../components/touchable';
import DateRange from '../../../components/pickers/dateRange';

import {dateFormate, startOfMonth, todaysDate} from '../../../utils/date';
import {dateFormater} from '../../../utils/dateFormater';

import colors from '../../../constant/colors';
import {Calendar, Search} from '../../../constant/icons';
import {ILeaveFilters} from '../interface';
import {AxiosError} from 'axios';

interface Props {
  filters: ILeaveFilters;
  children: React.ReactNode;
  updateFilters: (x: ILeaveFilters) => void;
  isLoading: boolean;
  isError: boolean;
  error: AxiosError | null;
  refetch: () => void;
  isRefetching: boolean;
  isRefetchError: boolean;
  noLeaves: boolean;
  isManagement: boolean;
}

function TabScreen({
  isManagement,
  updateFilters,
  isLoading,
  isError,
  error,
  refetch,
  isRefetching,
  isRefetchError,
  children,
  noLeaves,
  filters,
}: Props) {
  const [showFilterModal, setShowFilterModal] = useState(false);

  let content: React.ReactNode = null;

  if (isLoading) {
    content = (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color={colors.PRIMARY} />
      </View>
    );
  } else if (isError || isRefetchError) {
    content = (
      <ScrollView
        contentContainerStyle={styles.centerContainer}
        refreshControl={
          <RefreshControl refreshing={isRefetching} onRefresh={refetch} />
        }>
        <Typography type="error">{error?.message}</Typography>
      </ScrollView>
    );
  } else if (noLeaves) {
    content = (
      <View style={styles.centerContainer}>
        <Typography type="secondaryText">No Leaves!</Typography>
      </View>
    );
  } else {
    content = children;
  }

  const [isDateRangeVisible, setIsDateRangeVisible] = useState(false);

  const onDateRangeSubmit = useCallback(
    (startDate?: Date, endDate?: Date) => {
      if (startDate && endDate) {
        updateFilters({
          ...filters,
          from: dateFormater(startDate),
          to: dateFormater(endDate),
        });
      } else {
        updateFilters({
          ...filters,
          from: dateFormater(startOfMonth),
          to: dateFormater(todaysDate),
        });
      }
    },
    [filters, updateFilters],
  );

  const toggelDatePicker = () => setIsDateRangeVisible(v => !v);

  const dateRangeText = useMemo(
    () => `${dateFormate(filters.from)} to ${dateFormate(filters.to)}`,
    [filters.to, filters.from],
  );

  const toggleFilterModal = () => {
    setShowFilterModal(!showFilterModal);
  };

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <View style={styles.searchBoxContainer}>
          <Touchable
            type="opacity"
            onPress={toggelDatePicker}
            activeOpacity={0.5}
            style={styles.filter}>
            <Calendar height={17} width={17} />
            <Typography type={'subheader'} style={styles.filterText}>
              {dateRangeText}
            </Typography>
          </Touchable>
          <DateRange
            onSubmit={onDateRangeSubmit}
            isVisible={isDateRangeVisible}
            toggleModal={toggelDatePicker}
            initialStartDateValue={startOfMonth}
            initialEndDateValue={todaysDate}
          />
        </View>
        <Touchable
          type="opacity"
          style={styles.filterContainer}
          onPress={toggleFilterModal}>
          <Search />
        </Touchable>
      </View>

      {content}

      <FilterModal
        isManagement={isManagement}
        isVisible={showFilterModal}
        closeModal={toggleFilterModal}
        filters={filters}
        setFilter={updateFilters}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 9,
  },
  searchBoxContainer: {
    flex: 9,
  },
  filterContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  filter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingVertical: 10,
    borderColor: colors.TEXT_INPUT_BORDER,
    borderBottomWidth: 1,
  },
  filterText: {
    fontSize: 14,
    padding: 5,
    paddingHorizontal: 16,
  },
});

export default TabScreen;

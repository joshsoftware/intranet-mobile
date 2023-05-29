import React, {useCallback, useMemo, useState} from 'react';
import {StyleSheet, View} from 'react-native';

import FilterModal from './FilterModal';
import Typography from '../../../components/typography';
import Touchable from '../../../components/touchable';
import DateRange from '../../../components/pickers/dateRange';
import RenderScreenContent from './RenderScreenContent';
import {useLeaveList} from '../leave.hooks';

import {dateFormate, startOfMonth, todaysDate} from '../../../utils/date';

import colors from '../../../constant/colors';
import {Calendar, Search} from '../../../constant/icons';
import {ILeaveFilters} from '../interface';

interface Props {
  route: string;
}

function TabScreen({route}: Props) {
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [isDateRangeVisible, setIsDateRangeVisible] = useState(false);
  const [filters, setFilters] = useState<ILeaveFilters>({
    leave_type: '',
    pending_flag: route === 'pending' ? true : false,
    active_or_all_flags: 'active',
    from: startOfMonth,
    to: todaysDate,
    page_no: 1,
  });

  const {
    data,
    isLoading,
    isError,
    error,
    refetch,
    isRefetching,
    isRefetchError,
    fetchNextPage,
    isFetchingNextPage,
  } = useLeaveList(
    filters.active_or_all_flags,
    filters.from,
    filters.leave_type,
    filters.pending_flag,
    filters.to,
    filters.project_id,
    filters.user_id,
  );

  const onDateRangeSubmit = useCallback((startDate?: Date, endDate?: Date) => {
    if (startDate && endDate) {
      setFilters(value => ({
        ...value,
        from: startDate,
        to: endDate,
      }));
    } else {
      setFilters(value => ({
        ...value,
        from: startOfMonth,
        to: todaysDate,
      }));
    }
  }, []);

  const toggelDatePicker = () => setIsDateRangeVisible(v => !v);

  const dateRangeText = useMemo(
    () => `${dateFormate(filters.from)} to ${dateFormate(filters.to)}`,
    [filters.to, filters.from],
  );

  const toggleFilterModal = useCallback(() => {
    setShowFilterModal(value => !value);
  }, [setShowFilterModal]);

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

      <RenderScreenContent
        data={data}
        isLoading={isLoading}
        isError={isError || isRefetchError}
        error={error?.message}
        refetch={refetch}
        isRefetching={isRefetching}
        fetchNextPage={fetchNextPage}
        isFetchingNextPage={isFetchingNextPage}
      />

      <FilterModal
        isVisible={showFilterModal}
        closeModal={toggleFilterModal}
        filters={filters}
        setFilter={setFilters}
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

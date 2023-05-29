import React, {useCallback, useContext, useMemo, useState} from 'react';
import {StyleSheet, View} from 'react-native';

import DateRange from '../../components/pickers/dateRange';
import EmployeeLeaveScreen from './EmployeeLeaveScreen';
import ManagementLeaveScreen from './ManagementLeaveScreen';
import Touchable from '../../components/touchable';
import Typography from '../../components/typography';

import {dateFormate, startOfMonth, todaysDate} from '../../utils/date';
import UserContext from '../../context/user.context';
import {isManagement} from '../../utils/user';

import colors from '../../constant/colors';
import {Calendar, Filter} from '../../constant/icons';
import {TDateRange} from '../../../types';

interface Props {
  route: string;
}

function TabScreen({route}: Props) {
  const [userContext] = useContext(UserContext);

  const [showFilterModal, setShowFilterModal] = useState(false);
  const [isDateRangeVisible, setIsDateRangeVisible] = useState(false);
  const [dateRange, setDateRange] = useState<TDateRange>({
    startDate: startOfMonth,
    endDate: todaysDate,
  });

  const isManagementRole = isManagement(userContext?.userData.role);

  const onDateRangeSubmit = useCallback((startDate?: Date, endDate?: Date) => {
    if (startDate && endDate) {
      setDateRange(value => ({
        ...value,
        startDate,
        endDate,
      }));
    } else {
      setDateRange(value => ({
        ...value,
        startDate: startOfMonth,
        endDate: todaysDate,
      }));
    }
  }, []);

  const toggelDatePicker = () => setIsDateRangeVisible(v => !v);

  const dateRangeText = useMemo(
    () =>
      `${dateFormate(dateRange.startDate)} to ${dateFormate(
        dateRange.endDate,
      )}`,
    [dateRange.endDate, dateRange.startDate],
  );

  const toggleFilterModal = useCallback(() => {
    setShowFilterModal(value => !value);
  }, []);

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
        {isManagementRole && (
          <Touchable
            type="opacity"
            style={styles.filterContainer}
            onPress={toggleFilterModal}>
            <Filter />
          </Touchable>
        )}
      </View>

      {isManagementRole ? (
        <ManagementLeaveScreen
          isModalVisible={showFilterModal}
          toggleFilterModal={toggleFilterModal}
          isPendingRoute={route === 'pending'}
          startDate={dateRange.startDate}
          endDate={dateRange.endDate}
        />
      ) : (
        <EmployeeLeaveScreen
          isPendingRoute={route === 'pending'}
          startDate={dateRange.startDate}
          endDate={dateRange.endDate}
        />
      )}
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

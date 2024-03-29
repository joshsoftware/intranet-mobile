import React, {useCallback, useContext, useState} from 'react';
import {StyleSheet, View} from 'react-native';

import EmployeeLeaveScreen from './EmployeeLeaveScreen';
import ManagementLeaveScreen from './ManagementLeaveScreen';
import Touchable from '../../components/touchable';
import DateRangePicker from '../../components/pickers/DateRangePicker';
import UserContext from '../../context/user.context';

import {endOfMonth, startOfMonth} from '../../utils/date';
import {isManagement} from '../../utils/user';

import colors from '../../constant/colors';
import {Filter} from '../../constant/icons';
import {TDateRange} from '../../../types';

interface Props {
  route: string;
}

function TabScreen({route}: Props) {
  const [userContext] = useContext(UserContext);

  const [showFilterModal, setShowFilterModal] = useState(false);
  const [dateRange, setDateRange] = useState<TDateRange>({
    startDate: startOfMonth(),
    endDate: endOfMonth(),
  });

  const isManagementRole = isManagement(userContext?.userData.role);

  const onDateRangeSubmit = useCallback((startDate: Date, endDate: Date) => {
    if (startDate && endDate) {
      setDateRange(() => ({
        startDate,
        endDate,
      }));
    } else {
      setDateRange(() => ({
        startDate: startOfMonth(),
        endDate: endOfMonth(),
      }));
    }
  }, []);

  const toggleFilterModal = useCallback(() => {
    setShowFilterModal(value => !value);
  }, []);

  const resetDateRange = () => {
    setDateRange({
      startDate: startOfMonth(),
      endDate: endOfMonth(),
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <View style={styles.dateRangeContainer}>
          <DateRangePicker
            startDate={dateRange.startDate}
            endDate={dateRange.endDate}
            onChange={onDateRangeSubmit}
          />
        </View>

        {/* <View style={styles.searchBoxContainer}> */}
        {/* <Touchable
            type="opacity"
            onPress={toggelDatePicker}
            activeOpacity={0.5}
            style={styles.filter}>s
            <Calendar height={17} width={17} />
            <Typography type={'subheader'} style={styles.filterText}>
              {dateRangeText}
            </Typography>
          </Touchable> */}
        {/* <DateRange
            onSubmit={onDateRangeSubmit}
            isVisible={isDateRangeVisible}
            toggleModal={toggelDatePicker}
            initialStartDateValue={dateRange.startDate}
            initialEndDateValue={dateRange.endDate}
          /> */}
        {/* </View> */}
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
          resetDateRange={resetDateRange}
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
  dateRangeContainer: {
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

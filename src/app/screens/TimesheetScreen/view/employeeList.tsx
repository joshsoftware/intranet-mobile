import React, {useCallback, useState} from 'react';
import {StyleSheet, View} from 'react-native';

import DateRangePicker from '../../../components/pickers/DateRangePicker';
import EmployeeCard from '../component/employeeCard';
import FlatSectionList from '../component/FlatSectionList';
import LoadingSpinner from '../../../components/LoadingSpinner';
import {useEmployees} from '../timesheet.hooks';

import {startOfMonth, todaysDate} from '../../../utils/date';
import {TEmpListTSResponse} from '../../../services/timesheet/types';
import {Employee} from '../interface';

type DateRangeProps = {
  startDate: Date;
  endDate: Date;
};

const EmployeeList = () => {
  const [dateRange, setDateRange] = useState<DateRangeProps>({
    startDate: startOfMonth,
    endDate: todaysDate,
  });

  const {data, isLoading, refetch, isRefetching} = useEmployees(
    dateRange.startDate,
    dateRange.endDate,
  );

  const userData = prepareFlatSectionListData(data?.user_data || []);

  // on date range change
  const onDateRangeSubmit = useCallback((startDate: Date, endDate: Date) => {
    if (startDate && endDate) {
      setDateRange({startDate, endDate});
    } else {
      setDateRange({
        startDate: startOfMonth,
        endDate: todaysDate,
      });
    }
  }, []);

  const renderItem = useCallback(
    ({item: {name, email, user_id, worked_minutes}}: {item: Employee}) => {
      return (
        <EmployeeCard
          name={name}
          email={email}
          userId={user_id}
          startDate={dateRange.startDate}
          endDate={dateRange.endDate}
          worked_minutes={worked_minutes}
        />
      );
    },
    [dateRange.startDate, dateRange.endDate],
  );

  return (
    <View style={styles.main}>
      <View style={styles.filter}>
        <DateRangePicker
          onChange={onDateRangeSubmit}
          startDate={dateRange.startDate}
          endDate={dateRange.endDate}
          maximumDate={todaysDate}
        />
      </View>

      {isLoading && <LoadingSpinner />}

      {data && (
        <EmployeeCard
          name={data.name}
          email={data.email}
          userId={data.user_id}
          worked_minutes={data.worked_minutes}
          startDate={dateRange.startDate}
          endDate={dateRange.endDate}
        />
      )}

      {data && (
        <FlatSectionList
          data={userData}
          refreshing={isRefetching}
          renderItem={renderItem}
          onRefresh={refetch}
        />
      )}
    </View>
  );
};

const prepareFlatSectionListData = (
  data: TEmpListTSResponse['data']['user_data'],
) => {
  return data.map(statusObj => ({
    title: statusObj.status,
    data: statusObj.projects.map(projectObj => ({
      title: projectObj.title,
      data: projectObj.users,
    })),
  }));
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
  },
  footer: {
    marginBottom: 100,
  },
  filter: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    gap: 5,
  },
  icon: {
    marginRight: 6,
  },
});

export default EmployeeList;

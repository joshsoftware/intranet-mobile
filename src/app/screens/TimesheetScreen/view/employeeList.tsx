import React, {useCallback, useMemo, useState} from 'react';
import {FlatList, ListRenderItemInfo, StyleSheet, View} from 'react-native';

import EmployeeCard from '../component/employeeCard';
import Input from '../../../components/input';
import Linear from '../../../components/seperator/linear';
import {useEmployees} from '../timesheet.hooks';

import {startOfMonth, todaysDate} from '../../../utils/date';

import {Search} from '../../../constant/icons';
import DateRangePicker from '../../../components/pickers/DateRangePicker';

type DateRangeProps = {
  startDate: Date;
  endDate: Date;
};

type RenderItemProps = {
  name: string;
  email: string;
  user_id: string;
};

const searchIcon = () => <Search style={styles.icon} />;

const EmployeeList = () => {
  const [searchText, setSearchText] = useState<string>('');
  const [dateRange, setDateRange] = useState<DateRangeProps>({
    startDate: startOfMonth,
    endDate: todaysDate,
  });

  const {data, isLoading, refetch} = useEmployees(
    dateRange.startDate,
    dateRange.endDate,
  );

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

  // filter out employee list basis of searched text
  const employeeList = useMemo(() => {
    if (searchText) {
      const text = searchText.toLowerCase();
      return data?.filter(({name}) => name.toLowerCase().includes(text));
    }
    return data;
  }, [data, searchText]);

  const renderItem = useCallback(
    ({item: {name, email, user_id}}: ListRenderItemInfo<RenderItemProps>) => {
      return (
        <EmployeeCard
          name={name}
          email={email}
          userId={user_id}
          startDate={dateRange.startDate}
          endDate={dateRange.endDate}
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
        <Input
          onChangeText={setSearchText}
          StartIcon={searchIcon}
          placeholder="Search"
          value={searchText}
        />
      </View>

      <FlatList
        data={employeeList}
        renderItem={renderItem}
        keyExtractor={item => item.user_id}
        ItemSeparatorComponent={Linear}
        refreshing={isLoading}
        onRefresh={refetch}
        ListFooterComponent={Linear}
      />
    </View>
  );
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

import React, {useCallback, useMemo, useState} from 'react';
import {FlatList, ListRenderItemInfo, StyleSheet, View} from 'react-native';

import EmployeeCard from '../component/employeeCard';
import Input from '../../../components/input';
import DateRange from '../../../components/pickers/dateRange';
import Linear from '../../../components/seperator/linear';
import Touchable from '../../../components/touchable';
import {useEmployees} from '../timesheet.hooks';

import {startOfMonth, todaysDate} from '../../../utils/date';

import {Calendar, Search} from '../../../constant/icons';
import colors from '../../../constant/colors';

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
  const [isDateRangeApplied, setIsDateRangeApplied] = useState(false);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [searchText, setSearchText] = useState<string>('');
  const [dateRange, setDateRange] = useState<DateRangeProps>({
    startDate: startOfMonth,
    endDate: todaysDate,
  });

  const {data, isLoading, refetch} = useEmployees(
    dateRange.startDate,
    dateRange.endDate,
  );

  const toggelDatePicker = () => setIsVisible(v => !v);

  // on date range change
  const onDateRangeSubmit = useCallback((startDate?: Date, endDate?: Date) => {
    if (startDate && endDate) {
      setIsDateRangeApplied(true);
      setDateRange({startDate, endDate});
    } else {
      setIsDateRangeApplied(false);
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
      return <EmployeeCard name={name} email={email} userId={user_id} />;
    },
    [],
  );

  return (
    <View style={styles.main}>
      <DateRange
        onSubmit={onDateRangeSubmit}
        isVisible={isVisible}
        toggleModal={toggelDatePicker}
        initialStartDateValue={startOfMonth}
        initialEndDateValue={todaysDate}
      />
      <View style={styles.filter}>
        <Input
          onChangeText={setSearchText}
          StartIcon={searchIcon}
          placeholder="Search"
          style={styles.input}
        />
        <Touchable type="opacity" onPress={toggelDatePicker}>
          <Calendar
            width={18}
            height={18}
            style={styles.icon}
            fill={isDateRangeApplied ? colors.PRIMARY : colors.SECONDARY}
          />
        </Touchable>
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
  input: {
    textAlignVertical: 'center',
    width: '85%',
  },
  icon: {
    marginRight: 6,
  },
});

export default EmployeeList;

import React, {useCallback, useState} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';

import Card from '../../../components/card';
import InputBox from '../../../components/input';
import DateRange from '../../../components/pickers/dateRange';
import EmployeeCard from '../components/employeeCard';
import Linear from '../../../components/seperator/linear';

import {Search} from '../../../constant/icons';
import {employeeList} from '../../../constant/timesheet';
import colors from '../../../constant/colors';

type Props = {
  item: {
    name: string;
    email: string;
    employee_id: string;
  };
};

const renderItem = ({item}: Props) => (
  <Card key={item.name} style={styles.card} onPress={() => undefined}>
    <EmployeeCard name={item.name} email={item.email} />
  </Card>
);

const seperator = () => <Linear />;

const footer = () => <Linear style={styles.footer} />;

const ManagerScreen = () => {
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();

  const [input, setInput] = useState<string>();

  const onChangeStart = useCallback((date?: Date) => setStartDate(date), []);

  const onChangeEnd = useCallback((date?: Date) => setEndDate(date), []);

  const onTextChange = useCallback((value: string) => setInput(value), []);

  return (
    <View style={styles.main}>
      <DateRange
        onChangeStart={onChangeStart}
        onChangeEnd={onChangeEnd}
        startDate={startDate}
        endDate={endDate}
      />

      <InputBox
        onChangeText={onTextChange}
        StartIcon={Search}
        value={input}
        placeholder="Search"
      />

      <FlatList
        data={employeeList}
        renderItem={renderItem}
        keyExtractor={(item, index) => item.employee_id + index}
        ItemSeparatorComponent={seperator}
        ListFooterComponent={footer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    height: '100%',
  },
  card: {
    backgroundColor: colors.WHITE,
    elevation: 0,
  },
  footer: {
    paddingBottom: 100,
    borderWidth: 0,
    borderTopWidth: 1,
  },
});

export default ManagerScreen;

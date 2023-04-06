import React, {useCallback, useState} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';

import Card from '../../../components/card';
import Input from '../../../components/input/textInput';
import DateRange from '../../../components/pickers/dateRange';
import EmployeeCard from '../components/employeeCard';

import {Search} from '../../../constant/icons';
import {employeeList} from '../../../constant/timesheet';

type Props = {
  item: {
    name: string;
    email: string;
    employee_id: string;
  };
};

const renderItem = ({item}: Props) => (
  <Card key={item.name} onPress={() => undefined}>
    <EmployeeCard name={item.name} email={item.email} />
  </Card>
);

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
      <Input
        onChangeText={onTextChange}
        startIcon={<Search />}
        value={input}
        placeholder="Search"
      />

      <FlatList
        data={employeeList}
        renderItem={renderItem}
        keyExtractor={(item, index) => item.employee_id + index}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    height: '100%',
  },
});

export default ManagerScreen;

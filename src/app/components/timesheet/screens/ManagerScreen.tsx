import React, {useCallback, useState} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';

import Card from '../../card';
import Input from '../../input/textInput';
import DateRange from '../../pickers/dateRange';
import EmployeeCard from '../employeeCard';

import {Search} from '../../../constant/icons';

const employeeList = [
  {
    employee_id: '101',
    name: 'Abhijit Kasbe',
    email: 'abhijit.kasbe@joshsoftware.com',
  },
  {
    employee_id: '102',
    name: 'Abhijit Kasbe',
    email: 'abhijit.kasbe@joshsoftware.com',
  },
  {
    employee_id: '103',
    name: 'Abhijit Kasbe',
    email: 'abhijit.kasbe@joshsoftware.com',
  },
  {
    employee_id: '104',
    name: 'Abhijit Kasbe',
    email: 'abhijit.kasbe@joshsoftware.com',
  },
  {
    employee_id: '105',
    name: 'Abhijit Kasbe',
    email: 'abhijit.kasbe@joshsoftware.com',
  },
  {
    employee_id: '106',
    name: 'Abhijit Kasbe',
    email: 'abhijit.kasbe@joshsoftware.com',
  },
  {
    employee_id: '107',
    name: 'Abhijit Kasbe',
    email: 'abhijit.kasbe@joshsoftware.com',
  },
];

type Props = {item: {name: string; email: string; employee_id: string}};

const RenderItem = ({item}: Props) => (
  <Card key={item.name} onPress={() => undefined}>
    <EmployeeCard details={item} />
  </Card>
);

const ManagerScreen = () => {
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();

  const [input, setInput] = useState<string>();

  const onChange = useCallback(
    (date: Date | undefined, isStart: boolean) =>
      isStart ? setStartDate(date) : setEndDate(date),
    [],
  );

  const onTextChange = useCallback((value: string) => setInput(value), []);

  return (
    <View style={styles.main}>
      <DateRange onChange={onChange} startDate={startDate} endDate={endDate} />
      <Input
        onChange={onTextChange}
        startIcon={<Search />}
        value={input}
        placeholder="Search"
      />

      <FlatList
        data={employeeList}
        renderItem={RenderItem}
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

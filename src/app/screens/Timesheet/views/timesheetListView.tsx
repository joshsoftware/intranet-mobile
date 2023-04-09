import React, {useCallback, useState} from 'react';
import {StyleSheet, View} from 'react-native';

import DateRange from '../../../components/pickers/dateRange';
import TimesheetHeader from '../components/listHeader';
import SectionListTimesheet from '../components/sectionListTimesheet';

const List = [
  {
    label: 'Projects',
    value: '5',
  },
  {
    label: 'Total Worked Hours',
    value: '5D 4H 30M',
  },
  {
    label: 'Leaves',
    value: '0',
  },
];

const timesheetList = [
  {
    title: 'AWS Training',
    data: [
      {
        timesheet_id: '201344',
        date: '2023-03-21',
        description: 'wdwd',
        work_in_hours: '1:30',
      },
      {
        timesheet_id: '201341',
        date: '2023-03-29',
        description: 'Working on it',
        work_in_hours: '5:00',
      },
      {
        timesheet_id: '201340',
        date: '2023-03-30',
        description: 'hello world',
        work_in_hours: '3:00',
      },
    ],
  },
  {
    title: 'Banor Capital- Staff Augmentation',
    data: [
      {
        timesheet_id: '201342',
        date: '2023-03-30',
        description: 'blah',
        work_in_hours: '4:30',
      },
    ],
  },
  {
    title: 'Buzbe- Shopify App',
    data: [
      {
        timesheet_id: '201343',
        date: '2023-03-30',
        description: 'dwdd',
        work_in_hours: '2:30',
      },
    ],
  },
  {
    title: 'AWS Training',
    data: [
      {
        timesheet_id: '201344',
        date: '2023-03-21',
        description: 'wdwd',
        work_in_hours: '1:30',
      },
      {
        timesheet_id: '201341',
        date: '2023-03-29',
        description: 'Working on it',
        work_in_hours: '5:00',
      },
      {
        timesheet_id: '201340',
        date: '30-03-2023',
        description: 'hello world',
        work_in_hours: '3:00',
      },
    ],
  },
  {
    title: 'Banor Capital- Staff Augmentation',
    data: [
      {
        timesheet_id: '201342',
        date: '2023-03-30',
        description: 'blah',
        work_in_hours: '4:30',
      },
    ],
  },
  {
    title: 'Buzbe- Shopify App',
    data: [
      {
        timesheet_id: '201343',
        date: '2023-03-30',
        description: 'dwdd',
        work_in_hours: '2:30',
      },
    ],
  },
];

const TimesheetList = () => {
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();

  const onChangeStart = useCallback((date?: Date) => setStartDate(date), []);

  const onChangeEnd = useCallback((date?: Date) => setEndDate(date), []);

  return (
    <View style={styles.view}>
      <DateRange
        onChangeStart={onChangeStart}
        onChangeEnd={onChangeEnd}
        startDate={startDate}
        endDate={endDate}
      />
      <TimesheetHeader data={List} />

      <SectionListTimesheet data={timesheetList} />
    </View>
  );
};

const styles = StyleSheet.create({
  view: {height: '100%'},
});

export default TimesheetList;

import React, {useCallback, useState} from 'react';
import {StyleSheet, View} from 'react-native';

import DateRange from '../../../components/pickers/dateRange';
import TimesheetHeader from '../components/listHeader';
import SectionListTimesheet from '../components/sectionListTimesheet';
import EditTimesheetModal from '../components/editTimesheetModal';

import {Timesheet, TimesheetFormData} from '../interfaces';

import {timesheetListData} from '../../../constant/timesheet';
import strings from '../../../constant/strings';

const TimesheetList = () => {
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [editTimesheetData, setEditTimesheetData] =
    useState<TimesheetFormData>();

  const toggleModal = () => setIsModalVisible(v => !v);

  const onEditSave = (data?: TimesheetFormData) => {
    console.log(data);
    toggleModal();
  };

  const onChangeStart = useCallback((date?: Date) => setStartDate(date), []);

  const onChangeEnd = useCallback((date?: Date) => setEndDate(date), []);

  const workHoursTrim = (workHours: string) =>
    workHours.slice(0, workHours.indexOf('('));

  const headerData = [
    {label: strings.PROJECTS, value: timesheetListData.projects},
    {
      label: strings.WORK_HOURS,
      value: workHoursTrim(timesheetListData.total_work),
    },
    {label: strings.LEAVES, value: timesheetListData.leaves},
  ];

  const timesheetDeleteCall = (timesheetData: Timesheet) => {
    console.log(timesheetData);
    console.log('Timesheet delete call');
  };

  const timesheetEditCall = (timesheetData: Timesheet) => {
    setEditTimesheetData({
      project: timesheetData.project ? timesheetData.project : strings.SELECT,
      project_id: timesheetData.project_id,
      date: new Date(timesheetData.date),
      workHours: timesheetData.work_in_hours,
      description: timesheetData.description,
    });

    toggleModal();
  };

  return (
    <View style={styles.view}>
      <DateRange
        onChangeStart={onChangeStart}
        onChangeEnd={onChangeEnd}
        startDate={startDate}
        endDate={endDate}
      />
      <TimesheetHeader headerData={headerData} />

      <SectionListTimesheet
        timesheetListData={timesheetListData.data}
        onDelete={timesheetDeleteCall}
        onEdit={timesheetEditCall}
      />

      {isModalVisible ? (
        <EditTimesheetModal
          isVisible={isModalVisible}
          toggleModal={toggleModal}
          formData={editTimesheetData}
          onSave={onEditSave}
        />
      ) : (
        <></>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  view: {height: '100%'},
});

export default TimesheetList;

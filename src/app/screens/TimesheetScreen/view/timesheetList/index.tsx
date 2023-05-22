import React, {useCallback, useContext, useMemo, useState} from 'react';
import {Alert, StyleSheet, View} from 'react-native';

import DateRange from '../../../../components/pickers/dateRange';
import SectionListTimesheet from '../../component/sectionListTimesheet';
import EditTimesheetModal from '../../component/editTimesheetModal';
import Typography from '../../../../components/typography';
import Header from '../../../../components/header';
import Touchable from '../../../../components/touchable';
import {useDeleteTimesheet, useTimesheets} from '../../timesheet.hooks';

import {getParams} from '../../../../navigation';
import {dateFormate, startOfMonth, todaysDate} from '../../../../utils/date';
import UserContext from '../../../../context/user.context';

import {Timesheet} from '../../interface';
import {TDateRange} from '../../../../../types';
import strings from '../../../../constant/strings';
import {TIMESHEET_SCREEN} from '../../../../constant/screenNames';
import {Calendar} from '../../../../constant/icons';
import colors from '../../../../constant/colors';
import CreateTimesheetButton from './createTimesheetButton';

const TimesheetList = () => {
  const params: any = getParams();
  const [userContextData] = useContext(UserContext);

  const userId = useMemo(
    () => params?.user_id ?? userContextData?.userData.userId ?? '',
    [params?.user_id, userContextData?.userData.userId],
  );

  const [isDateRangeVisible, setIsDateRangeVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [editTimesheetData, setEditTimesheetData] = useState<Timesheet>();
  const [dateRange, setDateRange] = useState<TDateRange>({
    startDate: startOfMonth,
    endDate: todaysDate,
  });

  const {data, isFetching, refetch} = useTimesheets(
    userId ?? '',
    dateRange.startDate,
    dateRange.endDate,
  );

  const {mutate} = useDeleteTimesheet();

  const toggleEditModal = useCallback(() => {
    setIsEditModalVisible(v => !v);
  }, []);

  const toggelDatePicker = () => setIsDateRangeVisible(v => !v);

  // on date range change
  const onDateRangeSubmit = useCallback((startDate?: Date, endDate?: Date) => {
    if (startDate && endDate) {
      setDateRange({startDate, endDate});
    } else {
      setDateRange({
        startDate: startOfMonth,
        endDate: todaysDate,
      });
    }
  }, []);

  const workHoursTrim = useCallback(
    (workHours?: string) => workHours?.slice(0, workHours.indexOf('(')),
    [],
  );

  const timesheetDeleteCall = useCallback(
    (timesheetData: Timesheet) => {
      Alert.alert(
        'Delete Timesheet',
        `Do you want to delete timesheet for ${params?.name} of date ${timesheetData.date}?`,
        [
          {
            text: 'No',
            style: 'cancel',
          },
          {
            text: 'Confirm',
            onPress: () =>
              mutate({
                timesheet_id: timesheetData?.timesheet_id,
              }),
          },
        ],
      );
    },
    [mutate, params?.name],
  );

  const timesheetEditCall = useCallback(
    (timesheetData: Timesheet) => {
      setEditTimesheetData(timesheetData);
      toggleEditModal();
    },
    [toggleEditModal],
  );

  const dateRangeText = useMemo(
    () =>
      `${dateFormate(dateRange.startDate)} to ${dateFormate(
        dateRange.endDate,
      )}`,
    [dateRange.endDate, dateRange.startDate],
  );

  return (
    <>
      {params?.user_id && (
        <Header
          title={TIMESHEET_SCREEN}
          type="secondary"
          isRightButtonVisible={false}
        />
      )}

      <View>
        <DateRange
          onSubmit={onDateRangeSubmit}
          isVisible={isDateRangeVisible}
          toggleModal={toggelDatePicker}
          initialStartDateValue={startOfMonth}
          initialEndDateValue={todaysDate}
        />
        <Touchable
          type="opacity"
          onPress={toggelDatePicker}
          activeOpacity={0.5}
          style={styles.filter}>
          <Typography type={'subheader'} style={styles.filterText}>
            {dateRangeText}
          </Typography>
          <Calendar height={17} width={17} />
        </Touchable>
        {params && (
          <View style={styles.userInfo}>
            <Typography type="header">{params?.name}</Typography>
            <Typography type="description">{params?.email}</Typography>
          </View>
        )}
      </View>

      <View style={styles.view}>
        <View style={styles.headerData}>
          <View style={styles.headerContent}>
            <Typography type="description" style={styles.title}>
              {strings.PROJECTS}
            </Typography>
            <Typography type="subheader">{data?.projects}</Typography>
          </View>
          <View style={styles.headerContent}>
            <Typography type="description" style={styles.title}>
              {strings.WORK_HOURS}
            </Typography>
            <Typography type="subheader">
              {workHoursTrim(data?.total_work)}
            </Typography>
          </View>
        </View>

        <SectionListTimesheet
          sections={data?.data ?? []}
          onDelete={timesheetDeleteCall}
          onEdit={timesheetEditCall}
          refreshing={isFetching}
          onRefresh={refetch}
          emptyListMessage={strings.NO_TIMESHEET_PRESENT}
          isDeleteVisible={userContextData?.userData.role === 'Manager'}
        />

        {isEditModalVisible && (
          <EditTimesheetModal
            isVisible={isEditModalVisible}
            toggleModal={toggleEditModal}
            refetch={refetch}
            formData={editTimesheetData}
            userId={userId}
          />
        )}
        {params?.user_id && (
          <CreateTimesheetButton userId={params?.user_id} name={params?.name} />
        )}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  view: {
    flex: 1,
  },
  headerData: {
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingBottom: 10,
  },
  headerContent: {
    flexDirection: 'row',
    paddingEnd: 10,
  },
  title: {
    paddingEnd: 5,
  },
  filter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    marginVertical: 10,
    marginHorizontal: 16,
    borderColor: colors.TEXT_INPUT_BORDER,
    borderBottomWidth: 1,
  },
  filterText: {
    fontSize: 14,
    padding: 5,
  },
  userInfo: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    flexDirection: 'column',
    gap: 6,
  },
});

export default TimesheetList;

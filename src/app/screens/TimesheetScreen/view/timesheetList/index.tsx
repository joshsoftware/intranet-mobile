import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import {Alert, StyleSheet, View} from 'react-native';

import CreateTimesheetButton from './createTimesheetButton';
import EditTimesheetModal from '../../component/editTimesheetModal';
import Typography from '../../../../components/typography';
import Header from '../../../../components/header';
import DateRangePicker from '../../../../components/pickers/DateRangePicker';
import TimesheetItem from '../../component/timesheetItem';
import StatusFilterList from '../../component/StatusFilterList';
import {useDeleteTimesheet, useTimesheets} from '../../timesheet.hooks';

import {getParams} from '../../../../navigation';
import {startOfMonth, todaysDate} from '../../../../utils/date';
import UserContext from '../../../../context/user.context';
import {IGetTimesheetsResponse} from '../../../../services/timesheet/types';
import {isManagement} from '../../../../utils/user';

import {TIMESHEET_SCREEN} from '../../../../constant/screenNames';
import colors from '../../../../constant/colors';
import {Timesheet} from '../../interface';
import {TDateRange} from '../../../../../types';
import {toTimesheetFilterStatus} from '../../utils';

const TimesheetList = () => {
  const params: any = getParams();
  const [userContextData] = useContext(UserContext);

  const isManager = isManagement(userContextData?.userData.role);
  const userId = useMemo(
    () => params?.user_id ?? userContextData?.userData.userId ?? '',
    [params?.user_id, userContextData?.userData.userId],
  );

  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [editTimesheetData, setEditTimesheetData] = useState<Timesheet>();
  const [dateRange, setDateRange] = useState<TDateRange>({
    startDate: params?.startDate ? new Date(params.startDate) : startOfMonth,
    endDate: params?.endDate ? new Date(params.endDate) : todaysDate,
  });

  const {data, isRefetching, refetch, isLoading} = useTimesheets(
    userId ?? '',
    dateRange.startDate,
    dateRange.endDate,
  );

  // user_id can be either string or number type
  // using == to check only value
  const {mutate} = useDeleteTimesheet(
    params?.user_id == userContextData?.userData.userId,
  );

  const toggleEditModal = useCallback(() => {
    setIsEditModalVisible(v => !v);
  }, []);

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
                time_sheet_date: timesheetData?.date,
                timesheet_id: timesheetData?.time_sheet_id,
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

  useEffect(() => {
    if (params?.startDate && params?.endDate) {
      setDateRange({
        startDate: new Date(params?.startDate),
        endDate: new Date(params?.endDate),
      });
    } else {
      setDateRange({
        startDate: startOfMonth,
        endDate: todaysDate,
      });
    }
  }, [params?.endDate, params?.startDate]);

  const renderItem = useCallback(
    (item: Timesheet) => (
      <TimesheetItem
        timesheetData={item}
        onEdit={timesheetEditCall}
        onDelete={timesheetDeleteCall}
        title={item.project}
        isDeleteVisible={isManager}
      />
    ),
    [isManager, timesheetDeleteCall, timesheetEditCall],
  );

  const timesheetData = processTimesheetData(data?.time_sheet_data || []);

  return (
    <>
      {params?.user_id && <Header title={TIMESHEET_SCREEN} type="secondary" />}

      <View>
        <View style={styles.dateRangePickerContainer}>
          <DateRangePicker
            onChange={onDateRangeSubmit}
            startDate={dateRange.startDate}
            endDate={dateRange.endDate}
            maximumDate={todaysDate}
          />
        </View>

        {(params?.name || params?.email) && (
          <View style={styles.userInfo}>
            <Typography type="header">{params?.name}</Typography>
            <Typography type="description">{params?.email}</Typography>
          </View>
        )}
      </View>

      {data && (
        <StatusFilterList
          data={timesheetData}
          defaultStatus={toTimesheetFilterStatus(params.status)}
          refreshing={isRefetching}
          renderItem={renderItem}
          onRefresh={refetch}
        />
      )}

      {params?.user_id && (
        <View style={styles.buttonContainer}>
          <CreateTimesheetButton userId={params?.user_id} name={params?.name} />
        </View>
      )}

      <EditTimesheetModal
        isVisible={isEditModalVisible}
        toggleModal={toggleEditModal}
        formData={editTimesheetData}
        userId={userId}
      />
    </>
  );
};

const processTimesheetData = (
  data: IGetTimesheetsResponse['data']['time_sheet_data'],
) => {
  return data.map(statusObj => ({
    title: statusObj.status,
    data: statusObj.projects.map(projectObj => ({
      title: projectObj.project,
      data: projectObj.timesheets,
    })),
  }));
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
  dateRangePickerContainer: {
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 16,
  },
  buttonContainer: {
    paddingHorizontal: 16,
    paddingVertical: 5,
  },
});

export default TimesheetList;

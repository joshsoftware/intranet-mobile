import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {Alert, StyleSheet, View, TextInput} from 'react-native';

import EditTimesheetModal from '../../component/editTimesheetModal';
import Typography from '../../../../components/typography';
import Header from '../../../../components/header';
import DateRangePicker from '../../../../components/pickers/DateRangePicker';
import TimesheetItem from '../../component/timesheetItem';
import StatusFilterList from '../../component/StatusFilterList';
import TimesheetListEmptyComponent from '../../component/TimesheetListEmptyComponent';
import CreateTimesheetButton from '../../component/CreateTimesheetButton';
import ManagerActionBar from '../../component/ManagerActionBar';
import LoadingSpinner from '../../../../components/LoadingSpinner';
import {
  useDeleteTimesheet,
  useTimesheetAction,
  useTimesheets,
} from '../../timesheet.hooks';
import useUserData from '../../../../hooks/useUserData';

import {getParams} from '../../../../navigation';
import {dateFormate, startOfMonth, todaysDate} from '../../../../utils/date';
import {IGetTimesheetsResponse} from '../../../../services/timesheet/types';
import {filterTimesheetBySearch, toTimesheetFilterStatus} from '../../utils';
import {isManagement} from '../../../../utils/user';

import {TIMESHEET_SCREEN} from '../../../../constant/screenNames';
import colors from '../../../../constant/colors';
import {Search} from '../../../../constant/icons';
import {Timesheet, TimesheetAction} from '../../interface';
import {TDateRange} from '../../../../../types';

const TimesheetList = () => {
  const params: any = getParams();
  const userData = useUserData();

  const isManager = isManagement(userData.role);
  const userId = useMemo(
    () => params?.user_id ?? userData.userId ?? '',
    [params?.user_id, userData.userId],
  );

  const [projectSearchText, setProjectSearchText] = useState(
    params?.projectFilter || '',
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

  const {
    isLoading: isActionLoading,
    isApproved,
    isRejected,
    isActionMode,
    checkedTimesheets,
    erroredTimesheets,
    isTimesheetChecked,
    toggleCheckTimesheet,
    performAction,
    clearAllChecked,
  } = useTimesheetAction();

  // user_id can be either string or number type
  // using == to check only value
  const isSelf =
    !params?.user_id ||
    params?.user_id.toString() === userData.userId.toString();

  const {mutate} = useDeleteTimesheet(isSelf);

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

  const handleApprove = () => {
    performAction({
      from_date: dateFormate(dateRange.startDate),
      to_date: dateFormate(dateRange.endDate),
      timesheet_ids: checkedTimesheets,
      action_type: TimesheetAction.Approve,
    });
  };

  const handleReject = (reason: string) => {
    performAction({
      from_date: dateFormate(dateRange.startDate),
      to_date: dateFormate(dateRange.endDate),
      timesheet_ids: checkedTimesheets,
      action_type: TimesheetAction.Reject,
      reject_reason: reason,
    });
  };

  const renderItem = useCallback(
    (item: Timesheet) => {
      const isChecked = isTimesheetChecked(item.time_sheet_id);
      const errorMessage = erroredTimesheets[item.time_sheet_id];
      const toggleChecked = () => {
        toggleCheckTimesheet(item.time_sheet_id);
      };

      return (
        <TimesheetItem
          timesheetData={item}
          onEdit={timesheetEditCall}
          onDelete={timesheetDeleteCall}
          isDeleteVisible={isManager}
          showCheckbox={!isSelf && isManager}
          isChecked={isChecked}
          error={errorMessage}
          toggleCheckbox={toggleChecked}
        />
      );
    },
    [
      isSelf,
      isManager,
      erroredTimesheets,
      timesheetDeleteCall,
      timesheetEditCall,
      isTimesheetChecked,
      toggleCheckTimesheet,
    ],
  );

  let timesheetData = useMemo(
    () => processTimesheetData(data?.time_sheet_data || []),
    [data],
  );
  timesheetData = useMemo(
    () => filterTimesheetBySearch(timesheetData, projectSearchText),
    [timesheetData, projectSearchText],
  );

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

      <View style={styles.projectSearchBox}>
        <Search />
        <TextInput
          placeholder="Search Project"
          value={projectSearchText}
          onChangeText={setProjectSearchText}
        />
      </View>

      {isLoading && <LoadingSpinner />}

      {data && (
        <StatusFilterList
          data={timesheetData}
          defaultStatus={toTimesheetFilterStatus(params?.status)}
          refreshing={isRefetching}
          ListEmptyComponent={TimesheetListEmptyComponent}
          renderItem={renderItem}
          onRefresh={refetch}
        />
      )}

      {!isActionMode && (
        <CreateTimesheetButton
          userId={params?.user_id}
          userName={params?.name}
        />
      )}

      {isActionMode && (
        <ManagerActionBar
          disabled={isActionLoading}
          isApproved={isApproved}
          isRejected={isRejected}
          onApprove={handleApprove}
          onReject={handleReject}
          onCancel={clearAllChecked}
        />
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
  projectSearchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginHorizontal: 16,
    borderBottomColor: colors.TEXT_INPUT_BORDER,
    borderBottomWidth: 1,
  },
});

export default TimesheetList;

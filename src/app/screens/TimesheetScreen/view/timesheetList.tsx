import React, {
  Fragment,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';
import {Alert, StyleSheet, TouchableOpacity, View} from 'react-native';
import {useMutation, useQuery} from 'react-query';

import DateRange from '../../../components/pickers/dateRange';
import SectionListTimesheet from '../component/sectionListTimesheet';
import EditTimesheetModal from '../component/editTimesheetModal';
import Typography from '../../../components/typography';
import Header from '../../../components/header';
import ErrorMessage from '../../../components/errorMessage';

import {dateFormater} from '../../../utils/dateFormater';
import {Employee, Timesheet} from '../interface';

import {getTimesheetRequest} from '../../../services/timesheet/getTimesheet';
import UserContext from '../../../context/user.context';
import {deleteTimesheetRequest} from '../../../services/timesheet/deleteTimesheet';
import bottomToast from '../../../utils/toast';

import strings from '../../../constant/strings';
import sizes from '../../../constant/sizes';
import {TIMESHEET_SCREEN} from '../../../constant/screenNames';
import {Calendar} from '../../../constant/icons';
import colors from '../../../constant/colors';

import {borderStyles, flexStyles} from '../../../../styles';

type Props = {
  route?: {
    params: Employee;
  };
};

const TimesheetList = ({route}: Props) => {
  const newDate = useMemo(() => new Date(), []);
  const startOfMonth = useMemo(
    () => new Date(newDate.getFullYear(), newDate.getMonth(), 1),
    [newDate],
  );

  const [userContextData] = useContext(UserContext);

  const [isDateRangeVisible, setIsDateRangeVisible] = useState(false);
  const [isDateRangeApplied, setIsDateRangeApplied] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [editTimesheetData, setEditTimesheetData] = useState<Timesheet>();
  const [dateRange, setDateRange] = useState<{
    start_date: string;
    end_date: string;
  }>({start_date: dateFormater(startOfMonth), end_date: dateFormater(newDate)});

  const {data, isFetching, refetch, isRefetching} = useQuery(
    [
      'timesheet/list',
      userContextData?.userData.userId,
      route?.params.user_id,
      dateRange,
    ],
    () =>
      getTimesheetRequest({
        user_id: route
          ? route.params.user_id
          : userContextData?.userData.userId + '',
        from_date: dateRange.start_date,
        to_date: dateRange.end_date,
      }),
  );

  const mutation = useMutation({
    mutationFn: (deleteData: Timesheet) =>
      deleteTimesheetRequest({
        time_sheet_date: deleteData.date,
        project_id: deleteData.project + '',
        user_id: route
          ? route.params.user_id
          : userContextData?.userData.userId + '',
      }),
    onSuccess: successData => {
      bottomToast(successData.data.message);
      refetch();
    },
    onError: () => bottomToast(strings.DELETE_ERROR, true),
  });

  const toggleEditModal = useCallback(() => {
    setIsEditModalVisible(v => !v);
    refetch();
  }, [refetch]);
  const toggelDatePicker = useCallback(
    () => setIsDateRangeVisible(v => !v),
    [],
  );

  const onDateRangeSubmit = useCallback(
    (startDate?: Date, endDate?: Date) => {
      if (startDate && endDate) {
        setIsDateRangeApplied(true);
        setDateRange({
          start_date: dateFormater(startDate),
          end_date: dateFormater(endDate),
        });
      } else {
        setIsDateRangeApplied(false);
        setDateRange({
          start_date: dateFormater(startOfMonth),
          end_date: dateFormater(newDate),
        });
      }
    },
    [newDate, startOfMonth],
  );

  const workHoursTrim = useCallback(
    (workHours?: string) => workHours?.slice(0, workHours.indexOf('(')),
    [],
  );

  const timesheetDeleteCall = useCallback(
    (timesheetData: Timesheet) => {
      Alert.alert(
        'Delete Timesheet',
        `Do you want to delete timesheet on ${timesheetData.date}?`,
        [
          {
            text: 'No',
            style: 'cancel',
          },
          {
            text: 'Confirm',
            onPress: () => mutation.mutate(timesheetData),
          },
        ],
      );
    },
    [mutation],
  );

  const timesheetEditCall = useCallback(
    (timesheetData: Timesheet) => {
      setEditTimesheetData(timesheetData);
      toggleEditModal();
    },
    [toggleEditModal],
  );

  return data?.data.code === 401 ? (
    <View style={flexStyles.center}>
      <ErrorMessage message={data?.data.message} />
    </View>
  ) : (
    <Fragment>
      {route ? (
        <Header
          title={TIMESHEET_SCREEN}
          type="secondary"
          isRightButtonVisible={false}
        />
      ) : (
        <></>
      )}

      <View style={styles.background}>
        <TouchableOpacity
          onPress={toggelDatePicker}
          activeOpacity={0.5}
          style={[
            flexStyles.horizontal,
            borderStyles.thinBorder,
            styles.filter,
          ]}>
          <Typography
            type={isDateRangeApplied ? 'subheader' : 'description'}
            style={styles.filterText}>
            {isDateRangeApplied
              ? `${dateRange.start_date} to ${dateRange.end_date}`
              : strings.SELECT_DATE_RANGE}
          </Typography>
          <Calendar
            height={17}
            width={17}
            fill={isDateRangeApplied ? colors.PRIMARY : colors.SECONDARY}
          />
        </TouchableOpacity>
        {route ? (
          <View style={{paddingHorizontal: 16, paddingVertical: 8}}>
            <Typography type="header" style={{paddingBottom: 6}}>
              {route?.params?.name}
            </Typography>
            <Typography type="description">{route?.params?.email}</Typography>
          </View>
        ) : (
          <></>
        )}
      </View>
      <View style={[styles.view, styles.background]}>
        <DateRange
          onSubmit={onDateRangeSubmit}
          isVisible={isDateRangeVisible}
          toggleModal={toggelDatePicker}
          initialStartDateValue={startOfMonth}
          initialEndDateValue={newDate}
        />

        <View style={[flexStyles.horizontal, styles.headerData]}>
          <Typography type="description" style={styles.text}>
            {strings.PROJECTS}
          </Typography>
          <Typography type="subheader" style={styles.text}>
            {data?.data.data[0].projects}
          </Typography>
          <Typography type="description" style={styles.text}>
            {strings.WORK_HOURS}
          </Typography>
          <Typography type="subheader" style={styles.text}>
            {workHoursTrim(data?.data.data[0].total_work)}
          </Typography>
        </View>

        <SectionListTimesheet
          sections={data ? data?.data.data[0].data : []}
          timesheetListData={data ? data?.data.data[0].data : []}
          onDelete={timesheetDeleteCall}
          onEdit={timesheetEditCall}
          refreshing={isFetching || isRefetching}
          onRefresh={refetch}
          emptyListMessage={strings.NO_TIMESHEET_PRESENT}
          isDeleteVisible={userContextData?.userData.role === 'Manager'}
        />

        {data?.data.message && <ErrorMessage message={data?.data.message} />}

        {isEditModalVisible ? (
          <EditTimesheetModal
            isVisible={isEditModalVisible}
            toggleModal={toggleEditModal}
            formData={editTimesheetData}
            userId={
              route
                ? route.params.user_id
                : userContextData?.userData.userId + ''
            }
            current_user={userContextData?.userData.userId + ''}
          />
        ) : (
          <></>
        )}
      </View>
    </Fragment>
  );
};

const styles = StyleSheet.create({
  view: {
    paddingHorizontal: sizes.CONTAINER_HORIZONTAL_MARGIN,
    flex: 1,
  },
  headerData: {
    justifyContent: 'flex-start',
  },
  text: {
    paddingEnd: 10,
    paddingBottom: 10,
    fontSize: 12,
  },
  filter: {
    justifyContent: 'space-between',
    paddingVertical: 10,
    marginBottom: 10,
    marginHorizontal: sizes.CONTAINER_HORIZONTAL_MARGIN,
  },
  filterText: {
    fontSize: 14,
    padding: 5,
  },
  background: {
    backgroundColor: colors.WHITE,
  },
});

export default TimesheetList;

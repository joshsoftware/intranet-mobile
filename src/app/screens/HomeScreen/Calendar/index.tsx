import React, {useCallback, useContext, useMemo, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {CalendarList, DateData} from 'react-native-calendars';
import {useNavigation} from '@react-navigation/native';

import Typography from '../../../components/typography';
import Label from './Label';
import {useHomeCalendar} from '../dashboard.hooks';

import {getMonthYearFromISO, todaysDate} from '../../../utils/date';
import {generateMarkedDates} from '../../../utils/home';
import {isManagement} from '../../../utils/user';
import UserContext from '../../../context/user.context';

import colors from '../../../constant/colors';
import {TIMESHEET_SCREEN, USER_TIMESHEET} from '../../../constant/screenNames';

const theme = {
  textDayFontSize: 14,
  monthTextColor: colors.PRIMARY,
  textMonthFontSize: 14,
  textMonthFontWeight: 'bold' as 'bold',
  'stylesheet.calendar.header': {
    header: {
      justifyContent: 'flex-start',
    },
  },
  'stylesheet.calendar.main': {
    week: {
      marginVertical: 4,
      flexDirection: 'row',
      justifyContent: 'space-around',
    },
  },
};

function Calendar() {
  const navigation = useNavigation<any>();
  const [userData] = useContext(UserContext);

  const isManager = isManagement(userData?.userData.role);

  const [month, setMonth] = useState(
    todaysDate().toLocaleString('indian', {month: 'long'}),
  );
  const [year, setYear] = useState(todaysDate().getFullYear());

  const {approved, pending, not_filled, rejected, leaves, holidays, isLoading} =
    useHomeCalendar(month, year);

  const handleMonthChange = (date: DateData) => {
    const monthYear = getMonthYearFromISO(date.dateString);

    setMonth(monthYear.month);
    setYear(monthYear.year);
  };

  const markedDates = useMemo(() => {
    return generateMarkedDates({
      approved,
      pending,
      rejected,
      not_filled,
      leaves,
      holidays,
    });
  }, [approved, pending, rejected, not_filled, leaves, holidays]);

  const onDatePress = useCallback(
    ({
      dateString,
      day: selected_day,
      month: selected_month,
      year: selected_year,
    }: DateData) => {
      const commonParams = {startDate: dateString, endDate: dateString};

      const screen = isManager ? USER_TIMESHEET : TIMESHEET_SCREEN;
      const params = isManager
        ? {...commonParams, user_id: userData?.userData.userId}
        : commonParams;

      const today = new Date();

      if (
        selected_day === today.getDate() &&
        selected_month === today.getMonth() + 1 &&
        selected_year === today.getFullYear()
      ) {
        navigation.navigate(screen, params);
        return;
      }

      switch (markedDates[dateString]?.type) {
        case 'approved':
          navigation.navigate(screen, params);
          return;

        case 'not_filled':
          navigation.navigate(screen, {
            ...params,
            isAddModalOpen: true,
          });
          return;

        case 'pending':
          navigation.navigate(screen, params);
          return;

        case 'rejected':
          navigation.navigate(screen, params);
          return;

        default:
          return;
      }
    },
    [isManager, markedDates, navigation, userData?.userData.userId],
  );

  return (
    <View style={styles.container}>
      <Typography type="header" style={styles.title}>
        Timesheet
      </Typography>

      <View style={styles.labelContainer}>
        <Label
          count={approved.length}
          text="Approved"
          color={colors.LIGHT_GREEN_BACKGROUND}
        />
        <Label
          count={not_filled.length + rejected.length}
          text="Action Required"
          color={colors.LIGHT_RED_BACKGROUND}
        />
        <Label
          count={pending.length}
          text="Pending"
          color={colors.YELLOW_BACKGROUND}
        />
        <Label
          count={leaves.length}
          text="Leave"
          color={colors.LIGHT_BLUE_BACKGROUND}
        />
        <Label
          count={holidays.length}
          text="Holiday"
          color={colors.GRAY_BACKGROUND}
        />
      </View>

      <CalendarList
        theme={theme}
        displayLoadingIndicator={isLoading}
        onMonthChange={handleMonthChange}
        horizontal={true}
        pagingEnabled={true}
        markingType="custom"
        markedDates={markedDates}
        firstDay={1}
        onDayPress={onDatePress}
        // calendarHeight is used as minHeight in library
        // calendar will expand to take required space
        calendarHeight={0}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderBottomLeftRadius: 19,
    borderBottomRightRadius: 19,
    elevation: 5,
    shadowColor: colors.SECONDARY,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    backgroundColor: colors.WHITE,
    marginBottom: 15,
    paddingVertical: 16,
  },
  title: {
    fontWeight: 'bold',
    paddingHorizontal: 16,
    paddingBottom: 10,
  },
  labelContainer: {
    flexDirection: 'row',
    backgroundColor: colors.LIGHT_GREY_BACKGROUND,
  },
});

export default Calendar;

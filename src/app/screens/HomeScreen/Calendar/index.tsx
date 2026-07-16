import React, {useMemo, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {CalendarList, DateData} from 'react-native-calendars';

import Typography from '../../../components/typography';
import Label from './Label';
import {useHomeCalendar} from '../dashboard.hooks';

import {getMonthYearFromISO, todaysDate} from '../../../utils/date';
import {generateMarkedDates} from '../../../utils/home';

import colors from '../../../constant/colors';

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

const MONTH_MAP: { [key: string]: number } = {
  January: 0, February: 1, March: 2, April: 3, May: 4, June: 5,
  July: 6, August: 7, September: 8, October: 9, November: 10, December: 11
};

function Calendar() {
  const [month, setMonth] = useState(
    todaysDate().toLocaleString('indian', {month: 'long'}),
  );
  const [year, setYear] = useState(todaysDate().getFullYear());

  const {approved, pending, not_filled, rejected, leaves, holidays, weekends, isLoading} =
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
      weekends,
    });
  }, [approved, pending, rejected, not_filled, leaves, holidays, weekends]);

  const onDatePress = () => {
    // Navigation to timesheet from day press is disabled as per user request
  };

  const numWeeks = useMemo(() => {
    const monthIndex = MONTH_MAP[month] ?? 0;
    const firstDayIndex = (new Date(year, monthIndex, 1).getDay() + 6) % 7;
    const totalDays = new Date(year, monthIndex + 1, 0).getDate();
    return Math.ceil((firstDayIndex + totalDays) / 7);
  }, [month, year]);

  const calendarHeight = useMemo(() => {
    if (numWeeks === 4) return 210;
    if (numWeeks === 5) return 250;
    return 290; // 6 weeks
  }, [numWeeks]);

  return (
    <View style={styles.container}>
      <Typography type="header" style={styles.title}>
        Calendar
      </Typography>

      <View style={styles.labelContainer}>
        <Label
          count={approved.length}
          text="Present"
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
        calendarHeight={calendarHeight}
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
    maxWidth: 480,
    width: '100%',
    alignSelf: 'center',
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

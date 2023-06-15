import React, {useMemo, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {CalendarList, DateData} from 'react-native-calendars';

import Typography from '../../../components/typography';
import Label from './Label';
import {useHomeCalendar} from '../dashboard.hooks';

import {getMonthYearFromISO, todaysDate} from '../../../utils/date';

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
      marginVertical: 2,
      flexDirection: 'row',
      justifyContent: 'space-around',
    },
  },
};

function Calendar() {
  const [month, setMonth] = useState(
    todaysDate.toLocaleString('indian', {month: 'long'}),
  );
  const [year, setYear] = useState(todaysDate.getFullYear());

  const {filled, notFilled, incompleteFilled, leaves, holidays, isLoading} =
    useHomeCalendar(month, year);

  const handleMonthChange = (date: DateData) => {
    const monthYear = getMonthYearFromISO(date.dateString);

    setMonth(monthYear.month);
    setYear(monthYear.year);
  };

  const markedDates = useMemo(() => {
    let result: Record<string, any> = {};

    result = filled.reduce((acc, date) => {
      acc[date] = {
        customStyles: {
          container: {
            backgroundColor: colors.LIGHT_GREEN_BACKGROUND,
            justifyContent: 'center',
            alignItems: 'center',
          },
        },
      };

      return acc;
    }, result);

    result = notFilled.reduce((acc, date) => {
      acc[date] = {
        customStyles: {
          container: {
            backgroundColor: colors.LIGHT_RED_BACKGROUND,
            justifyContent: 'center',
            alignItems: 'center',
          },
        },
      };

      return acc;
    }, result);

    result = incompleteFilled.reduce((acc, date) => {
      acc[date] = {
        customStyles: {
          container: {
            backgroundColor: colors.YELLOW_BACKGROUND,
            justifyContent: 'center',
            alignItems: 'center',
          },
        },
      };

      return acc;
    }, result);

    result = leaves.reduce((acc, date) => {
      acc[date] = {
        customStyles: {
          container: {
            backgroundColor: colors.LIGHT_BLUE_BACKGROUND,
            justifyContent: 'center',
            alignItems: 'center',
          },
        },
      };

      return acc;
    }, result);

    result = holidays.reduce((acc, date) => {
      acc[date] = {
        customStyles: {
          container: {
            backgroundColor: colors.GRAY_BACKGROUND,
            justifyContent: 'center',
            alignItems: 'center',
          },
        },
      };

      return acc;
    }, result);

    return result;
  }, [filled, notFilled, incompleteFilled, leaves, holidays]);

  return (
    <View style={styles.container}>
      <Typography type="header" style={styles.title}>
        Timesheet
      </Typography>

      <View style={styles.labelContainer}>
        <Label
          count={filled.length}
          text="Filled"
          color={colors.LIGHT_GREEN_BACKGROUND}
        />
        <Label
          count={notFilled.length}
          text="Not Filled"
          color={colors.LIGHT_RED_BACKGROUND}
        />
        <Label
          count={incompleteFilled.length}
          text="< 8hrs"
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
    backgroundColor: colors.WHITE,
    marginBottom: 15,
    paddingVertical: 16,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    paddingHorizontal: 16,
    paddingBottom: 10,
  },
  labelContainer: {
    flexDirection: 'row',
  },
});

export default Calendar;

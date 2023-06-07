import React from 'react';
import {StyleSheet, View} from 'react-native';
import {CalendarList} from 'react-native-calendars';

import Typography from '../../../components/typography';
import Label from './Label';

import colors from '../../../constant/colors';

const theme = {
  textDayFontSize: 14,
  monthTextColor: colors.PRIMARY,
  textMonthFontSize: 14,
  textMonthFontWeight: 'bold' as 'bold',
  'stylesheet.calendar-list.main': {
    container: {
      height: 280,
    },
  },
  'stylesheet.calendar.header': {
    header: {
      justifyContent: 'flex-start',
    },
  },
  'stylesheet.day.basic': {
    base: {
      justifyContent: 'center',
      alignItems: 'center',
      height: 20,
      width: 20,
    },
  },
};

function Calendar() {
  return (
    <View style={styles.container}>
      <Typography type="header" style={styles.title}>
        Timesheet
      </Typography>

      <View style={styles.labelContainer}>
        <Label
          text="Completed"
          color={colors.LIGHT_GREEN_BACKGROUND}
          borderColor={colors.GREEN_BORDER}
        />
        <Label
          text="Not Completed"
          color={colors.LIGHT_RED_BACKGROUND}
          borderColor={colors.RED_BORDER}
        />
        <Label
          text="Less than 8hrs"
          color={colors.YELLOW_BACKGROUND}
          borderColor={colors.YELLOW_BORDER}
        />
      </View>

      <CalendarList
        horizontal={true}
        pagingEnabled={true}
        showSixWeeks={false}
        theme={theme}
        markingType="custom"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderBottomLeftRadius: 19,
    borderBottomRightRadius: 19,
    elevation: 10,
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
    justifyContent: 'space-around',
    backgroundColor: colors.LIGHT_GREY_BACKGROUND,
    paddingVertical: 8,
  },
});

export default Calendar;

import React, {useMemo, useState} from 'react';
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import {Calendar as RNCalendar} from 'react-native-calendars';

import Typography from '../../../components/typography';
import {useHomeCalendar, useAttendanceSummary} from '../dashboard.hooks';

import {todaysDate} from '../../../utils/date';
import {generateMarkedDates} from '../../../utils/home';

import colors from '../../../constant/colors';
import Svg, {Path} from 'react-native-svg';

const ChevronDownIcon = () => (
  <Svg width="16" height="16" viewBox="0 0 24 24" fill="none">
    <Path
      d="M6 9L12 15L18 9"
      stroke={colors.PRIMARY}
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const ChevronUpIcon = () => (
  <Svg width="16" height="16" viewBox="0 0 24 24" fill="none">
    <Path
      d="M18 15L12 9L6 15"
      stroke={colors.PRIMARY}
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const ChevronLeftIcon = () => (
  <Svg width="16" height="16" viewBox="0 0 24 24" fill="none">
    <Path
      d="M15 18L9 12L15 6"
      stroke="#667085"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const ChevronRightIcon = () => (
  <Svg width="16" height="16" viewBox="0 0 24 24" fill="none">
    <Path
      d="M9 18L15 12L9 6"
      stroke="#667085"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

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

const MONTH_MAP: {[key: string]: number} = {
  January: 0,
  February: 1,
  March: 2,
  April: 3,
  May: 4,
  June: 5,
  July: 6,
  August: 7,
  September: 8,
  October: 9,
  November: 10,
  December: 11,
};

const isLast5DaysOrPastMonth = (selectedMonthIndex: number, selectedYear: number): boolean => {
  const today = todaysDate();
  const currentYear = today.getFullYear();
  const currentMonthIndex = today.getMonth() + 1;
  const currentDay = today.getDate();

  if (selectedYear < currentYear) return true;
  if (selectedYear > currentYear) return false;

  if (selectedMonthIndex < currentMonthIndex) return true;
  if (selectedMonthIndex > currentMonthIndex) return false;

  const totalDaysInMonth = new Date(selectedYear, selectedMonthIndex, 0).getDate();
  return currentDay >= totalDaysInMonth - 4;
};

function Calendar() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [month, setMonth] = useState(
    todaysDate().toLocaleString('indian', {month: 'long'}),
  );
  const [year, setYear] = useState(todaysDate().getFullYear());

  const monthIndex = (MONTH_MAP[month] ?? 8) + 1;
  const {
    presentDays: apiPresentDays,
    absentDays: apiAbsentDays,
    pendingLeaves: apiPendingLeaves,
    approvedLeaves: apiApprovedLeaves,
    holidays: apiHolidays,
    summary: attendanceSummary,
  } = useAttendanceSummary({
    month: monthIndex,
    year,
  });

  const {
    approved,
    pending,
    not_filled,
    rejected,
    leaves,
    holidays,
    weekends,
    isLoading,
  } = useHomeCalendar(month, year);

  const presentCount = approved.length;
  const absentCount = not_filled.length + rejected.length;
  const pendingLeavesCount = pending.length;
  const approvedLeavesCount = leaves.length;
  const holidaysCount = holidays.length;

  const showActionRequired = absentCount > 0 && isLast5DaysOrPastMonth(monthIndex, year);

  const MONTH_NAMES = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December',
  ];

  const handlePrevMonth = () => {
    const idx = MONTH_MAP[month] ?? 9;
    let newIdx = idx - 1;
    let newYear = year;
    if (newIdx < 0) {
      newIdx = 11;
      newYear -= 1;
    }
    setMonth(MONTH_NAMES[newIdx]);
    setYear(newYear);
  };

  const handleNextMonth = () => {
    const idx = MONTH_MAP[month] ?? 9;
    let newIdx = idx + 1;
    let newYear = year;
    if (newIdx > 11) {
      newIdx = 0;
      newYear += 1;
    }
    setMonth(MONTH_NAMES[newIdx]);
    setYear(newYear);
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

  const currentFormattedDate = useMemo(() => {
    const m = monthIndex < 10 ? `0${monthIndex}` : `${monthIndex}`;
    return `${year}-${m}-01`;
  }, [year, monthIndex]);

  return (
    <View style={styles.container}>
      {/* Header Row */}
      <View style={styles.headerRow}>
        <View>
          <Typography style={styles.categoryLabel}>ATTENDANCE</Typography>
          <Typography style={styles.cardTitle}>
            {month} {year}
          </Typography>
        </View>

        <View style={styles.monthNav}>
          <TouchableOpacity style={styles.navBtn} onPress={handlePrevMonth}>
            <ChevronLeftIcon />
          </TouchableOpacity>
          <View style={styles.navDivider} />
          <TouchableOpacity style={styles.navBtn} onPress={handleNextMonth}>
            <ChevronRightIcon />
          </TouchableOpacity>
        </View>
      </View>

      {/* Attendance Stats Summary Row */}
      <View style={styles.statsSummaryRow}>
        <View style={styles.statItem}>
          <Typography style={[styles.statValue, {color: '#10B981'}]}>
            {presentCount}
          </Typography>
          <Typography style={styles.statLabel}>Present</Typography>
        </View>

        <View style={styles.statDivider} />

        <View style={styles.statItem}>
          <Typography style={[styles.statValue, {color: '#EF4444'}]}>
            {absentCount}
          </Typography>
          <Typography style={styles.statLabel}>Action</Typography>
        </View>

        <View style={styles.statDivider} />

        <View style={styles.statItem}>
          <Typography style={[styles.statValue, {color: '#F59E0B'}]}>
            {pendingLeavesCount}
          </Typography>
          <Typography style={styles.statLabel}>Pending</Typography>
        </View>

        <View style={styles.statDivider} />

        <View style={styles.statItem}>
          <Typography style={[styles.statValue, {color: colors.PRIMARY}]}>
            {approvedLeavesCount}
          </Typography>
          <Typography style={styles.statLabel}>Leave</Typography>
        </View>

        <View style={styles.statDivider} />

        <View style={styles.statItem}>
          <Typography style={[styles.statValue, {color: '#6B7280'}]}>
            {holidaysCount}
          </Typography>
          <Typography style={styles.statLabel}>Holiday</Typography>
        </View>
      </View>

      {/* Action Required Badge (absent_days > 0 and last 5 days of month or past month) */}
      {showActionRequired && (
        <View style={styles.actionRequiredContainer}>
          <View style={styles.actionRequiredBadge}>
            <Typography style={styles.actionBadgeLabel}>ACTION REQUIRED</Typography>
            <Typography style={styles.actionBadgeText}>
              You have {absentCount} {absentCount === 1 ? 'absent day' : 'absent days'} this month. Please submit regularisation or leave application.
            </Typography>
          </View>
        </View>
      )}

      {/* Expandable Calendar Area */}
      {isExpanded ? (
        <View style={styles.calendarWrapper}>
          <RNCalendar
            key={currentFormattedDate}
            current={currentFormattedDate}
            theme={theme}
            displayLoadingIndicator={isLoading}
            markingType="custom"
            markedDates={markedDates}
            firstDay={1}
            hideArrows={true}
            renderHeader={() => null}
          />

          {/* Legend */}
          <View style={styles.legendContainer}>
            <View style={styles.legendItem}>
              <View style={[styles.legendDot, {backgroundColor: '#10B981'}]} />
              <Typography style={styles.legendText}>Present</Typography>
            </View>
            <View style={styles.legendItem}>
              <View style={[styles.legendDot, {backgroundColor: '#EF4444'}]} />
              <Typography style={styles.legendText}>Action</Typography>
            </View>
            <View style={styles.legendItem}>
              <View style={[styles.legendDot, {backgroundColor: '#F59E0B'}]} />
              <Typography style={styles.legendText}>Pending</Typography>
            </View>
            <View style={styles.legendItem}>
              <View style={[styles.legendDot, {backgroundColor: colors.PRIMARY}]} />
              <Typography style={styles.legendText}>Leave</Typography>
            </View>
            <View style={styles.legendItem}>
              <View style={[styles.legendDot, {backgroundColor: '#6B7280'}]} />
              <Typography style={styles.legendText}>Holiday</Typography>
            </View>
            <View style={styles.legendItem}>
              <View style={styles.todayRingDot} />
              <Typography style={styles.legendText}>Today</Typography>
            </View>
          </View>

          {/* Hide Calendar Toggle */}
          <TouchableOpacity
            style={styles.toggleBtn}
            onPress={() => setIsExpanded(false)}>
            <Typography style={styles.toggleText}>Hide calendar</Typography>
            <ChevronUpIcon />
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.collapsedArea}>
          <TouchableOpacity
            style={styles.toggleBtnOutlined}
            onPress={() => setIsExpanded(true)}>
            <Typography style={styles.toggleText}>View calendar</Typography>
            <ChevronDownIcon />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.WHITE,
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#E8ECEF',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
    maxWidth: 480,
    width: '100%',
    alignSelf: 'center',
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  categoryLabel: {
    fontSize: 11,
    fontWeight: 'bold',
    color: colors.QUATERNARY_TEXT,
    letterSpacing: 0.5,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#101828',
  },
  monthNav: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E4E7EC',
    borderRadius: 8,
    paddingHorizontal: 4,
    paddingVertical: 2,
  },
  navBtn: {
    padding: 6,
  },
  navDivider: {
    width: 1,
    height: 16,
    backgroundColor: '#E4E7EC',
  },
  statsSummaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#F0F2F5',
    marginBottom: 16,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 20,
    lineHeight: 24,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  statLabel: {
    fontSize: 12,
    color: colors.QUATERNARY_TEXT,
    fontWeight: '500',
  },
  statDivider: {
    width: 1,
    height: 24,
    backgroundColor: '#F0F2F5',
  },
  actionRequiredContainer: {
    marginBottom: 12,
  },
  actionRequiredBadge: {
    backgroundColor: '#FEF2F2',
    borderWidth: 1,
    borderColor: '#FCA5A5',
    borderRadius: 10,
    padding: 10,
    gap: 2,
  },
  actionBadgeLabel: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#DC2626',
    letterSpacing: 0.5,
  },
  actionBadgeText: {
    fontSize: 12,
    color: '#991B1B',
    fontWeight: '500',
  },
  collapsedArea: {
    paddingTop: 4,
  },
  toggleBtnOutlined: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 6,
    borderWidth: 1.5,
    borderColor: colors.PRIMARY,
    borderRadius: 10,
    paddingVertical: 10,
  },
  toggleBtn: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 6,
    paddingVertical: 10,
    marginTop: 8,
  },
  toggleText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: colors.PRIMARY,
  },
  calendarWrapper: {
    marginTop: 8,
  },
  legendContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 12,
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderColor: '#F0F2F5',
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  legendDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  todayRingDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    borderWidth: 1.5,
    borderColor: colors.PRIMARY,
    backgroundColor: 'transparent',
  },
  legendText: {
    fontSize: 12,
    color: '#475467',
  },
});

export default Calendar;

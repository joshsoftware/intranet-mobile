import React from 'react';
import {StyleSheet, View, ScrollView, TouchableOpacity} from 'react-native';
import Typography from '../../components/typography';
import colors from '../../constant/colors';

const MONTHS = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

interface MonthSelectorBarProps {
  selectedMonth: string;
  onSelectMonth: (month: string) => void;
}

const MonthSelectorBar: React.FC<MonthSelectorBarProps> = ({
  selectedMonth,
  onSelectMonth,
}) => {
  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}>
        {MONTHS.map(month => {
          const isSelected = selectedMonth === month;

          return (
            <TouchableOpacity
              key={month}
              onPress={() => onSelectMonth(month)}
              style={[styles.monthPill, isSelected && styles.selectedPill]}>
              <Typography
                style={[
                  styles.monthText,
                  isSelected && styles.selectedMonthText,
                ]}>
                {month}
              </Typography>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 12,
  },
  scrollContent: {
    paddingHorizontal: 16,
    gap: 12,
  },
  monthPill: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  selectedPill: {
    backgroundColor: colors.WHITE,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  monthText: {
    fontSize: 14,
    color: '#667085',
    fontWeight: '500',
  },
  selectedMonthText: {
    color: colors.PRIMARY,
    fontWeight: 'bold',
  },
});

export default MonthSelectorBar;

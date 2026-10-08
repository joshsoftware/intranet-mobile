import React from 'react';
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Typography from '../../components/typography';
import colors from '../../constant/colors';
import {MONTHLY_SUMMARY_SCREEN} from '../../constant/screenNames';
import Svg, {Path} from 'react-native-svg';

const ChevronRightIcon = () => (
  <Svg width="16" height="16" viewBox="0 0 24 24" fill="none">
    <Path
      d="M9 18L15 12L9 6"
      stroke={colors.PRIMARY}
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

import {useFintechSemesterSummary} from './dashboard.hooks';

const DailyFintechCard = () => {
  const navigation = useNavigation<any>();
  const {semester, overallSummary} = useFintechSemesterSummary();

  const totalAssigned = overallSummary?.total_assigned ?? 0;
  const totalAnswered = overallSummary?.total_answered ?? 0;
  const correctCount = overallSummary?.correct_count ?? 0;
  const attemptRate = overallSummary?.attempt_rate != null ? Math.round(overallSummary.attempt_rate) : 0;
  const accuracyRate = overallSummary?.accuracy_rate != null ? Math.round(overallSummary.accuracy_rate) : 0;

  return (
    <View style={styles.card}>
      {/* Header Row */}
      <View style={styles.headerRow}>
        <View style={styles.headerLeft}>
          <Typography style={styles.categoryLabel}>DAILY FINTECH QUESTIONS</Typography>
          <Typography style={styles.cardTitle}>6-Month Summary</Typography>
        </View>
        <Typography style={styles.dateRange}>
          {semester?.label || ''}
        </Typography>
      </View>

      {/* Metrics Row (3 columns) */}
      <View style={styles.statsRow}>
        {/* Metric 1: Asked */}
        <View style={styles.statBox}>
          <Typography style={styles.statNumber}>{totalAssigned}</Typography>
          <Typography style={styles.statLabel}>Asked</Typography>
          <Typography style={styles.statSubText}>in 6 months</Typography>
        </View>

        {/* Metric 2: Answered */}
        <View style={styles.statBox}>
          <Typography style={styles.statNumber}>{totalAnswered}</Typography>
          <Typography style={styles.statLabel}>Answered</Typography>
          <Typography style={[styles.statSubText, styles.blueSubText]}>
            {attemptRate}% of asked
          </Typography>
        </View>

        {/* Metric 3: Correct */}
        <View style={styles.statBox}>
          <Typography style={styles.statNumber}>{correctCount}</Typography>
          <Typography style={styles.statLabel}>Correct</Typography>
          <Typography style={[styles.statSubText, styles.greenSubText]}>
            {accuracyRate}% of answered
          </Typography>
        </View>
      </View>

      {/* Divider */}
      <View style={styles.divider} />

      {/* Action Button */}
      <TouchableOpacity
        style={styles.actionButton}
        onPress={() => navigation.navigate(MONTHLY_SUMMARY_SCREEN)}>
        <Typography style={styles.actionButtonText}>View monthly summary</Typography>
        <ChevronRightIcon />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
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
    alignItems: 'flex-start',
    marginBottom: 16,
    gap: 8,
  },
  headerLeft: {
    flex: 1,
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
    marginTop: 2,
  },
  dateRange: {
    fontSize: 12,
    color: colors.QUATERNARY_TEXT,
    fontWeight: '500',
    marginTop: 2,
    textAlign: 'right',
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 8,
  },
  statBox: {
    flex: 1,
    backgroundColor: '#F4F7FF',
    borderRadius: 12,
    padding: 12,
    alignItems: 'flex-start',
  },
  statNumber: {
    fontSize: 22,
    lineHeight: 26,
    fontWeight: 'bold',
    color: '#101828',
    marginBottom: 2,
  },
  statLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: '#475467',
  },
  statSubText: {
    fontSize: 11,
    color: '#667085',
    marginTop: 2,
  },
  blueSubText: {
    color: colors.PRIMARY,
    fontWeight: 'bold',
  },
  greenSubText: {
    color: '#2E7D32',
    fontWeight: 'bold',
  },
  divider: {
    height: 1,
    backgroundColor: '#F0F2F5',
    marginVertical: 14,
  },
  actionButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 4,
  },
  actionButtonText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: colors.PRIMARY,
  },
});

export default DailyFintechCard;

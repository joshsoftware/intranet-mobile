import React from 'react';
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Typography from '../../components/typography';
import colors from '../../constant/colors';
import {COURSES_SCREEN} from '../../constant/screenNames';
import Svg, {Circle, Path} from 'react-native-svg';

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

const DonutProgress = ({percentage = 40}: {percentage: number}) => {
  const size = 96;
  const strokeWidth = 8;
  const center = size / 2;
  const radius = center - strokeWidth;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (circumference * percentage) / 100;

  return (
    <View style={styles.donutContainer}>
      <Svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        {/* Background Circle Track */}
        <Circle
          cx={center}
          cy={center}
          r={radius}
          stroke="#EAEAEA"
          strokeWidth={strokeWidth}
          fill="none"
        />
        {/* Progress Arc */}
        <Circle
          cx={center}
          cy={center}
          r={radius}
          stroke="#10B981"
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          fill="none"
          transform={`rotate(-90 ${center} ${center})`}
        />
      </Svg>
      <View style={styles.donutCenter}>
        <Typography style={styles.donutPercentage}>{percentage}%</Typography>
        <Typography style={styles.donutSubText}>2/5 done</Typography>
      </View>
    </View>
  );
};

import {useCourses} from '../../services/courses/courses.hooks';

const LearningCoursesCard = () => {
  const navigation = useNavigation<any>();
  const {completedCount, pendingCount, totalCount} = useCourses();
  const percentage = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  return (
    <View style={styles.card}>
      {/* Header Row */}
      <View style={styles.headerRow}>
        <View>
          <Typography style={styles.categoryLabel}>LEARNING</Typography>
          <Typography style={styles.cardTitle}>Courses</Typography>
        </View>
        <Typography style={styles.dateRange}>Active</Typography>
      </View>

      {/* Main Content Area */}
      <View style={styles.contentRow}>
        <DonutProgress percentage={percentage} />

        <View style={styles.infoContainer}>
          <Typography style={styles.summaryTitle}>
            {completedCount} of {totalCount} courses completed
          </Typography>

          <View style={styles.pendingRow}>
            <View style={styles.orangeDot} />
            <Typography style={styles.pendingText}>{pendingCount} pending</Typography>
          </View>
        </View>
      </View>

      {/* Divider */}
      <View style={styles.divider} />

      {/* Action Button */}
      <TouchableOpacity
        style={styles.actionButton}
        onPress={() => navigation.navigate(COURSES_SCREEN)}>
        <Typography style={styles.actionButtonText}>View all {totalCount} courses</Typography>
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
  dateRange: {
    fontSize: 12,
    color: colors.QUATERNARY_TEXT,
    fontWeight: '500',
    marginTop: 4,
  },
  contentRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  donutContainer: {
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  donutCenter: {
    position: 'absolute',
    alignItems: 'center',
  },
  donutPercentage: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#101828',
  },
  donutSubText: {
    fontSize: 10,
    color: colors.QUATERNARY_TEXT,
  },
  infoContainer: {
    flex: 1,
  },
  summaryTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#101828',
    marginBottom: 6,
  },
  pendingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  orangeDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#F59E0B',
    marginRight: 6,
  },
  pendingText: {
    fontSize: 13,
    color: '#475467',
    fontWeight: '500',
  },
  deadlineText: {
    fontSize: 12,
    color: colors.QUATERNARY_TEXT,
  },
  boldDeadline: {
    color: '#101828',
    fontWeight: '600',
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

export default LearningCoursesCard;

import React, {useState, useEffect, useRef} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  TouchableOpacity,
  ScrollView,
  Animated,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Typography from '../../components/typography';
import colors from '../../constant/colors';
import Svg, {Path, Circle} from 'react-native-svg';

const BackIcon = () => (
  <Svg width="20" height="20" viewBox="0 0 24 24" fill="none">
    <Path
      d="M15 18L9 12L15 6"
      stroke="#FFFFFF"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const ChevronDownIcon = () => (
  <Svg width="18" height="18" viewBox="0 0 24 24" fill="none">
    <Path
      d="M6 9L12 15L18 9"
      stroke="#6A6A6A"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const ChevronUpIcon = () => (
  <Svg width="18" height="18" viewBox="0 0 24 24" fill="none">
    <Path
      d="M18 15L12 9L6 15"
      stroke="#3069F6"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const DashedCircleIcon = () => (
  <Svg width="16" height="16" viewBox="0 0 24 24" fill="none">
    <Circle
      cx="12"
      cy="12"
      r="9"
      stroke="#C7C6C6"
      strokeWidth="2"
      strokeDasharray="4 4"
    />
  </Svg>
);

const BlinkingBlueDot = () => {
  const pulseAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 0.2,
          duration: 650,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 650,
          useNativeDriver: true,
        }),
      ]),
    );
    animation.start();
    return () => animation.stop();
  }, [pulseAnim]);

  return (
    <Animated.View
      style={[
        styles.blueDot,
        {
          opacity: pulseAnim,
        },
      ]}
    />
  );
};

const BlinkingNodeDot = () => {
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const opacityAnim = useRef(new Animated.Value(0.8)).current;

  useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.parallel([
          Animated.timing(scaleAnim, {
            toValue: 1.6,
            duration: 800,
            useNativeDriver: true,
          }),
          Animated.timing(opacityAnim, {
            toValue: 0.15,
            duration: 800,
            useNativeDriver: true,
          }),
        ]),
        Animated.parallel([
          Animated.timing(scaleAnim, {
            toValue: 1.0,
            duration: 800,
            useNativeDriver: true,
          }),
          Animated.timing(opacityAnim, {
            toValue: 0.8,
            duration: 800,
            useNativeDriver: true,
          }),
        ]),
      ]),
    );
    animation.start();
    return () => animation.stop();
  }, [scaleAnim, opacityAnim]);

  return (
    <View style={styles.activeNodeWrapper}>
      <Animated.View
        style={[
          styles.pulsingRing,
          {
            transform: [{scale: scaleAnim}],
            opacity: opacityAnim,
          },
        ]}
      />
      <View style={styles.activeSolidDotInner} />
    </View>
  );
};

interface MonthSummaryItem {
  id: string;
  monthYear: string;
  accuracy?: string;
  status?: 'completed' | 'in_progress' | 'upcoming';
  asked?: number;
  answered?: number;
  answeredPct?: string;
  correct?: number;
  correctPct?: string;
}

const MONTHS_DATA: MonthSummaryItem[] = [
  {
    id: '1',
    monthYear: 'Apr 2026',
    accuracy: '78%',
    status: 'completed',
    asked: 22,
    answered: 20,
    answeredPct: '90% of asked',
    correct: 17,
    correctPct: '78% of answered',
  },
  {
    id: '2',
    monthYear: 'May 2026',
    accuracy: '79%',
    status: 'completed',
    asked: 25,
    answered: 23,
    answeredPct: '92% of asked',
    correct: 18,
    correctPct: '79% of answered',
  },
  {
    id: '3',
    monthYear: 'Jun 2026',
    accuracy: '80%',
    status: 'completed',
    asked: 24,
    answered: 22,
    answeredPct: '91% of asked',
    correct: 18,
    correctPct: '80% of answered',
  },
  {
    id: '4',
    monthYear: 'Jul 2026',
    status: 'in_progress',
    asked: 23,
    answered: 21,
    answeredPct: '91% of asked',
    correct: 17,
    correctPct: '81% of answered',
  },
  {
    id: '5',
    monthYear: 'Aug 2026',
    status: 'upcoming',
  },
  {
    id: '6',
    monthYear: 'Sep 2026',
    status: 'upcoming',
  },
];

import {useFintechSemesterSummary} from '../HomeScreen/dashboard.hooks';

import Header from '../../components/header';

const MonthlySummaryScreen = () => {
  const navigation = useNavigation();
  const {semester, monthlySummary} = useFintechSemesterSummary();

  const currentMonthItem = monthlySummary.find(m => m.is_current);
  const defaultExpandedId = currentMonthItem
    ? `${currentMonthItem.year}-${currentMonthItem.month}`
    : '2026-7';

  const [expandedId, setExpandedId] = useState<string>(defaultExpandedId);

  const toggleExpand = (id: string, isFuture?: boolean) => {
    if (isFuture) return;
    setExpandedId(prev => (prev === id ? '' : id));
  };

  return (
    <View style={styles.container}>
      <Header type="secondary" title="Monthly Summary" />

      <ScrollView contentContainerStyle={styles.content}>
        {/* Title Header */}
        <View style={styles.titleRow}>
          <Typography style={styles.sectionCategory}>DAILY FINTECH QUESTIONS</Typography>
          <Typography style={styles.dateRange}>
            {semester?.label || ''}
          </Typography>
        </View>

        {/* Timeline & Accordions */}
        <View style={styles.timelineContainer}>
          {/* Vertical Connecting Line */}
          <View style={styles.verticalLine} />

          {monthlySummary.map(item => {
            const itemId = `${item.year}-${item.month}`;
            const isExpanded = expandedId === itemId;
            const isUpcoming = item.is_future;
            const isInProgress = item.is_current;
            const answeredPct =
              item.assigned_count > 0
                ? `${Math.round((item.answered_count / item.assigned_count) * 100)}% of asked`
                : '0% of asked';
            const correctPct =
              item.answered_count > 0
                ? `${Math.round((item.correct_count / item.answered_count) * 100)}% of answered`
                : '0% of answered';

            return (
              <View key={itemId} style={styles.timelineRow}>
                {/* Node Dot Icon */}
                <View style={styles.nodeContainer}>
                  {isUpcoming ? (
                    <DashedCircleIcon />
                  ) : isInProgress ? (
                    <BlinkingNodeDot />
                  ) : (
                    <View style={styles.solidDot} />
                  )}
                </View>

                {/* Month Card */}
                <TouchableOpacity
                  activeOpacity={isUpcoming ? 1 : 0.7}
                  onPress={() => toggleExpand(itemId, item.is_future)}
                  disabled={isUpcoming}
                  style={[
                    styles.monthCard,
                    isExpanded && styles.expandedCard,
                    isUpcoming && styles.upcomingCard,
                  ]}>
                  {/* Card Header Header */}
                  <View style={styles.cardHeader}>
                    <Typography style={styles.monthTitle}>{item.label}</Typography>

                    <View style={styles.headerRight}>
                      {isInProgress && (
                        <View style={styles.inProgressBadge}>
                          <BlinkingBlueDot />
                          <Typography style={styles.inProgressText}>In progress</Typography>
                        </View>
                      )}

                      {!isUpcoming && !isInProgress && item.accuracy_rate > 0 && !isExpanded && (
                        <View style={styles.accuracyBadge}>
                          <Typography style={styles.accuracyLabel}>accuracy </Typography>
                          <Typography style={styles.accuracyValue}>
                            {Math.round(item.accuracy_rate)}%
                          </Typography>
                        </View>
                      )}

                      {isUpcoming && (
                        <Typography style={styles.upcomingText}>Upcoming</Typography>
                      )}

                      {!isUpcoming && (isExpanded ? <ChevronUpIcon /> : <ChevronDownIcon />)}
                    </View>
                  </View>

                  {/* Expanded Content (Stats) */}
                  {isExpanded && !isUpcoming && (
                    <View style={styles.statsRow}>
                      {/* Stat 1: Asked */}
                      <View style={styles.statBox}>
                        <Typography style={styles.statNumber}>{item.assigned_count}</Typography>
                        <Typography style={styles.statLabel}>Asked</Typography>
                        <Typography style={styles.statSubText}>this month</Typography>
                      </View>

                      {/* Stat 2: Answered */}
                      <View style={styles.statBox}>
                        <Typography style={styles.statNumber}>{item.answered_count}</Typography>
                        <Typography style={styles.statLabel}>Answered</Typography>
                        <Typography style={[styles.statSubText, styles.blueSubText]}>
                          {answeredPct}
                        </Typography>
                      </View>

                      {/* Stat 3: Correct */}
                      <View style={styles.statBox}>
                        <Typography style={styles.statNumber}>{item.correct_count}</Typography>
                        <Typography style={styles.statLabel}>Correct</Typography>
                        <Typography style={[styles.statSubText, styles.greenSubText]}>
                          {correctPct}
                        </Typography>
                      </View>
                    </View>
                  )}
                </TouchableOpacity>
              </View>
            );
          })}
        </View>

        {/* Footer Hint */}
        <Typography style={styles.footerHint}>Tap a month to see its details</Typography>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FB',
  },
  header: {
    height: 56,
    backgroundColor: colors.PRIMARY,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 6,
    paddingRight: 16,
  },
  backIconWrapper: {
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.WHITE,
    marginLeft: 12,
  },
  content: {
    padding: 16,
    paddingBottom: 40,
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 4,
    gap: 8,
  },
  sectionCategory: {
    flex: 1,
    fontSize: 13,
    fontWeight: 'bold',
    color: colors.QUATERNARY_TEXT,
    letterSpacing: 0.5,
  },
  dateRange: {
    fontSize: 13,
    color: colors.QUATERNARY_TEXT,
    fontWeight: '600',
    textAlign: 'right',
  },
  timelineContainer: {
    position: 'relative',
    paddingLeft: 4,
  },
  verticalLine: {
    position: 'absolute',
    top: 24,
    left: 13,
    bottom: 40,
    width: 2,
    backgroundColor: '#DDE3EE',
  },
  timelineRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  nodeContainer: {
    width: 20,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  solidDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#8FAEFF',
  },
  activeNodeWrapper: {
    width: 16,
    height: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pulsingRing: {
    position: 'absolute',
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: colors.PRIMARY,
  },
  activeSolidDotInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: colors.PRIMARY,
  },
  monthCard: {
    flex: 1,
    backgroundColor: colors.WHITE,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E8ECEF',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 1,
  },
  expandedCard: {
    borderColor: colors.PRIMARY,
    borderWidth: 1.5,
    shadowOpacity: 0.08,
  },
  upcomingCard: {
    borderStyle: 'dashed',
    borderColor: '#D0D5DD',
    backgroundColor: '#FAFAFC',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  monthTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1D2939',
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  accuracyBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E8F5E9',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  accuracyLabel: {
    fontSize: 12,
    color: '#475467',
  },
  accuracyValue: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#2E7D32',
  },
  inProgressBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EBF3FF',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  blueDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.PRIMARY,
    marginRight: 6,
  },
  inProgressText: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.PRIMARY,
  },
  upcomingText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#98A2B3',
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 8,
    marginTop: 16,
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
  footerHint: {
    textAlign: 'center',
    fontSize: 13,
    color: '#98A2B3',
    marginTop: 20,
  },
});

export default MonthlySummaryScreen;

import React, {useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  TouchableOpacity,
} from 'react-native';

import Calendar from './Calendar';
import LearningCoursesCard from './LearningCoursesCard';
import DailyFintechCard from './DailyFintechCard';
import MonthSelectorBar from './MonthSelectorBar';
import TeamMembersLeaves from './teamMembersLeaves';
import TeamMembersBirthdays from './TeamMembersBirthdays';
import TalkItOutFab from './TalkItOut';
import Typography from '../../components/typography';
import colors from '../../constant/colors';

import {todaysDate} from '../../utils/date';
import {useTeamMembersLeaves, useTeamMembersBirthdays} from './dashboard.hooks';

const HomeScreen = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'people'>('overview');
  const [selectedMonth, setSelectedMonth] = useState<string>(
    todaysDate().toLocaleString('en-US', {month: 'short'}),
  );

  // Pre-fetch People & Events data simultaneously when My Overview page mounts
  useTeamMembersLeaves();
  useTeamMembersBirthdays();

  const monthFullNameMap: {[key: string]: string} = {
    Jan: 'January',
    Feb: 'February',
    Mar: 'March',
    Apr: 'April',
    May: 'May',
    Jun: 'June',
    Jul: 'July',
    Aug: 'August',
    Sep: 'September',
    Oct: 'October',
    Nov: 'November',
    Dec: 'December',
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.container}>
        {/* Top Segmented Tab Control */}
        <View style={styles.tabContainer}>
          <View style={styles.segmentedControl}>
            <TouchableOpacity
              style={[
                styles.segmentTab,
                activeTab === 'overview' && styles.activeSegmentTab,
              ]}
              onPress={() => setActiveTab('overview')}>
              <Typography
                style={[
                  styles.segmentText,
                  activeTab === 'overview' && styles.activeSegmentText,
                ]}>
                My Overview
              </Typography>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.segmentTab,
                activeTab === 'people' && styles.activeSegmentTab,
              ]}
              onPress={() => setActiveTab('people')}>
              <Typography
                style={[
                  styles.segmentText,
                  activeTab === 'people' && styles.activeSegmentText,
                ]}>
                People & Events
              </Typography>
            </TouchableOpacity>
          </View>
        </View>

        <ScrollView
          contentContainerStyle={styles.scrollViewContentContainer}
          showsVerticalScrollIndicator={false}>
          {activeTab === 'overview' ? (
            <>
              {/* Attendance Card & Collapsible Calendar */}
              <Calendar />

              {/* Learning / Courses Card */}
              <LearningCoursesCard />

              {/* Daily Fintech Questions Card */}
              <DailyFintechCard />
            </>
          ) : (
            <>
              {/* Leaves Card */}
              <TeamMembersLeaves
                selectedMonth={monthFullNameMap[selectedMonth] || selectedMonth}
              />

              {/* Birthdays Card */}
              <TeamMembersBirthdays
                selectedMonth={monthFullNameMap[selectedMonth] || selectedMonth}
              />
            </>
          )}
        </ScrollView>
      </SafeAreaView>
      <TalkItOutFab />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FB',
  },
  tabContainer: {
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 8,
    backgroundColor: '#F8F9FB',
  },
  segmentedControl: {
    flexDirection: 'row',
    backgroundColor: '#EBECEF',
    borderRadius: 14,
    padding: 4,
    maxWidth: 480,
    width: '100%',
    alignSelf: 'center',
  },
  segmentTab: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 10,
  },
  activeSegmentTab: {
    backgroundColor: colors.WHITE,
    borderWidth: 1.5,
    borderColor: colors.PRIMARY,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  segmentText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#667085',
  },
  activeSegmentText: {
    color: colors.PRIMARY,
    fontWeight: 'bold',
  },
  scrollViewContentContainer: {
    paddingHorizontal: 16,
    paddingBottom: 80,
  },
});

export default HomeScreen;

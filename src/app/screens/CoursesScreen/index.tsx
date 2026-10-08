import React, {useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Typography from '../../components/typography';
import colors from '../../constant/colors';
import Svg, {Path} from 'react-native-svg';

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

const ShieldIcon = () => (
  <Svg width="36" height="36" viewBox="0 0 24 24" fill="none">
    <Path
      d="M12 22C12 22 20 18 20 12V5L12 2L4 5V12C4 18 12 22 12 22Z"
      stroke="#3069F6"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M9 12L11 14L15 10"
      stroke="#3069F6"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const LockIcon = () => (
  <Svg width="36" height="36" viewBox="0 0 24 24" fill="none">
    <Path
      d="M19 11H5C3.89543 11 3 11.8954 3 13V20C3 21.1046 3.89543 22 5 22H19C20.1046 22 21 21.1046 21 20V13C21 11.8954 20.1046 11 19 11Z"
      stroke="#3069F6"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M7 11V7C7 5.67392 7.52678 4.40215 8.46447 3.46447C9.40215 2.52678 10.6739 2 12 2C13.3261 2 14.5979 2.52678 15.5355 3.46447C16.4732 4.40215 17 5.67392 17 7V11"
      stroke="#3069F6"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const CreditCardIcon = () => (
  <Svg width="36" height="36" viewBox="0 0 24 24" fill="none">
    <Path
      d="M21 4H3C1.89543 4 1 4.89543 1 6V18C1 19.1046 1.89543 20 3 20H21C22.1046 20 23 19.1046 23 18V6C23 4.89543 22.1046 4 21 4Z"
      stroke="#7B1FA2"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M1 10H23"
      stroke="#7B1FA2"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const CodeIcon = () => (
  <Svg width="36" height="36" viewBox="0 0 24 24" fill="none">
    <Path
      d="M16 18L22 12L16 6"
      stroke="#2E7D32"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M8 6L2 12L8 18"
      stroke="#2E7D32"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const UsersIcon = () => (
  <Svg width="36" height="36" viewBox="0 0 24 24" fill="none">
    <Path
      d="M17 21V19C17 17.9391 16.5786 16.9217 15.8284 16.1716C15.0783 15.4214 14.0609 15 13 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21"
      stroke="#B78103"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M9 11C11.2091 11 13 9.20914 13 7C13 4.79086 11.2091 3 9 3C6.79086 3 5 4.79086 5 7C5 9.20914 6.79086 11 9 11Z"
      stroke="#B78103"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const BookIcon = () => (
  <Svg width="36" height="36" viewBox="0 0 24 24" fill="none">
    <Path
      d="M4 19.5C4 18.837 4.26339 18.2011 4.73223 17.7322C5.20107 17.2634 5.83696 17 6.5 17H20"
      stroke="#3069F6"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M6.5 2H20V22H6.5C5.83696 22 5.20107 21.7366 4.73223 21.2678C4.26339 20.7989 4 20.163 4 19.5V4.5C4 3.83696 4.26339 3.20107 4.73223 2.73223C5.20107 2.26339 5.83696 2 6.5 2Z"
      stroke="#3069F6"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

interface CourseItem {
  id: string;
  title: string;
  badgeText: string;
  badgeBg: string;
  badgeTextColor: string;
  iconBg: string;
  icon: React.ReactNode;
  progress: number;
  progressColor: string;
  dueDate: string;
  uploadedDate: string;
  status: 'pending' | 'completed';
}

const COURSES_DATA: CourseItem[] = [
  {
    id: '1',
    title: 'Anti-Money Laundering...',
    badgeText: '3 days left',
    badgeBg: '#FFF3E0',
    badgeTextColor: '#E65100',
    iconBg: '#EBF3FF',
    icon: <ShieldIcon />,
    progress: 60,
    progressColor: colors.PRIMARY,
    dueDate: '25/09/2026',
    uploadedDate: '01/09/2026',
    status: 'pending',
  },
  {
    id: '2',
    title: 'Data Privacy & GDPR Basics',
    badgeText: '23 days left',
    badgeBg: '#EBF3FF',
    badgeTextColor: '#1976D2',
    iconBg: '#EBF3FF',
    icon: <LockIcon />,
    progress: 20,
    progressColor: colors.PRIMARY,
    dueDate: '15/10/2026',
    uploadedDate: '10/09/2026',
    status: 'pending',
  },
  {
    id: '3',
    title: 'Introduction to Digital Payments',
    badgeText: 'Not started',
    badgeBg: '#F3E5F5',
    badgeTextColor: '#7B1FA2',
    iconBg: '#F3E5F5',
    icon: <CreditCardIcon />,
    progress: 0,
    progressColor: colors.PRIMARY,
    dueDate: '31/10/2026',
    uploadedDate: '15/09/2026',
    status: 'pending',
  },
  {
    id: '4',
    title: 'Secure Coding Practices',
    badgeText: 'Completed',
    badgeBg: '#E8F5E9',
    badgeTextColor: '#2E7D32',
    iconBg: '#E8F5E9',
    icon: <CodeIcon />,
    progress: 100,
    progressColor: '#2E7D32',
    dueDate: '30/09/2026',
    uploadedDate: '20/08/2026',
    status: 'completed',
  },
  {
    id: '5',
    title: 'Workplace Ethics & Conduct',
    badgeText: 'Completed',
    badgeBg: '#FFF8E1',
    badgeTextColor: '#2E7D32',
    iconBg: '#FFF8E1',
    icon: <UsersIcon />,
    progress: 100,
    progressColor: '#2E7D32',
    dueDate: '31/08/2026',
    uploadedDate: '10/08/2026',
    status: 'completed',
  },
];

import {useCourses} from '../../services/courses/courses.hooks';

import Header from '../../components/header';

const CoursesScreen = () => {
  const navigation = useNavigation();
  const [activeFilter, setActiveFilter] = useState<'all' | 'pending' | 'completed'>('all');
  const {courses = [], pendingCount, completedCount, totalCount, isLoading} = useCourses();

  const filteredCourses = courses.filter((course: any) => {
    if (activeFilter === 'pending') return course.status === 'pending';
    if (activeFilter === 'completed') return course.status === 'completed';
    return true;
  });

  return (
    <View style={styles.container}>
      <Header type="secondary" title="Courses" />

      <View style={styles.content}>
        {/* Segmented Filter Pills */}
        <View style={styles.filterContainer}>
          <TouchableOpacity
            style={[styles.filterPill, activeFilter === 'all' && styles.activeFilterPill]}
            onPress={() => setActiveFilter('all')}>
            <Typography
              style={[
                styles.filterText,
                activeFilter === 'all' && styles.activeFilterText,
              ]}>
              All · {totalCount}
            </Typography>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.filterPill, activeFilter === 'pending' && styles.activeFilterPill]}
            onPress={() => setActiveFilter('pending')}>
            <Typography
              style={[
                styles.filterText,
                activeFilter === 'pending' && styles.activeFilterText,
              ]}>
              Pending · {pendingCount}
            </Typography>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.filterPill, activeFilter === 'completed' && styles.activeFilterPill]}
            onPress={() => setActiveFilter('completed')}>
            <Typography
              style={[
                styles.filterText,
                activeFilter === 'completed' && styles.activeFilterText,
              ]}>
              Completed · {completedCount}
            </Typography>
          </TouchableOpacity>
        </View>

        {/* 2-Column Course Cards */}
        <ScrollView contentContainerStyle={styles.grid} showsVerticalScrollIndicator={false}>
          {filteredCourses.length === 0 ? (
            <Typography style={{paddingVertical: 32, textAlign: 'center', color: colors.QUATERNARY_TEXT, width: '100%'}}>
              {isLoading ? 'Loading courses...' : 'No courses found'}
            </Typography>
          ) : (
            filteredCourses.map((course: any) => {
              const badgeText = course.badge_text || course.badgeText || (course.status === 'completed' ? 'Completed' : 'Pending');
              const isCompleted = course.status === 'completed';
              const badgeBg = course.badgeBg || (isCompleted ? '#E8F5E9' : '#FFF3E0');
              const badgeTextColor = course.badgeTextColor || (isCompleted ? '#2E7D32' : '#E65100');
              const progressColor = course.progressColor || (isCompleted ? '#2E7D32' : colors.PRIMARY);
              const dueDate = course.due_date || course.dueDate || '';
              const uploadedDate = course.uploaded_date || course.uploadedDate || '';

              return (
                <View key={course.id} style={styles.card}>
                  {/* Top Badge */}
                  <View style={[styles.badge, {backgroundColor: badgeBg}]}>
                    <Typography style={[styles.badgeText, {color: badgeTextColor}]}>
                      {badgeText}
                    </Typography>
                  </View>

                  {/* Icon Container */}
                  <View style={[styles.iconContainer, {backgroundColor: '#EBF3FF'}]}>
                    <BookIcon />
                  </View>

                  {/* Course Title */}
                  <Typography style={styles.courseTitle} numberOfLines={2}>
                    {course.title}
                  </Typography>

                  {/* Progress Line & Label */}
                  <View style={styles.progressRow}>
                    <View style={styles.progressTrack}>
                      <View
                        style={[
                          styles.progressFill,
                          {
                            width: `${course.progress || 0}%`,
                            backgroundColor: progressColor,
                          },
                        ]}
                      />
                    </View>
                    <Typography style={styles.progressText}>
                      {course.progress || 0}%
                    </Typography>
                  </View>

                  {/* Dates */}
                  <View style={styles.dateContainer}>
                    {Boolean(dueDate) && (
                      <Typography style={styles.dateText}>
                        Due {dueDate}
                      </Typography>
                    )}
                    {Boolean(uploadedDate) && (
                      <Typography style={styles.dateText}>
                        Uploaded {uploadedDate}
                      </Typography>
                    )}
                  </View>
                </View>
              );
            })
          )}
        </ScrollView>
      </View>
    </View>
  );
};

const windowWidth = Dimensions.get('window').width;
const cardWidth = (windowWidth - 44) / 2;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F8FA',
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
    flex: 1,
    padding: 16,
  },
  filterContainer: {
    flexDirection: 'row',
    backgroundColor: '#EBECEF',
    borderRadius: 12,
    padding: 4,
    marginBottom: 16,
  },
  filterPill: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 10,
  },
  activeFilterPill: {
    backgroundColor: colors.WHITE,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  filterText: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.QUATERNARY_TEXT,
  },
  activeFilterText: {
    color: colors.PRIMARY,
    fontWeight: 'bold',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 12,
    paddingBottom: 24,
  },
  card: {
    width: cardWidth,
    backgroundColor: colors.WHITE,
    borderRadius: 16,
    padding: 14,
    borderWidth: 1,
    borderColor: '#E8ECEF',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 1,
  },
  badge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    marginBottom: 12,
  },
  badgeText: {
    fontSize: 11,
    fontWeight: 'bold',
  },
  iconContainer: {
    width: 60,
    height: 60,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: 14,
  },
  courseTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1A1A1A',
    marginBottom: 12,
    height: 40,
  },
  progressRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  progressTrack: {
    flex: 1,
    height: 4,
    backgroundColor: '#EAEAEA',
    borderRadius: 2,
    marginRight: 8,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 2,
  },
  progressText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#333',
  },
  dateContainer: {
    gap: 2,
  },
  dateText: {
    fontSize: 11,
    color: colors.SECONDARY_TEXT,
  },
});

export default CoursesScreen;

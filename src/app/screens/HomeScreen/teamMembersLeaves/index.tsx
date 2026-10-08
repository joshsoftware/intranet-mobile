import React, {useState} from 'react';
import {StyleSheet, View, TouchableOpacity, Image} from 'react-native';
import Animated, {FadeInDown} from 'react-native-reanimated';
import Typography from '../../../components/typography';
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

import {useTeamMembersLeaves} from '../dashboard.hooks';

const AVATAR_COLORS = ['#E8F5E9', '#EBF3FF', '#FFF3E0', '#F3E5F5', '#FFF8E1'];

const getFullAvatarUrl = (url?: string): string | null => {
  if (!url || typeof url !== 'string') return null;
  const trimmed = url.trim();
  if (!trimmed) return null;
  if (trimmed.startsWith('http://') || trimmed.startsWith('https://')) {
    return trimmed;
  }
  if (trimmed.startsWith('/')) {
    return `https://intranet.joshsoftware.com${trimmed}`;
  }
  return `https://intranet.joshsoftware.com/${trimmed}`;
};

const getInitials = (name: string) => {
  if (!name) return '??';
  const parts = name.trim().split(' ');
  if (parts.length >= 2) {
    return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
  }
  return parts[0].substring(0, 2).toUpperCase();
};

interface TeamMembersLeavesProps {
  selectedMonth?: string;
}

const TeamMembersLeaves: React.FC<TeamMembersLeavesProps> = ({selectedMonth = 'September'}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [failedImages, setFailedImages] = useState<Record<string, boolean>>({});
  const {data: leaveList = [], isLoading} = useTeamMembersLeaves();
  const AnimatedView = Animated.View as any;

  const displayLeaves = isExpanded ? leaveList : leaveList.slice(0, 3);

  const handleImageError = (id: string) => {
    setFailedImages(prev => ({...prev, [id]: true}));
  };

  return (
    <AnimatedView entering={FadeInDown} style={styles.card}>
      {/* Header Row */}
      <View style={styles.headerRow}>
        <View>
          <Typography style={styles.categoryLabel}>LEAVES</Typography>
          <Typography style={styles.cardTitle}>In {selectedMonth}</Typography>
        </View>
        <Typography style={styles.countBadge}>{leaveList.length} leaves</Typography>
      </View>

      {/* Leave List Items */}
      <View style={styles.listContainer}>
        {leaveList.length === 0 ? (
          <Typography style={{paddingVertical: 12, color: colors.QUATERNARY_TEXT, textAlign: 'center'}}>
            {isLoading ? 'Loading leaves...' : 'No upcoming leaves for team members'}
          </Typography>
        ) : (
          displayLeaves.map((item: any, idx: number) => {
            const name = item.name || item.user_name || item.employee_name || item.user?.name || 'Team Member';
            const fromDate = item.from || item.start_at || item.start_date || '';
            const toDate = item.to || item.end_at || item.end_date || fromDate;
            const leaveType = item.leave_type || item.type || 'Leave';
            const numDays = item.days || item.total_days || item.no_of_days || item.duration || 0;
            const rawAvatar = item.avatar_url || item.avatar || item.image || item.profile_image || item.user?.avatar_url || item.user?.avatar || item.employee?.avatar_url;
            const avatarUrl = getFullAvatarUrl(rawAvatar);
            const designation = item.designation;

            const itemId = String(item.id || item.user_id || `${name}-${idx}`);
            const hasImageError = failedImages[itemId];
            const showImage = Boolean(avatarUrl) && !hasImageError;

            const initials = getInitials(name);
            const avatarBg = AVATAR_COLORS[idx % AVATAR_COLORS.length];
            const dateRange = item.date_range || (fromDate === toDate || !toDate ? fromDate : `${fromDate} – ${toDate}`);
            const duration = numDays ? `${numDays} ${numDays === 1 ? 'day' : 'days'}` : '';

            return (
              <View key={itemId} style={[styles.itemRow, idx < displayLeaves.length - 1 && styles.itemBorder]}>
                {/* Initials Avatar or Image */}
                {showImage ? (
                  <Image
                    source={{uri: avatarUrl!}}
                    style={styles.avatarImage}
                    onError={() => handleImageError(itemId)}
                  />
                ) : (
                  <View style={[styles.avatar, {backgroundColor: avatarBg}]}>
                    <Typography style={styles.avatarText}>{initials}</Typography>
                  </View>
                )}

                {/* Member Details */}
                <View style={styles.memberInfo}>
                  <Typography style={styles.memberName}>{name}</Typography>
                  <Typography style={styles.memberDate}>
                    {dateRange} {duration ? `· ${duration}` : ''}{designation ? ` · ${designation}` : ''}
                  </Typography>
                </View>

                {/* Status Tag */}
                <View style={[styles.statusTag, styles.upcomingTag]}>
                  <Typography style={[styles.statusText, styles.upcomingText]}>
                    {leaveType}
                  </Typography>
                </View>
              </View>
            );
          })
        )}
      </View>

      {/* Toggle View All Button */}
      {leaveList.length > 3 ? (
        <TouchableOpacity style={styles.viewAllBtn} onPress={() => setIsExpanded(!isExpanded)}>
          <Typography style={styles.viewAllText}>
            {isExpanded ? 'Show less' : `View all ${leaveList.length} leaves`}
          </Typography>
          {isExpanded ? <ChevronUpIcon /> : <ChevronDownIcon />}
        </TouchableOpacity>
      ) : null}
    </AnimatedView>
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
  countBadge: {
    fontSize: 13,
    color: colors.QUATERNARY_TEXT,
    fontWeight: '600',
    marginTop: 4,
  },
  listContainer: {
    marginBottom: 8,
  },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
  },
  itemBorder: {
    borderBottomWidth: 1,
    borderColor: '#F0F2F5',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  avatarImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  avatarText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: colors.PRIMARY,
  },
  memberInfo: {
    flex: 1,
  },
  memberName: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#101828',
    marginBottom: 2,
  },
  memberDate: {
    fontSize: 12,
    color: '#667085',
  },
  statusTag: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  onLeaveTag: {
    backgroundColor: '#FEE2E2',
  },
  upcomingTag: {
    backgroundColor: '#F3F4F6',
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
  },
  onLeaveText: {
    color: '#DC2626',
  },
  upcomingText: {
    color: '#374151',
  },
  viewAllBtn: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 4,
    paddingTop: 12,
    borderTopWidth: 1,
    borderColor: '#F0F2F5',
  },
  viewAllText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: colors.PRIMARY,
  },
});

export default TeamMembersLeaves;

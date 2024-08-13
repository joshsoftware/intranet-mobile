import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';

import {
  WhiteStar,
  PlatinumIcon,
  GoldIcon,
  SilverIcon,
  BronzeIcon,
} from '../constants/icons';
import {formatNumber} from '../utils';
import InitialsAvatar from './InitialAvatar';
import colors from '../constants/colors';
import ImageWithFallback from './imageWithFallback/ImageWithFallback';

const userBadgeProperty = {
  platinum: {
    border: {borderColor: colors.PLATINUM},
    backgroundColor: {backgroundColor: colors.PLATINUM},
    icon: PlatinumIcon,
  },
  gold: {
    border: {borderColor: colors.GOLD},
    backgroundColor: {backgroundColor: colors.GOLD},
    icon: GoldIcon,
  },
  silver: {
    border: {borderColor: colors.SILVER},
    backgroundColor: {backgroundColor: colors.SILVER},
    icon: SilverIcon,
  },
  bronze: {
    border: {borderColor: colors.BRONZE},
    backgroundColor: {backgroundColor: colors.BRONZE},
    icon: BronzeIcon,
  },
  basicUser: {
    border: {borderColor: colors.PRIMARY},
    backgroundColor: {backgroundColor: colors.PRIMARY},
    icon: '',
  },
};

interface LeaderBoardCardProps {
  userDetail: {
    id: number;
    first_name: string;
    last_name: string;
    profile_image_url: string;
    badge_name: string;
    appreciation_points: number;
  };
}
type BadgeType = 'platinum' | 'gold' | 'silver' | 'bronze' | 'basicUser';

const LeaderBoardCard: React.FC<LeaderBoardCardProps> = ({userDetail}) => {
  const userName = `${userDetail.first_name || ''}  ${
    userDetail.last_name || ''
  }`;
  const badge = userDetail?.badge_name?.toLowerCase() || 'basicUser';
  const avatarStyle = userBadgeProperty[badge as BadgeType];
  const BadgeIcon = avatarStyle.icon;

  return (
    <View style={styles.container}>
      {userDetail?.profile_image_url ? (
        <ImageWithFallback
          imageUrl={userDetail.profile_image_url}
          initials={
            <InitialsAvatar
              name={userName}
              size={60}
              borderColor={avatarStyle.border.borderColor}
            />
          }
          imageStyle={[styles.profileImage, avatarStyle.border]}
        />
      ) : (
        <InitialsAvatar
          name={userName}
          size={60}
          borderColor={avatarStyle.border.borderColor}
        />
      )}
      {BadgeIcon !== '' ? (
        <View style={[styles.badgeIconWrapper]}>
          <BadgeIcon width={21} height={21} />
        </View>
      ) : null}
      {userDetail?.appreciation_points > 0 ? (
        <View style={[styles.starContainer, avatarStyle.backgroundColor]}>
          <WhiteStar color={colors.SECONDARY} width={11} height={11} />
          <Text style={styles.leadText}>
            {formatNumber(userDetail.appreciation_points)}
          </Text>
        </View>
      ) : null}
      <View style={[styles.nameContainer]}>
        <Text style={styles.useName} ellipsizeMode="tail" numberOfLines={2}>
          {userName}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginHorizontal: 10,
    padding: 5,
    marginTop: 10,
  },
  nameContainer: {
    marginTop: 10,
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: 'white',
  },
  starContainer: {
    position: 'absolute',
    bottom: 59,
    borderRadius: 12,
    paddingHorizontal: 5,
    paddingVertical: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  starIcon: {
    width: 12,
    height: 12,
    marginRight: 3,
  },
  starText: {
    color: colors.WHITE,
    fontWeight: 'bold',
    fontSize: 12,
  },
  useName: {
    width: 60,
    fontSize: 12,
    textAlign: 'center',
    lineHeight: 18,
    color: colors.CHARCOAL,
  },
  leadText: {
    fontSize: 11,
    marginTop: 1,
    marginLeft: 2,
    color: colors.WHITE,
  },
  badgeIconWrapper: {
    position: 'absolute',
    top: 1,
    left: 42,
  },
});

export default LeaderBoardCard;

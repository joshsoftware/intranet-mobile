import React from 'react';
import {BadgeMetaData} from './types';
import {
  PlatinumIcon,
  GoldIcon,
  SilverIcon,
  BronzeIcon,
} from '../../constants/icons';

export const badgeData: BadgeMetaData = {
  platinum: {
    member: 'Platinum Member',
    icon: <PlatinumIcon width={60} height={60} />,
  },
  gold: {
    member: 'Gold Member',
    icon: <GoldIcon width={60} height={60} />,
  },
  silver: {
    member: 'Silver Member',
    icon: <SilverIcon width={60} height={60} />,
  },
  bronze: {
    member: 'Bronze Member',
    icon: <BronzeIcon width={60} height={60} />,
  },
  basicuser: {
    member: 'Basic User',
    icon: null,
  },
};

export const paginationData = {
  page: 1,
  page_size: 500,
  self: true,
};

export const initialProfileDetails = {
  first_name: '',
  last_name: '',
  profile_image_url: '',
  designation: '',
  reward_quota_balance: 0,
  total_reward_quota: 0,
  grade_id: 0,
  total_points: 0,
  refil_date: 0,
  badge: '',
};

import React, {memo} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import colors from '../constants/colors';

// Function to get initials from name
const getInitials = (name: string) => {
  const initials = name
    .split(' ')
    .map(word => word[0])
    .join('');
  return initials.toUpperCase();
};

interface InitialsAvatarProps {
  name: string;
  size: number;
  borderColor?: string;
}
const InitialsAvatar = ({
  name,
  size = 50,
  borderColor,
}: InitialsAvatarProps) => {
  const initials = getInitials(name);
  const customStyle = {
    width: size,
    height: size,
    borderRadius: size / 2,
    borderColor: borderColor || colors.PRIMARY,
    borderWidth: 1,
  };
  return (
    <View style={[styles.avatar, customStyle]}>
      <Text style={[styles.initials, {fontSize: size / 2.5}]}>{initials}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  avatar: {
    backgroundColor: colors.LIGHT_PERIWINKLE,
    justifyContent: 'center',
    alignItems: 'center',
  },
  initials: {
    color: colors.WHITE,
    fontWeight: 'bold',
  },
});

export default memo(InitialsAvatar);

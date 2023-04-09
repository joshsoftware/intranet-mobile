import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import {JoshLogo, Profile} from '../constant/icons';
import colors from '../constant/colors';
import {MainScreenNavigationProp} from '../navigation/types';
import {USER_PROFILE_SCREEN} from '../constant/screenNames';

interface Props {
  onMainScreen: boolean;
}

const Header = (props: Props) => {
  const navigation = useNavigation<MainScreenNavigationProp>();

  const navigateToProfile = () => {
    navigation.navigate(USER_PROFILE_SCREEN);
  };

  const goBack = () => {
    navigation.goBack();
  };

  if (props.onMainScreen) {
    return (
      <View style={styles.container}>
        <JoshLogo height={18} width={85} fill={colors.WHITE} />
        <TouchableOpacity activeOpacity={0.5} onPress={navigateToProfile}>
          <Profile height={18} width={18} fill={colors.WHITE} />
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity
        activeOpacity={0.5}
        style={styles.backButton}
        onPress={goBack}>
        <Text style={styles.backArrow}>{'<'}</Text>
        <Text style={styles.backText}>Profile</Text>
      </TouchableOpacity>
      <TouchableOpacity activeOpacity={0.5} onPress={navigateToProfile}>
        <Profile height={18} width={18} fill={colors.WHITE} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 26,
    paddingBottom: 18,
    paddingLeft: 16,
    paddingRight: 23,

    backgroundColor: colors.PRIMARY,
  },
  backButton: {
    flexDirection: 'row',
  },
  backText: {
    color: colors.WHITE,
  },
  backArrow: {
    marginRight: 17,
    color: colors.WHITE,
  },
});

export default Header;

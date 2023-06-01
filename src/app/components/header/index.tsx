import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import {Arrow, JoshLogo, Profile} from '../../constant/icons';
import colors from '../../constant/colors';
import {USER_PROFILE_SCREEN} from '../../constant/screenNames';
import {MainScreenNavigationProp} from '../../navigation/types';

interface Props {
  type: 'primary' | 'secondary';
  title?: string;
  isRightButtonVisible?: boolean;
}

const Header = ({type, title, isRightButtonVisible}: Props) => {
  const navigation = useNavigation<MainScreenNavigationProp>();

  const goToProfileScreen = () => {
    navigation.navigate(USER_PROFILE_SCREEN);
  };

  const goBack = () => {
    navigation.goBack();
  };

  switch (type) {
    case 'primary':
      return (
        <View style={styles.container}>
          <JoshLogo height={18} width={85} fill={colors.WHITE} />
          {false && (
            <TouchableOpacity activeOpacity={0.5} onPress={goToProfileScreen}>
              <Profile height={18} width={18} fill={colors.WHITE} />
            </TouchableOpacity>
          )}
        </View>
      );
    case 'secondary':
      return (
        <View style={styles.container}>
          <View style={styles.backButton}>
            <TouchableOpacity activeOpacity={0.5} onPress={goBack}>
              <Arrow
                height={20}
                width={20}
                style={styles.arrow}
                fill={colors.WHITE}
              />
            </TouchableOpacity>
            <Text style={styles.backText}>{title}</Text>
          </View>
          {isRightButtonVisible ? (
            <TouchableOpacity activeOpacity={0.5} onPress={goToProfileScreen}>
              <Profile height={18} width={18} fill={colors.WHITE} />
            </TouchableOpacity>
          ) : (
            <></>
          )}
        </View>
      );
    default:
      return <></>;
  }
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 10,
    paddingBottom: 13,
    paddingLeft: 16,
    paddingRight: 23,
    backgroundColor: colors.PRIMARY,
    height: 52,
  },
  backButton: {
    flexDirection: 'row',
  },
  backText: {
    color: colors.WHITE,
    fontSize: 15,
    marginStart: 20,
  },
  arrow: {
    marginTop: 2,
    transform: [{rotate: '180 deg'}],
  },
});

export default Header;

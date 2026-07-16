import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {DrawerActions, useNavigation} from '@react-navigation/native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {Arrow, DrawerMenuIcon, JoshLogo} from '../../constant/icons';
import colors from '../../constant/colors';
import {MainScreenNavigationProp} from '../../navigation/types';

interface Props {
  type: 'primary' | 'secondary';
  title?: string;
  showDrawerButton?: boolean;
}

const Header = ({type, title, showDrawerButton = true}: Props) => {
  const navigation = useNavigation<MainScreenNavigationProp>();
  const inset = useSafeAreaInsets();

  const goBack = () => {
    navigation.goBack();
  };

  const handleMenuButtonPress = () => {
    navigation.dispatch(DrawerActions.toggleDrawer());
  };

  switch (type) {
    case 'primary':
      return (
        <View
          style={[{paddingTop: inset.top, backgroundColor: colors.PRIMARY}]}>
          <View style={styles.container}>
            <View style={styles.logoContainer}>
              <JoshLogo height={18} width={85} fill={colors.WHITE} />
            </View>
            {showDrawerButton && (
              <TouchableOpacity
                style={styles.menuIconContainer}
                onPress={handleMenuButtonPress}
                activeOpacity={0.7}>
                <DrawerMenuIcon width={26} height={16} fill={colors.WHITE} />
              </TouchableOpacity>
            )}
          </View>
        </View>
      );
    case 'secondary':
      return (
        <View
          style={[{paddingTop: inset.top, backgroundColor: colors.PRIMARY}]}>
          <View style={styles.container}>
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
        </View>
      );
    default:
      return <></>;
  }
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 10,
    paddingBottom: 13,
    paddingLeft: 16,
    paddingRight: 23,
    backgroundColor: colors.PRIMARY,
    height: 52,
  },
  logoContainer: {
    position: 'absolute',
    left: '50%',
    transform: [{translateX: -42.5}],
  },
  menuIconContainer: {
    position: 'absolute',
    right: 15,
    height: 40,
    width: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backText: {
    color: colors.WHITE,
    fontSize: 16,
    marginStart: 20,
    fontWeight: 'bold',
  },
  arrow: {
    marginTop: 5,
    transform: [{rotate: '180deg'}],
  },
});

export default Header;

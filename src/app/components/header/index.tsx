import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {Arrow, JoshLogo} from '../../constant/icons';
import colors from '../../constant/colors';
import {MainScreenNavigationProp} from '../../navigation/types';

interface Props {
  type: 'primary' | 'secondary';
  title?: string;
}

const Header = ({type, title}: Props) => {
  const navigation = useNavigation<MainScreenNavigationProp>();
  const inset = useSafeAreaInsets();

  const goBack = () => {
    navigation.goBack();
  };

  switch (type) {
    case 'primary':
      return (
        <View
          style={[{paddingTop: inset.top, backgroundColor: colors.PRIMARY}]}>
          <View style={[styles.container, styles.primaryHeader]}>
            <JoshLogo height={18} width={85} fill={colors.WHITE} />
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
    paddingTop: 10,
    paddingBottom: 13,
    paddingLeft: 16,
    paddingRight: 23,
    backgroundColor: colors.PRIMARY,
    height: 52,
  },
  primaryHeader: {
    justifyContent: 'center',
  },
  backText: {
    color: colors.WHITE,
    fontSize: 16,
    marginStart: 20,
    fontWeight: 'bold',
  },
  arrow: {
    marginTop: 5,
    transform: [{rotate: '180 deg'}],
  },
});

export default Header;

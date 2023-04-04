import React, {memo, PropsWithChildren, useMemo} from 'react';
import {StyleSheet, ViewStyle, Platform, TouchableOpacity} from 'react-native';

import colors from '../../constant/colors';

type Props = PropsWithChildren & {
  style?: ViewStyle;
  onPress: () => void;
};

const Card = ({children, style, onPress}: Props) => {
  const plateformStyle = useMemo(
    () =>
      Platform.OS === 'ios'
        ? {...styles.background, ...styles.iosShadow}
        : styles.background,
    [],
  );

  return (
    <TouchableOpacity style={[plateformStyle, style]} onPress={onPress}>
      {children}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  background: {
    backgroundColor: colors.BACKGROUND,
    width: '100%',
    marginVertical: 5,
    elevation: 3,
    borderRadius: 6,
  },
  iosShadow: {
    shadowColor: colors.SHADOW,
    shadowOpacity: 6,
    shadowOffset: {height: 3, width: 0},
  },
});

export default memo(Card);

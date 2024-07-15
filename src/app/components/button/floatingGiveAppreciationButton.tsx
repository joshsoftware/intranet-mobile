import React, {memo} from 'react';
import {StyleSheet, Text, TouchableOpacity, ViewStyle} from 'react-native';

import colors from '../../constant/colors';

type Props = {
  style?: ViewStyle;
  onPress: () => void;
};

const FloatingGiveAppreciationButton = ({style, onPress}: Props) => {
  return (
    <TouchableOpacity style={[style, styles.floating]} onPress={onPress}>
      <Text style={styles.buttonText}>Give Appreciation</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  floating: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    height: 50,
    left: 10,
    right: 10,
    bottom: 10,
    borderRadius: 10,
    backgroundColor: colors.PRIMARY,
  },
  buttonText: {
    color: colors.WHITE,
    fontSize: 20,
    fontWeight: 'normal',
  },
});

export default memo(FloatingGiveAppreciationButton);

import React, {memo} from 'react';
import {StyleSheet, TouchableOpacity, ViewStyle} from 'react-native';

import {Floating} from '../../constant/icons';

type Props = {
  style?: ViewStyle;
  onPress: () => void;
};

const FloatingActionButton = ({style, onPress}: Props) => {
  return (
    <TouchableOpacity style={[style, styles.floating]} onPress={onPress}>
      <Floating />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  floating: {
    position: 'absolute',
    right: 0,
    bottom: 0,
  },
});

export default memo(FloatingActionButton);

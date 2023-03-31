import React, {memo} from 'react';
import {StyleSheet, TouchableOpacity, ViewStyle} from 'react-native';

import {Floating} from '../../constant/icons';
import margin from '../../constant/sizes';

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
    right: margin.FLOATING_MARGIN_RIGHT,
    bottom: margin.FLOATING_MARGIN_BOTTOM,
  },
});

export default memo(FloatingActionButton);

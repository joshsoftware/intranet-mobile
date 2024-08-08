import React, {memo} from 'react';
import {StyleSheet, Text, TouchableOpacity, ViewStyle} from 'react-native';
import colors from '../../constants/colors';

type Props = {
  style?: ViewStyle;
  onPress: () => void;
  title: string;
};

const FloatingButton = ({style, onPress, title}: Props) => {
  return (
    <TouchableOpacity style={[style, styles.floating]} onPress={onPress}>
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  floating: {
    justifyContent: 'center',
    padding: 10,
    alignItems: 'center',
    borderRadius: 12,
    position: 'absolute',
    left: 10,
    right: 10,
    bottom: 10,
    backgroundColor: colors.PRIMARY,
  },
  buttonText: {
    color: colors.WHITE,
    fontSize: 18,
    fontWeight: 'normal',
  },
});

export default memo(FloatingButton);

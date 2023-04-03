import React, {memo, PropsWithChildren} from 'react';
import {StyleSheet, View, ViewStyle} from 'react-native';

import ReactNativeModal from 'react-native-modal';

type Props = PropsWithChildren & {
  style?: ViewStyle | undefined;
  contentStyle?: ViewStyle | undefined;
  isVisible?: boolean;
};

const BottomModal = ({children, style, contentStyle, isVisible}: Props) => (
  <ReactNativeModal
    isVisible={isVisible}
    style={[styles.main, style]}
    animationIn="slideInUp"
    animationOut="slideOutDown">
    <View style={[styles.contentStyle, contentStyle]}>{children}</View>
  </ReactNativeModal>
);

const styles = StyleSheet.create({
  main: {
    margin: 0,
    justifyContent: 'flex-end',
  },
  contentStyle: {
    alignItems: 'center',
    minHeight: '50%',
    justifyContent: 'space-around',
  },
});

export default memo(BottomModal);

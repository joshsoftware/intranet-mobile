import React, {memo, PropsWithChildren} from 'react';
import {StyleSheet, View, ViewStyle} from 'react-native';

import ReactNativeModal, {ModalProps} from 'react-native-modal';

type Props = (PropsWithChildren | ModalProps) & {
  style?: ViewStyle;
  contentStyle?: ViewStyle;
};

const BottomModal = ({children, style, contentStyle, ...props}: Props) => (
  <ReactNativeModal style={[styles.main, style]} {...props}>
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

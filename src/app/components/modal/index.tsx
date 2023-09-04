import React, {memo, PropsWithChildren} from 'react';
import {StyleSheet, View, ViewStyle} from 'react-native';
import ReactNativeModal, {ModalProps} from 'react-native-modal';

import Toast from '../toast';

import colors from '../../constant/colors';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

type Props = (PropsWithChildren | ModalProps) & {
  style?: ViewStyle;
  contentStyle?: ViewStyle;
};

const BottomModal = ({children, style, contentStyle, ...props}: Props) => {
  const inset = useSafeAreaInsets();

  return (
    <ReactNativeModal
      style={[styles.main, style, {paddingTop: inset.top}]}
      {...props}>
      <View
        style={[
          styles.contentStyle,
          contentStyle,
          {paddingBottom: inset.bottom},
        ]}>
        {children}
      </View>
      <Toast />
    </ReactNativeModal>
  );
};

const styles = StyleSheet.create({
  main: {
    margin: 0,
    justifyContent: 'flex-end',
  },
  contentStyle: {
    alignItems: 'center',
    backgroundColor: colors.WHITE,
    justifyContent: 'space-around',
  },
});

export default memo(BottomModal);

import React, {ReactNode, useMemo} from 'react';
import {Platform, StyleSheet, View} from 'react-native';
import ReactNativeModal from 'react-native-modal';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import colors from '../constant/colors';
import {useIsKeyboardShown} from '../hooks/useIsKeyboardShown';

interface IProps {
  isVisible: boolean;
  closeModal: () => void;
  children: ReactNode;
}

function BottomModal(props: IProps) {
  const {isVisible, closeModal, children} = props;

  const insets = useSafeAreaInsets();
  const {keyboardHeight, isKeyboardShown} = useIsKeyboardShown();

  const contentPaddingBottom = useMemo(() => {
    let paddingBottom = 0;

    if (isKeyboardShown) {
      if (Platform.OS === 'ios') {
        paddingBottom += keyboardHeight;
      }
    } else {
      paddingBottom = insets.bottom;
    }

    return paddingBottom;
  }, [insets, isKeyboardShown, keyboardHeight]);

  return (
    <ReactNativeModal
      style={[styles.modal]}
      isVisible={isVisible}
      animationIn={'slideInUp'}
      animationOut={'slideOutDown'}
      animationInTiming={500}
      animationOutTiming={500}
      onBackButtonPress={closeModal}
      onBackdropPress={closeModal}>
      <View
        style={[styles.modalContent, {paddingBottom: contentPaddingBottom}]}>
        {children}
      </View>
    </ReactNativeModal>
  );
}

const styles = StyleSheet.create({
  modal: {
    margin: 0,
    justifyContent: 'flex-end',
  },
  modalContent: {
    maxHeight: '90%',
    paddingTop: 30,
    borderTopEndRadius: 30,
    borderTopStartRadius: 30,
    backgroundColor: colors.WHITE,
  },
});

export default BottomModal;

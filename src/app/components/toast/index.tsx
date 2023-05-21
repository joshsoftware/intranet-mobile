import React from 'react';
import {StyleSheet} from 'react-native';
import RNToast, {
  BaseToast,
  ErrorToast,
  ToastConfig,
  ToastProps,
} from 'react-native-toast-message';

const testConfig: ToastConfig = {
  success: props => (
    <BaseToast
      contentContainerStyle={[styles.contentContainerStyle, styles.successBg]}
      text2Style={[styles.text2Style, styles.successText2]}
      text2NumberOfLines={2}
      style={styles.successStyle}
      {...props}
    />
  ),
  error: props => (
    <ErrorToast
      contentContainerStyle={[styles.contentContainerStyle, styles.errorBg]}
      text2Style={[styles.text2Style, styles.errorText2]}
      text2NumberOfLines={2}
      style={styles.errorStyle}
      {...props}
    />
  ),
};

const Toast: React.FC<ToastProps> = props => (
  <RNToast config={testConfig} {...props} />
);

const styles = StyleSheet.create({
  contentContainerStyle: {
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
  },
  text2Style: {
    fontSize: 11,
  },
  successBg: {
    backgroundColor: '#d1e7dd',
  },
  successText2: {
    color: '#0a3622',
  },
  successStyle: {
    borderLeftColor: '#a3cfbb',
  },
  errorBg: {
    backgroundColor: '#f8d7da',
  },
  errorText2: {
    color: '#58151c',
  },
  errorStyle: {
    borderLeftColor: '#f1aeb5',
  },
});

export default Toast;

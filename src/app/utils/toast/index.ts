import Toast from 'react-native-toast-message';

type ToastType = 'success' | 'error';

/**
 * Displays a toast message with the given message and optional type.
 * @param message The message to display in the toast.
 * @param type The type of the toast (default: 'success').
 */
const toast = (message: string, type: ToastType = 'success') => {
  Toast.show({
    type,
    text2: message,
    position: 'top',
    visibilityTime: 5000,
  });
};

export default toast;

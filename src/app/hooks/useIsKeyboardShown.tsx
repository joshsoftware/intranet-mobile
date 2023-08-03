import {useEffect, useState} from 'react';
import {
  EmitterSubscription,
  Keyboard,
  KeyboardEventListener,
  Platform,
} from 'react-native';

// Reference:
// https://github.com/react-navigation/react-navigation/blob/9fe34b445fcb86e5666f61e144007d7540f014fa/packages/bottom-tabs/src/utils/useIsKeyboardShown.tsx#L4

export function useIsKeyboardShown() {
  const [isKeyboardShown, setIsKeyboardShown] = useState(false);
  const [keyboardHeight, setKeyboardHeight] = useState(0);

  useEffect(() => {
    const handleKeyboardShow: KeyboardEventListener = e => {
      setIsKeyboardShown(true);
      setKeyboardHeight(e.endCoordinates.height);
    };
    const handleKeyboardHide: KeyboardEventListener = () => {
      setIsKeyboardShown(false);
      setKeyboardHeight(0);
    };

    let subscriptions: EmitterSubscription[];

    if (Platform.OS === 'ios') {
      subscriptions = [
        Keyboard.addListener('keyboardWillShow', handleKeyboardShow),
        Keyboard.addListener('keyboardWillHide', handleKeyboardHide),
      ];
    } else {
      subscriptions = [
        Keyboard.addListener('keyboardDidShow', handleKeyboardShow),
        Keyboard.addListener('keyboardDidHide', handleKeyboardHide),
      ];
    }

    return () => {
      subscriptions.forEach(s => s.remove());
    };
  }, []);

  return {isKeyboardShown, keyboardHeight};
}

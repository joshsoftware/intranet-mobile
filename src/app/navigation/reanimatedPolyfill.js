import * as Reanimated from 'react-native-reanimated';
import { useRef } from 'react';

// 1. Polyfill isConfigured
try {
  if (Reanimated && (typeof Reanimated.isConfigured !== 'function' || Reanimated.isConfigured() === false)) {
    Object.defineProperty(Reanimated, 'isConfigured', {
      value: () => true,
      configurable: true,
      writable: true,
    });
  }
} catch (e) {
  console.warn('[ReanimatedPolyfill] Failed to polyfill isConfigured:', e);
}

// 2. Polyfill useAnimatedGestureHandler
try {
  if (Reanimated && !Reanimated.useAnimatedGestureHandler) {
    const useAnimatedGestureHandler = (handlers, dependencies) => {
      const initRef = useRef(null);
      if (initRef.current === null) {
        initRef.current = {
          context: {},
        };
      }
      const { context } = initRef.current;

      return Reanimated.useEvent(
        (event) => {
          'worklet';
          const { state } = event;

          if (state === 2) { // BEGAN / START
            if (handlers.onStart) {
              handlers.onStart(event, context);
            }
          } else if (state === 4) { // ACTIVE
            if (handlers.onActive) {
              handlers.onActive(event, context);
            }
          } else if (state === 5) { // END
            if (handlers.onEnd) {
              handlers.onEnd(event, context);
            }
            if (handlers.onFinish) {
              handlers.onFinish(event, context, true);
            }
          } else if (state === 3 || state === 1) { // CANCELLED (3) or FAILED (1)
            if (handlers.onCancel) {
              handlers.onCancel(event, context);
            }
            if (handlers.onFail) {
              handlers.onFail(event, context);
            }
            if (handlers.onFinish) {
              handlers.onFinish(event, context, false);
            }
          }
        },
        ['onGestureHandlerStateChange', 'onGestureHandlerEvent'],
        dependencies
      );
    };

    Object.defineProperty(Reanimated, 'useAnimatedGestureHandler', {
      value: useAnimatedGestureHandler,
      configurable: true,
      writable: true,
    });
  }
} catch (e) {
  console.warn('[ReanimatedPolyfill] Failed to polyfill useAnimatedGestureHandler:', e);
}

// 3. Polyfill BackHandler.removeEventListener for React Native 0.85 compatibility
import { BackHandler } from 'react-native';
try {
  if (BackHandler && !BackHandler.removeEventListener) {
    const originalAddEventListener = BackHandler.addEventListener;
    const subscriptions = new Map();

    BackHandler.addEventListener = (eventName, handler) => {
      const subscription = originalAddEventListener(eventName, handler);
      subscriptions.set(handler, subscription);
      return subscription;
    };

    BackHandler.removeEventListener = (eventName, handler) => {
      const subscription = subscriptions.get(handler);
      if (subscription) {
        subscription.remove();
        subscriptions.delete(handler);
      }
    };
  }
} catch (e) {
  console.warn('[BackHandlerPolyfill] Failed to polyfill BackHandler:', e);
}

// 4. Disable native screens by setting isNativePlatformSupported = false in core exports
try {
  const core1 = require('react-native-screens/lib/commonjs/core');
  if (core1) {
    core1.isNativePlatformSupported = false;
    if (core1.enableScreens) core1.enableScreens(false);
  }
} catch (e) {}

try {
  const core2 = require('react-native-screens/src/core');
  if (core2) {
    core2.isNativePlatformSupported = false;
    if (core2.enableScreens) core2.enableScreens(false);
  }
} catch (e) {}

try {
  const core3 = require('react-native-screens/lib/module/core');
  if (core3) {
    core3.isNativePlatformSupported = false;
    if (core3.enableScreens) core3.enableScreens(false);
  }
} catch (e) {}

try {
  const Screens = require('react-native-screens');
  if (Screens) {
    Screens.enableScreens(false);
  }
} catch (e) {}



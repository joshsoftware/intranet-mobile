import React, {useCallback, useState} from 'react';
import {LayoutChangeEvent, StyleSheet, View} from 'react-native';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';

import colors from '../../../constant/colors';
import {TalkItOutIcon} from '../../../constant/icons';
import {useTalkItOut} from '../dashboard.hooks';
import TalkItOutModal from './TalkItOutModal';

const SIZE = 58;
const MARGIN = 16;

const TalkItOutFab = () => {
  const {talkItOut, isLoading} = useTalkItOut();
  const [visible, setVisible] = useState(false);

  const x = useSharedValue(0);
  const y = useSharedValue(0);
  const startX = useSharedValue(0);
  const startY = useSharedValue(0);
  const minX = useSharedValue(0);
  const minY = useSharedValue(0);

  const openModal = useCallback(() => setVisible(true), []);
  const closeModal = useCallback(() => setVisible(false), []);

  const onLayout = (event: LayoutChangeEvent) => {
    const {width, height} = event.nativeEvent.layout;
    minX.value = Math.min(0, MARGIN - (width - SIZE - MARGIN));
    minY.value = Math.min(0, MARGIN - (height - SIZE - MARGIN));
  };

  const tap = Gesture.Tap().onEnd((_event, success) => {
    if (success) {
      runOnJS(openModal)();
    }
  });

  const pan = Gesture.Pan()
    .minDistance(8)
    .onStart(() => {
      startX.value = x.value;
      startY.value = y.value;
    })
    .onUpdate(event => {
      x.value = startX.value + event.translationX;
      y.value = startY.value + event.translationY;
    })
    .onEnd(() => {
      x.value = withSpring(Math.min(0, Math.max(minX.value, x.value)));
      y.value = withSpring(Math.min(0, Math.max(minY.value, y.value)));
    });

  const gesture = Gesture.Exclusive(pan, tap);

  const fabStyle = useAnimatedStyle(() => ({
    transform: [{translateX: x.value}, {translateY: y.value}],
  }));

  if (isLoading || !talkItOut) {
    return null;
  }

  return (
    <View pointerEvents="box-none" style={styles.overlay} onLayout={onLayout}>
      <GestureDetector gesture={gesture}>
        <Animated.View collapsable={false} style={[styles.fab, fabStyle]}>
          <TalkItOutIcon width={SIZE} height={SIZE} />
        </Animated.View>
      </GestureDetector>
      <TalkItOutModal
        isVisible={visible}
        closeModal={closeModal}
        talkItOut={talkItOut}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    zIndex: 80,
    elevation: 80,
  },
  fab: {
    position: 'absolute',
    right: MARGIN,
    bottom: MARGIN,
    width: SIZE,
    height: SIZE,
    borderRadius: SIZE / 2,
    backgroundColor: colors.WHITE,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: colors.SECONDARY,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.16,
    shadowRadius: 6,
    elevation: 5,
  },
});

export default TalkItOutFab;

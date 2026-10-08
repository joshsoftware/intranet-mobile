import React, {useMemo} from 'react';
import {View, Text, StyleSheet, Pressable, Image} from 'react-native';
import { Slider } from '@miblanchard/react-native-slider';
import {GoldenStar} from '../constants/icons';
import colors from '../constants/colors';

interface RatingBarProps {
  reward: number;
  setReward: (rating: number) => void;
  disabled?: boolean;
  rewardQuotaBalance?: number;
}

const RatingBar: React.FC<RatingBarProps> = ({
  reward,
  setReward,
  disabled = false,
  rewardQuotaBalance,
}) => {
  const maxStep = useMemo(() => {
    if (disabled || rewardQuotaBalance === undefined) {
      return disabled ? 0 : 3;
    }
    if (rewardQuotaBalance >= 5) return 3;
    if (rewardQuotaBalance >= 3) return 2;
    if (rewardQuotaBalance >= 1) return 1;
    return 0;
  }, [disabled, rewardQuotaBalance]);

  const isNiceDisabled = disabled || (rewardQuotaBalance !== undefined && rewardQuotaBalance < 1);
  const isGoodDisabled = disabled || (rewardQuotaBalance !== undefined && rewardQuotaBalance < 3);
  const isExcellentDisabled = disabled || (rewardQuotaBalance !== undefined && rewardQuotaBalance < 5);

  return (
    <View style={styles.sliderContainer}>
      <Slider
        containerStyle={styles.slider}
        minimumValue={0}
        maximumValue={3}
        step={1}
        value={reward}
        onSlidingComplete={value => {
          const selectedStep = Array.isArray(value) ? value[0] : value;
          const clampedStep = Math.min(selectedStep, maxStep);
          if (clampedStep !== reward) {
            setReward(clampedStep);
          }
        }}
        renderThumbComponent={() => (
          <Image source={GoldenStar} style={{width: 30, height: 30}} />
        )}
        minimumTrackTintColor={colors.GOLD}
        maximumTrackTintColor={colors.LIGHT_GRAY}
        disabled={disabled || maxStep === 0}
      />
      <View style={styles.labelsContainer}>
        <Pressable
          onPress={() => setReward(1)}
          disabled={isNiceDisabled}
          style={({pressed}) => [{opacity: isNiceDisabled ? 0.35 : pressed ? 0.7 : 1}]}>
          <Text style={[styles.sliderNice, isNiceDisabled && styles.disabledText]}>Nice</Text>
        </Pressable>
        <Pressable
          onPress={() => setReward(2)}
          disabled={isGoodDisabled}
          style={({pressed}) => [{opacity: isGoodDisabled ? 0.35 : pressed ? 0.7 : 1}]}>
          <Text style={[styles.sliderGood, isGoodDisabled && styles.disabledText]}>Good</Text>
        </Pressable>
        <Pressable
          onPress={() => setReward(3)}
          disabled={isExcellentDisabled}
          style={({pressed}) => [{opacity: isExcellentDisabled ? 0.35 : pressed ? 0.7 : 1}]}>
          <Text style={[styles.sliderExcellent, isExcellentDisabled && styles.disabledText]}>Excellent</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  rewardAndReportWrapper: {
    flex: 1,
    flexDirection: 'row',
    marginTop: 10,
  },
  sliderContainer: {
    marginLeft: 30,
    alignItems: 'center',
    width: '90%',
    height: 30,
  },
  slider: {
    width: '90%',
    height: 30,
  },
  labelsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '90%',
  },
  sliderNice: {
    fontSize: 14,
    color: 'black',
    marginLeft: 60,
    fontWeight: 'bold',
  },
  sliderGood: {
    fontSize: 14,
    color: 'black',
    paddingLeft: 25,
    fontWeight: 'bold',
  },
  sliderExcellent: {
    fontSize: 14,
    color: 'black',
    paddingLeft: 10,
    paddingRight: 10,
    fontWeight: 'bold',
  },
  disabledText: {
    color: '#888888',
  },
});

export default RatingBar;

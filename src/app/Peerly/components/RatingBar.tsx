import React from 'react';
import {View, Text, StyleSheet, Pressable} from 'react-native';
import Slider from '@react-native-community/slider';
import {GoldenStar} from '../constants/icons';

interface RatingBarProps {
  reward: number;
  setReward: (rating: number) => void;
  disabled?: boolean;
}

const RatingBar: React.FC<RatingBarProps> = ({reward, setReward, disabled}) => {
  return (
    <View style={styles.sliderContainer}>
      <Slider
        style={styles.slider}
        minimumValue={0}
        maximumValue={3}
        step={1}
        value={reward}
        onSlidingComplete={value => setReward(value)}
        thumbImage={GoldenStar}
        minimumTrackTintColor="#FFD700"
        maximumTrackTintColor="#DDD"
        disabled={disabled || false}
      />
      <View style={styles.labelsContainer}>
        <Pressable onPress={() => setReward(1)} disabled={disabled || false}>
          <Text style={styles.sliderGood}>Good</Text>
        </Pressable>
        <Pressable onPress={() => setReward(2)} disabled={disabled || false}>
          <Text style={styles.sliderNice}>Nice</Text>
        </Pressable>
        <Pressable onPress={() => setReward(3)} disabled={disabled || false}>
          <Text style={styles.sliderLove}>Love</Text>
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
    width: '85%',
  },
  sliderGood: {
    fontSize: 14,
    color: 'black',
    marginLeft: 60,
  },
  sliderNice: {
    fontSize: 14,
    color: 'black',
    paddingLeft: 25,
  },
  sliderLove: {
    fontSize: 14,
    color: 'black',
    paddingLeft: 10,
    paddingRight: 10,
  },
});

export default RatingBar;

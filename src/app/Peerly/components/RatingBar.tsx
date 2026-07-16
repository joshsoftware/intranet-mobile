import React from 'react';
import {View, Text, StyleSheet, Pressable, Image} from 'react-native';
import { Slider } from '@miblanchard/react-native-slider';
import {GoldenStar} from '../constants/icons';
import colors from '../constants/colors';

interface RatingBarProps {
  reward: number;
  setReward: (rating: number) => void;
  disabled?: boolean;
}

const RatingBar: React.FC<RatingBarProps> = ({reward, setReward, disabled}) => {
  return (
    <View style={styles.sliderContainer}>
      <Slider
        containerStyle={styles.slider}
        minimumValue={0}
        maximumValue={3}
        step={1}
        value={reward}
        onSlidingComplete={value => setReward(Array.isArray(value) ? value[0] : value)}
        renderThumbComponent={() => (
          <Image source={GoldenStar} style={{width: 30, height: 30}} />
        )}
        minimumTrackTintColor={colors.GOLD}
        maximumTrackTintColor={colors.LIGHT_GRAY}
        disabled={disabled || false}
      />
      <View style={styles.labelsContainer}>
        <Pressable onPress={() => setReward(1)} disabled={disabled || false}>
          <Text style={styles.sliderNice}>Nice</Text>
        </Pressable>
        <Pressable onPress={() => setReward(2)} disabled={disabled || false}>
          <Text style={styles.sliderGood}>Good</Text>
        </Pressable>
        <Pressable onPress={() => setReward(3)} disabled={disabled || false}>
          <Text style={styles.sliderExcellent}>Excellent</Text>
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
});

export default RatingBar;

import React, {useEffect, useRef} from 'react';
import {View, StyleSheet, FlatList, Animated} from 'react-native';

const SkeletonCard = () => {
  const shimmerValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(shimmerValue, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(shimmerValue, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
        }),
      ]),
    );

    animation.start();

    return () => {
      animation.stop();
    };
  }, [shimmerValue]);

  const shimmerStyle = {
    opacity: shimmerValue.interpolate({
      inputRange: [0, 1],
      outputRange: [0.3, 1],
    }),
  };

  return (
    <View style={[styles.card]}>
      <Animated.View style={[styles.imagePlaceholder, shimmerStyle]} />
    </View>
  );
};

const SkeletonLoader = () => {
  return (
    <FlatList
      data={[1, 2, 3, 4, 5, 6]}
      keyExtractor={item => item.toString()}
      renderItem={() => <SkeletonCard />}
      contentContainerStyle={styles.listContent}
      numColumns={2}
      columnWrapperStyle={styles.flatListColumnWrapper}
    />
  );
};

const styles = StyleSheet.create({
  listContent: {
    padding: 10,
  },
  card: {
    width: '45%',
    height: 200,
    marginBottom: 20,
    borderRadius: 10,
    backgroundColor: '#f0f0f0',
    padding: 10,
  },
  imagePlaceholder: {
    height: 180,
    borderRadius: 8,
    backgroundColor: '#e0e0e0',
  },
  flatListColumnWrapper: {
    justifyContent: 'space-between',
  },
});

export default SkeletonLoader;

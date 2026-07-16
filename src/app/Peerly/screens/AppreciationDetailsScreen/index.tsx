import React, {useState, useRef} from 'react';
import {View, StyleSheet, Dimensions, FlatList, ScrollView} from 'react-native';
import {useRoute} from '@react-navigation/native';
import AppreciationDetailsComponent from './AppreciationDetailsComponent';
import colors from '../../constants/colors';

const {width: SCREEN_WIDTH} = Dimensions.get('window');

const AppreciationDetailsScreen = () => {
  const route = useRoute();
  const {appriciationList, cardId}: any = route.params;

  const [currentIndex, setCurrentIndex] = useState(
    appriciationList.findIndex((item: any) => item.id === cardId),
  );

  const flatListRef = useRef(null);

  const renderItem = ({index}: any) => (
    <ScrollView style={styles.card}>
      <AppreciationDetailsComponent
        currentIndex={index}
        appriciationList={appriciationList}
      />
    </ScrollView>
  );

  const onMomentumScrollEnd = (event: any) => {
    const newIndex = Math.round(
      event.nativeEvent.contentOffset.x / SCREEN_WIDTH,
    );
    setCurrentIndex(newIndex);
  };

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={appriciationList}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={onMomentumScrollEnd}
        initialScrollIndex={currentIndex}
        getItemLayout={(data, index) => ({
          length: SCREEN_WIDTH,
          offset: SCREEN_WIDTH * index,
          index,
        })}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.WHITE,
  },
  card: {
    width: SCREEN_WIDTH,
    height: '100%',
  },
});

export default AppreciationDetailsScreen;

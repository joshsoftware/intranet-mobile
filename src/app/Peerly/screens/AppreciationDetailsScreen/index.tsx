import React, {useEffect, useMemo, useRef, useState} from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  FlatList,
  ScrollView,
  ActivityIndicator,
  Text,
} from 'react-native';
import {useRoute} from '@react-navigation/native';
import AppreciationDetailsComponent from './AppreciationDetailsComponent';
import colors from '../../constants/colors';
import {getAppreciationById} from '../../services/appreciationDetails';
import {loginPeerly} from '../../services/api/login';
import PeerlyAsyncStore from '../../services/peerlyAsyncStorage';
import {AppreciationDetails} from '../../services/home/types';

const {width: SCREEN_WIDTH} = Dimensions.get('window');

const ensurePeerlyAuth = async () => {
  const existingToken = await PeerlyAsyncStore.getItem(
    PeerlyAsyncStore.PEERLY_AUTH_TOKEN_KEY,
  );
  if (existingToken) {
    return;
  }

  const response = await loginPeerly();
  if (response?.data?.AuthToken) {
    await PeerlyAsyncStore.setItem(
      PeerlyAsyncStore.PEERLY_AUTH_TOKEN_KEY,
      response.data.AuthToken,
    );
  }
};

const AppreciationDetailsScreen = () => {
  const route = useRoute();
  const {appriciationList: routeList, cardId}: any = route.params || {};

  const [appriciationList, setAppriciationList] = useState<
    AppreciationDetails[] | undefined
  >(routeList);
  const [isLoading, setIsLoading] = useState(!routeList?.length);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    if (routeList?.length) {
      setAppriciationList(routeList);
      setIsLoading(false);
      setHasError(false);
      return;
    }

    let isMounted = true;

    const loadAppreciation = async () => {
      if (!cardId) {
        setHasError(true);
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        await ensurePeerlyAuth();
        const appreciation = await getAppreciationById(cardId);
        if (isMounted) {
          setAppriciationList([appreciation]);
          setHasError(false);
        }
      } catch {
        if (isMounted) {
          setHasError(true);
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    loadAppreciation();

    return () => {
      isMounted = false;
    };
  }, [cardId, routeList]);

  const initialIndex = useMemo(() => {
    if (!appriciationList?.length) {
      return 0;
    }
    const index = appriciationList.findIndex(
      (item: AppreciationDetails) => item.id === cardId,
    );
    return index >= 0 ? index : 0;
  }, [appriciationList, cardId]);

  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const flatListRef = useRef(null);

  useEffect(() => {
    setCurrentIndex(initialIndex);
  }, [initialIndex]);

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

  if (isLoading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color={colors.PRIMARY} />
      </View>
    );
  }

  if (hasError || !appriciationList?.length) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorText}>Unable to open appreciation.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={appriciationList}
        renderItem={renderItem}
        keyExtractor={item => String(item.id)}
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
  centerContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.WHITE,
    paddingHorizontal: 24,
  },
  errorText: {
    fontSize: 16,
    color: colors.PRIMARY,
    textAlign: 'center',
  },
});

export default AppreciationDetailsScreen;

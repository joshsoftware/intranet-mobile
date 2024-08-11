import React, {useCallback, useState} from 'react';
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  useWindowDimensions,
} from 'react-native';
import {
  SceneMap,
  TabView,
  Route,
  NavigationState,
  SceneRendererProps,
} from 'react-native-tab-view';
import colors from '../constants/colors';
import AppreciationCard from './AppreciationCard';
import {APPRECIATION_DETAILS_SCREEN} from '../constants/screenNames';
import {AppreciationDetails} from '../services/home/types';
import {useNavigation} from '@react-navigation/native';
import {AppreciationDetailScreenNavigationProp} from '../navigation/types';
import SkeletonLoader from './skeleton/skeleton';

type GivenAndReceivedAppriciationProps = {
  appreciationList: AppreciationDetails[];
  receivedList: AppreciationDetails[];
  expressedList: AppreciationDetails[];
  self?: boolean;
  isLoading?: boolean;
  disableBtn: boolean;
};

interface tabBarRoute extends Route {
  key: string;
  title: string;
}

interface tabBarState extends NavigationState<tabBarRoute> {}

const GivenAndReceivedAppriciation = ({
  appreciationList,
  self,
  receivedList,
  expressedList,
  isLoading,
  disableBtn,
}: GivenAndReceivedAppriciationProps) => {
  const navigation = useNavigation<AppreciationDetailScreenNavigationProp>();
  const layout = useWindowDimensions();
  const [index, setIndex] = useState(0);

  const [routes] = React.useState<tabBarRoute[]>([
    {key: 'received', title: 'Received'},
    {key: 'expressed', title: 'Expressed'},
  ]);

  const getAppriciationDetails = useCallback(
    (currentId: number) => {
      return appreciationList.filter(
        (item: AppreciationDetails) => item.id === currentId,
      );
    },
    [appreciationList],
  );

  const handleAppreciationCardClick = useCallback(
    (id: number) => {
      navigation.navigate(APPRECIATION_DETAILS_SCREEN, {
        cardId: id,
        appriciationList: self ? getAppriciationDetails(id) : appreciationList,
      });
    },
    [appreciationList, getAppriciationDetails, navigation, self],
  );

  const FirstRoute = useCallback(
    () => (
      <View style={styles.flatListWrapper}>
        {isLoading ? (
          <SkeletonLoader />
        ) : (
          <FlatList
            data={receivedList || []}
            renderItem={({item}) => (
              <AppreciationCard
                appreciationDetails={item}
                onPress={handleAppreciationCardClick}
              />
            )}
            keyExtractor={item => String(item.id)}
            numColumns={2}
          />
        )}
      </View>
    ),
    [isLoading, receivedList, handleAppreciationCardClick],
  );

  const SecondRoute = useCallback(
    () => (
      <View style={styles.flatListWrapper}>
        {isLoading ? (
          <SkeletonLoader />
        ) : (
          <FlatList
            data={expressedList || []}
            renderItem={({item}) => (
              <AppreciationCard
                appreciationDetails={item}
                onPress={handleAppreciationCardClick}
              />
            )}
            keyExtractor={item => String(item.id)}
            numColumns={2}
          />
        )}
      </View>
    ),
    [expressedList, handleAppreciationCardClick, isLoading],
  );

  const renderScene = SceneMap({
    received: FirstRoute,
    expressed: SecondRoute,
  });

  const renderCustomTabBar = (
    props: SceneRendererProps & {navigationState: tabBarState},
  ) => (
    <View style={styles.tabContainer}>
      {props.navigationState.routes.map((route, i) => {
        const isFocused = props.navigationState.index === i;

        return (
          <TouchableOpacity
            key={route.key}
            onPress={() => props.jumpTo(route.key)}
            style={[
              styles.tab,
              isFocused ? styles.activeTab : styles.inactiveTab,
              i === 0 ? styles.leftTab : styles.rightTab,
              disableBtn && styles.btnOpacity,
            ]}
            disabled={disableBtn}>
            <Text
              style={[
                styles.tabText,
                isFocused ? styles.activeTabText : styles.inactiveTabText,
              ]}>
              {route.title}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.appreciationList}>
        <TabView
          navigationState={{index, routes}}
          renderScene={renderScene}
          renderTabBar={renderCustomTabBar}
          onIndexChange={setIndex}
          initialLayout={{width: layout.width}}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.WHITE,
  },
  appreciationList: {
    width: '100%',
    height: '100%',
  },
  tabContainer: {
    flexDirection: 'row',
    alignSelf: 'center',
    marginVertical: 10,
    borderRadius: 15,
    backgroundColor: colors.SECONDARY_BACKGROUND_FIRST,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
  },
  activeTab: {
    backgroundColor: colors.PRIMARY,
  },
  inactiveTab: {
    backgroundColor: 'transparent',
  },
  leftTab: {
    borderRadius: 15,
  },
  rightTab: {
    borderRadius: 15,
  },
  tabText: {
    fontSize: 16,
  },
  activeTabText: {
    color: colors.WHITE,
  },
  inactiveTabText: {
    color: colors.BLACK,
  },
  flatListWrapper: {
    backgroundColor: colors.WHITE,
  },
  btnOpacity: {
    opacity: 0.5,
  },
});

export default GivenAndReceivedAppriciation;

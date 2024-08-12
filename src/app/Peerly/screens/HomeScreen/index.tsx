import React, {useCallback, useMemo, useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  useWindowDimensions,
  FlatList,
  Pressable,
  SafeAreaView,
} from 'react-native';

import colors from '../../constants/colors';
import AppreciationCard from '../../components/AppreciationCard';
import {SceneMap, TabBar, TabView} from 'react-native-tab-view';
import fonts from '../../../constant/fonts';
import LeaderBoardCard from '../../components/LeaderBoardCard';
import {
  useGetAppreciationList,
  useGetActiveUsersList,
  useGetTopUsersList,
} from './home.hooks';
import {useGetProfileDetails} from '../ProfileDetailScreen/profileDetail.hooks';
import {
  GIVE_APPRECIATION_SCREEN,
  APPRECIATION_DETAILS_SCREEN,
  APPRECIATION_SEARCH_SCREEN,
  PROFILE_DETAILS_SCREEN,
} from '../../constants/screenNames';
import {useNavigation} from '@react-navigation/native';
import {HomeScreenNavigationProp} from '../../navigation/types';
import {
  BronzeIcon,
  GoldIcon,
  NoAppreciationIcon,
  PlatinumIcon,
  SilverIcon,
  StarIcon,
} from '../../constants/icons';
import Search from '../../components/Search';
import InitialsAvatar from '../../components/InitialAvatar';
import FloatingButton from '../../components/button/floatingButton';
import SkeletonLoader from '../../components/skeleton/skeleton';
import {formatNumber} from '../../utils';
import FallbackUI from '../../components/fallbackUI/NoDataScreen';
import message from '../../constants/message';
import {SvgProps} from 'react-native-svg';

const paginationData = {
  page: 1,
  page_size: 500,
  sort_order: 'DESC',
};

const userBadgeProperty: {[key: string]: React.FC<SvgProps>} = {
  platinum: PlatinumIcon,
  gold: GoldIcon,
  silver: SilverIcon,
  bronze: BronzeIcon,
};

type BadgeType = 'platinum' | 'gold' | 'silver' | 'bronze';

const HomeScreen = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const layout = useWindowDimensions();
  const [refreshing, setRefreshing] = useState(false);

  const {data: profileDetails} = useGetProfileDetails();

  const {
    data: appreciationList,
    metadata: appreciationListMeta,
    isLoading: isLoadingAppreciations,
    isFetching: isFetchingAppreciations,
    isError: isErrorAppreciation,
    isSuccess: isSuccessAppreciation,
    refetch: refetchAppreciations,
  } = useGetAppreciationList(paginationData);

  const {data: activeUsersList} = useGetActiveUsersList();

  const {data: topUsersList} = useGetTopUsersList();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {key: 'leaderboard', title: 'Leaderboard'},
    {key: 'dynamicEngagers', title: 'Dynamic Engagers'},
  ]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    refetchAppreciations().finally(() => {
      setRefreshing(false);
    });
  }, [refetchAppreciations]);

  const FirstRoute = useCallback(
    () => (
      <View style={styles.activeAndTopTenTab}>
        <FlatList
          data={topUsersList}
          renderItem={({item}) => <LeaderBoardCard userDetail={item} />}
          keyExtractor={item => String(item.id)}
          horizontal={true}
        />
      </View>
    ),
    [topUsersList],
  );

  const SecondRoute = useCallback(
    () => (
      <View style={styles.activeAndTopTenTab}>
        <FlatList
          data={activeUsersList}
          renderItem={({item}) => <LeaderBoardCard userDetail={item} />}
          keyExtractor={item => String(item.id)}
          horizontal={true}
        />
      </View>
    ),
    [activeUsersList],
  );

  const renderScene = SceneMap({
    leaderboard: FirstRoute,
    dynamicEngagers: SecondRoute,
  });

  const renderTabBar = (props: any) => (
    <TabBar
      {...props}
      labelStyle={styles.labelStyle}
      scrollEnabled={true}
      inactiveColor={colors.SECONDARY}
      activeColor={colors.PRIMARY}
      indicatorStyle={styles.indicatorStyle}
      style={[
        styles.tabBarContainer,
        props.navigationState.index === 0 || 1
          ? styles.noBorder
          : styles.withBorder,
      ]}
      tabStyle={styles.tabStyle}
    />
  );

  const handleAppreciationCardClick = (id: number) => {
    navigation.navigate(APPRECIATION_DETAILS_SCREEN, {
      cardId: id,
      appriciationList: appreciationList,
    });
  };

  const handleSearchPress = () => {
    navigation.navigate(APPRECIATION_SEARCH_SCREEN);
  };

  const profileIconPadding = {
    paddingLeft: profileDetails?.total_points ? 7 : 0,
  };

  const handleProfileIconClick = () => {
    navigation.navigate(PROFILE_DETAILS_SCREEN, {
      userId: profileDetails?.employee_id,
    });
  };

  const userName = `${profileDetails?.first_name || ''}  ${
    profileDetails?.last_name || ''
  }`;

  const userBadge = useMemo(() => {
    if (profileDetails?.badge) {
      const badge = profileDetails.badge.toLowerCase();
      const BadgeIcon = userBadgeProperty[badge as BadgeType];
      return (
        <View style={styles.userBadgePosition}>
          <BadgeIcon width={14} height={14} />
        </View>
      );
    } else {
      <View>{null}</View>;
    }
  }, [profileDetails?.badge]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Peerly</Text>
          <Pressable onPress={() => handleProfileIconClick()}>
            {!profileDetails?.total_points &&
            profileDetails?.profile_image_url === '' ? (
              <InitialsAvatar name={userName} size={37} />
            ) : (
              <View style={[styles.userScoreBox, profileIconPadding]}>
                {profileDetails?.total_points ? (
                  <>
                    <StarIcon width={18} height={18} />
                    <Text style={styles.scoreText}>
                      {formatNumber(profileDetails.total_points)}
                    </Text>
                  </>
                ) : null}
                {profileDetails?.profile_image_url !== '' ? (
                  <View style={styles.profileIconWrapper}>
                    <Image
                      source={{uri: profileDetails?.profile_image_url}}
                      style={styles.userAvatar}
                    />
                  </View>
                ) : (
                  <View style={styles.profileIconWrapper}>
                    <InitialsAvatar name={userName} size={37} />
                  </View>
                )}
                {userBadge}
              </View>
            )}
          </Pressable>
        </View>
        <Pressable onPressIn={handleSearchPress} style={styles.searchWrapper}>
          <Search
            placeholder="Search Co-Worker"
            editable={false}
            onPress={handleSearchPress}
          />
        </Pressable>
        {isSuccessAppreciation && !appreciationList?.length ? (
          <View style={styles.noAppreciatonUi}>
            <FallbackUI
              message={message.NO_APPRECIATION_YET}
              icon={NoAppreciationIcon}
            />
          </View>
        ) : (
          <>
            <View style={styles.tabViewWrapper}>
              <TabView
                navigationState={{index, routes}}
                renderScene={renderScene}
                renderTabBar={renderTabBar}
                onIndexChange={setIndex}
                initialLayout={{width: layout.width}}
              />
            </View>
            {isErrorAppreciation ? (
              <View style={styles.noAppreciatonUi}>
                <FallbackUI message={message.SOMETHING_WENT_WRONG} />
              </View>
            ) : (
              <View style={styles.appreciationListWrapper}>
                <Text style={styles.totalAppreciationCountWrapper}>
                  Total:{' '}
                  <Text style={styles.totalAppreciationCount}>
                    {appreciationListMeta?.total_records} Appreciations
                  </Text>
                </Text>
                {isLoadingAppreciations || isFetchingAppreciations ? (
                  <SkeletonLoader />
                ) : (
                  <FlatList
                    data={appreciationList || []}
                    renderItem={({item}) => (
                      <AppreciationCard
                        appreciationDetails={item}
                        onPress={handleAppreciationCardClick}
                      />
                    )}
                    keyExtractor={item => String(item.id)}
                    numColumns={2}
                    style={styles.flatListAppreciation}
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                    contentContainerStyle={styles.flatListContainerStyle}
                  />
                )}
              </View>
            )}
          </>
        )}
        <FloatingButton
          title="Give Appreciation"
          onPress={() => navigation.navigate(GIVE_APPRECIATION_SCREEN)}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.WHITE,
  },
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    marginTop: 15,
  },
  title: {
    fontSize: 18,
    fontWeight: '500',
    color: colors.BLACK,
  },
  userScoreBox: {
    height: 32,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: colors.PRIMARY,
    borderRadius: 999,
    borderColor: colors.PRIMARY,
  },
  scoreText: {
    fontSize: 14,
    marginHorizontal: 5,
    color: colors.WHITE,
  },
  userAvatar: {
    width: 37,
    height: 37,
    borderRadius: 32,
    borderColor: colors.PRIMARY,
    borderWidth: 1,
  },
  searchWrapper: {
    paddingHorizontal: 15,
    marginVertical: 15,
  },
  noAppreciatonUi: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeAndTopTenTab: {
    flex: 1,
    backgroundColor: colors.LIGHT_PASTEL_BLUE,
  },
  labelStyle: {
    color: colors.LABEL_COLOR_SECONDARY,
    textAlign: 'left',
    fontSize: 16,
    fontFamily: fonts.ARIAL,
    textTransform: 'none',
  },
  indicatorStyle: {backgroundColor: colors.PRIMARY},
  tabBarContainer: {
    backgroundColor: colors.LIGHT_PASTEL_BLUE,
    elevation: 0,
    shadowOpacity: 0,
  },
  noBorder: {
    borderBottomWidth: 0,
  },
  withBorder: {
    borderBottomWidth: 1,
    borderBottomColor: colors.PRIMARY,
  },
  tabStyle: {
    alignItems: 'flex-start',
    width: 'auto',
    paddingLeft: 20,
    paddingRight: 20,
  },
  appreciationListWrapper: {
    marginTop: 10,
    flex: 1,
    backgroundColor: colors.WHITE,
    paddingHorizontal: 10,
  },
  totalAppreciationCountWrapper: {
    paddingLeft: 10,
    paddingBottom: 10,
  },
  totalAppreciationCount: {
    color: colors.BLACK,
    fontWeight: 'bold',
  },
  flatListAppreciation: {
    backgroundColor: 'transparent',
  },
  tabViewWrapper: {
    height: 190,
  },
  flatListContainerStyle: {
    paddingBottom: 50,
  },
  userBadgePosition: {
    position: 'absolute',
    left: 90,
    top: -8,
  },
  profileIconWrapper: {
    marginBottom: 4,
  },
});
export default HomeScreen;

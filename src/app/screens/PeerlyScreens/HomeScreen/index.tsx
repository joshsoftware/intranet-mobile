import React from 'react';
import {
  View,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  Text,
  TextInput,
  Image,
  useWindowDimensions,
  FlatList,
} from 'react-native';

import colors from '../../../constant/colors';
import AppreciationCard from '.././Components/AppreciationCard';
import {SceneMap, TabBar, TabView} from 'react-native-tab-view';
import fonts from '../../../constant/fonts';
import FloatingGiveAppreciationButton from '../../../components/button/floatingGiveAppreciationButton';
import LeaderBoardCard from '.././Components/LeaderBoardCard';
import {
  useGetProfileDetails,
  useGetAppreciationList,
  useGetActiveUsersList,
  useGetTopUsersList,
} from './home.hooks';
import {APPRECIATION} from '../../../constant/screenNames';

const HomeScreen = ({navigation}) => {
  const layout = useWindowDimensions();
  const {data: profileDetails} = useGetProfileDetails();

  const {data: appreciationList} = useGetAppreciationList();

  const {data: activeUsersList} = useGetActiveUsersList();

  const {data: topUsersList} = useGetTopUsersList();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {key: 'top10', title: 'Top 10'},
    {key: 'activeUser', title: 'Active user'},
  ]);

  const FirstRoute = () => (
    <View style={{flex: 1, backgroundColor: '#F4F6FF'}}>
      <FlatList
        data={activeUsersList}
        renderItem={({item}) => <LeaderBoardCard userDetail={item} />}
        keyExtractor={item => item.id}
        horizontal={true}
      />
    </View>
  );

  const SecondRoute = () => (
    <View style={{flex: 1, backgroundColor: '#F4F6FF', height: 20}}>
      <FlatList
        data={topUsersList}
        renderItem={({item}) => <LeaderBoardCard userDetail={item} />}
        keyExtractor={item => item.id}
        horizontal={true}
      />
    </View>
  );

  const renderScene = SceneMap({
    top10: FirstRoute,
    activeUser: SecondRoute,
  });

  const renderTabBar = (props: any) => (
    <TabBar
      {...props}
      labelStyle={styles.labelStyle}
      scrollEnabled={true}
      inactiveColor={colors.SECONDARY}
      activeColor={colors.PRIMARY}
      indicatorStyle={styles.indicatorStyle}
      style={styles.tabBarContainer}
    />
  );

  return (
    <>
      <View style={styles.header}>
        <Text style={styles.title}>Peerly</Text>
        <View style={styles.userScore}>
          <Text style={styles.scoreText}>
            {profileDetails?.total_points || 0}
          </Text>
          <Image
            source={
              profileDetails?.profile_image_url ||
              require('../../../../assets/images/profile.png')
            }
            style={styles.userAvatar}
          />
        </View>
      </View>

      <TextInput style={styles.searchInput} placeholder={'Search Co-Worker'} />

      <View style={{height: layout.height * 0.2}}>
        <TabView
          navigationState={{index, routes}}
          renderScene={renderScene}
          renderTabBar={renderTabBar}
          onIndexChange={setIndex}
          initialLayout={{width: layout.width}}
        />
      </View>

      <View style={{flex: 1, backgroundColor: colors.WHITE}}>
        <FlatList
          data={appreciationList?.appreciations || []}
          renderItem={({item}) => (
            <AppreciationCard appreciationDetails={item} />
          )}
          keyExtractor={item => item.id}
          numColumns={2}
        />
      </View>

      <FloatingGiveAppreciationButton
        onPress={() => navigation.navigate(APPRECIATION)}
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.WHITE,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  userScore: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  scoreText: {
    marginRight: 5,
  },
  userAvatar: {
    width: 30,
    height: 30,
    borderRadius: 15,
  },
  searchInput: {
    backgroundColor: colors.LIGHT_GREY_BACKGROUND,
    padding: 10,
    margin: 10,
    borderRadius: 10,
  },
  activeTab: {
    fontWeight: 'bold',
    borderBottomWidth: 2,
    borderBottomColor: 'blue',
  },

  labelStyle: {
    color: colors.LABEL_COLOR_SECONDARY,
    textAlign: 'left',
    fontSize: 14,
    fontFamily: fonts.ARIAL,
    textTransform: 'none',
  },

  indicatorStyle: {backgroundColor: colors.PRIMARY},

  tabBarContainer: {
    backgroundColor: '#F4F6FF',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.PRIMARY,
  },
});
export default HomeScreen;

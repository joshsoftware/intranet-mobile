import React, {useContext} from 'react';
import {
  ActivityIndicator,
  SafeAreaView,
  StyleSheet,
  View,
  Text,
} from 'react-native';
import {
  TabBar,
  TabBarProps,
  TabView,
  SceneRendererProps,
} from 'react-native-tab-view';

import Header from '../../components/header';
import PersonalDetails from './tabs/PersonalDetails';
import PublicProfile from './tabs/PublicProfile';
import Skills from './tabs/Skills';
import Assets from './tabs/Assets';
import Deployments from './tabs/Deployments';
import EmployeeDetails from './tabs/EmployeeDetails';

import UserContext from '../../context/user.context';
import useProfileData from './profile.hooks';

import colors from '../../constant/colors';
import fonts from '../../constant/fonts';
import {IUserProfileData} from './interface';

type RenderSceneProps = SceneRendererProps & {
  route: {
    key: string;
    title: string;
  };
};

const _renderScene = (
  data: IUserProfileData,
  refetch: () => void,
  {route}: RenderSceneProps,
) => {
  switch (route.key) {
    case 'publicProfile':
      return <PublicProfile data={data.publicProfile} />;
    case 'personalDetails':
      return <PersonalDetails data={data.privateProfile} />;
    case 'skills':
      return <Skills data={data.skills} refresh={refetch} />;
    case 'employeeDetails':
      return <EmployeeDetails data={data.employeeDetail} />;
    case 'assets':
      return <Assets data={data.assets} />;
    case 'deployments':
      return <Deployments data={data.deployment} />;
    default:
      return <PublicProfile data={data.publicProfile} />;
  }
};

const routesPerRole = {
  Manager: [
    {key: 'publicProfile', title: 'Public Profile'},
    {key: 'personalDetails', title: 'Personal Details'},
    {key: 'skills', title: 'Skills'},
    {key: 'employeeDetails', title: 'Employee Details'},
    {key: 'assets', title: 'Assets'},
    {key: 'deployments', title: 'Deployments'},
  ],
  Employee: [
    {key: 'publicProfile', title: 'Public Profile'},
    {key: 'personalDetails', title: 'Personal Details'},
    {key: 'skills', title: 'Skills'},
    {key: 'employeeDetails', title: 'Employee Details'},
    {key: 'assets', title: 'Assets'},
    {key: 'deployments', title: 'Deployments'},
  ],
  Intern: [
    {key: 'publicProfile', title: 'Public Profile'},
    {key: 'personalDetails', title: 'Personal Details'},
    {key: 'skills', title: 'Skills'},
    {key: 'employeeDetails', title: 'Employee Details'},
    {key: 'assets', title: 'Assets'},
    {key: 'deployments', title: 'Deployments'},
  ],
};

const ProfileScreen = () => {
  const [userContext] = useContext(UserContext);

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState(
    routesPerRole[userContext?.userData.role || 'Employee'],
  );

  const {data, isLoading, isError, refetch} = useProfileData();

  const renderScene = (props: RenderSceneProps) => {
    if (data) {
      return _renderScene(data, refetch, props);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header type="secondary" title="Profile" isRightButtonVisible={false} />
      {isLoading ? (
        <View style={styles.flexCenter}>
          <ActivityIndicator size="large" color={colors.PRIMARY} />
        </View>
      ) : (
        <>
          {isError ? (
            <View style={styles.flexCenter}>
              <Text>Something went wrong!</Text>
            </View>
          ) : (
            <TabView
              navigationState={{index, routes}}
              renderScene={renderScene}
              renderTabBar={renderTabBar}
              onIndexChange={setIndex}
            />
          )}
        </>
      )}
    </SafeAreaView>
  );
};

const renderTabBar = (props: TabBarProps<{key: string; title: string}>) => {
  return (
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
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  labelStyle: {
    color: colors.LABEL_COLOR_SECONDARY,
    textAlign: 'center',
    fontSize: 14,
    fontFamily: fonts.ARIAL,
    textTransform: 'none',
  },
  indicatorStyle: {backgroundColor: colors.PRIMARY},
  tabBarContainer: {
    backgroundColor: colors.WHITE,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.PRIMARY,
  },

  flexCenter: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ProfileScreen;

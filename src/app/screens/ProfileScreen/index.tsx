import React, {useCallback, useContext} from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';
import {
  TabBar,
  TabBarProps,
  TabView,
  SceneRendererProps,
} from 'react-native-tab-view';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import Header from '../../components/header';
import PersonalDetails from './tabs/PersonalDetails';
import PublicProfile from './tabs/PublicProfile';
import Skills from './tabs/Skills';
import Assets from './tabs/Assets';
import Deployments from './tabs/Deployments';
import EmployeeDetails from './tabs/EmployeeDetails';
import Typography from '../../components/typography';

import UserContext, {UserRole} from '../../context/user.context';
import useProfileData from './profile.hooks';
import {isDeployment, isManagement} from '../../utils/user';

import colors from '../../constant/colors';
import fonts from '../../constant/fonts';
import {IUserProfileData} from './interface';

type RenderSceneProps = SceneRendererProps & {
  route: {
    key: string;
    title: string;
  };
};

const renderSceneScreen = (
  data: IUserProfileData,
  {route}: RenderSceneProps,
) => {
  switch (route.key) {
    case 'publicProfile':
      return <PublicProfile {...data.publicProfile} />;
    case 'personalDetails':
      return <PersonalDetails {...data.privateProfile} />;
    case 'skills':
      return <Skills {...data.skills} />;
    case 'employeeDetails':
      return <EmployeeDetails {...data.employeeDetail} />;
    case 'assets':
      return <Assets {...data.assets} />;
    case 'deployments':
      return <Deployments {...data.deployment} />;
    default:
      return <PublicProfile {...data.publicProfile} />;
  }
};

const renderRoutesPerRole = (userRole: UserRole) => {
  const profileTabs = [
    {key: 'publicProfile', title: 'Public Profile'},
    {key: 'personalDetails', title: 'Personal Details'},
    {key: 'skills', title: 'Skills'},
    {key: 'assets', title: 'Assets'},
  ];
  if (isDeployment(userRole)) {
    profileTabs.push(
      {key: 'employeeDetails', title: 'Employee Details'},
      {key: 'deployments', title: 'Deployments'},
    );
  } else if (isManagement(userRole)) {
    profileTabs.push({key: 'employeeDetails', title: 'Employee Details'});
  }
  return profileTabs;
};

const ProfileScreen = () => {
  const [userContext] = useContext(UserContext);
  const [sceneIndex, setSceneIndex] = React.useState(0);
  const {data, isLoading, isError} = useProfileData();
  const inset = useSafeAreaInsets();

  const routes = renderRoutesPerRole(userContext?.userData.role || 'Employee');

  const renderScene = useCallback(
    (props: RenderSceneProps) => {
      if (data) {
        return renderSceneScreen(data, props);
      }
    },
    [data],
  );

  return (
    <View style={[styles.container, {marginBottom: inset.bottom}]}>
      <Header type="secondary" title="Profile" />
      {isLoading ? (
        <View style={styles.flexCenter}>
          <ActivityIndicator size="large" color={colors.PRIMARY} />
        </View>
      ) : (
        <>
          {isError ? (
            <View style={styles.flexCenter}>
              <Typography type="description">Something went wrong!</Typography>
            </View>
          ) : (
            <TabView
              navigationState={{index: sceneIndex, routes}}
              renderScene={renderScene}
              renderTabBar={renderTabBar}
              onIndexChange={setSceneIndex}
            />
          )}
        </>
      )}
    </View>
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

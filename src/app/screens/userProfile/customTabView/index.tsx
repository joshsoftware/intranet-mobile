import React from 'react';
import {useWindowDimensions, StyleSheet} from 'react-native';
import {
  TabView,
  SceneMap,
  TabBar,
  SceneRendererProps,
  NavigationState,
} from 'react-native-tab-view';
import {useQuery} from 'react-query';

import Deployment from '../Deployment';
import EmployeeDetails from '../EmployeeDetails';
import PersonalDetails from '../PersonalDetails';
import PublicProfile from '../PublicProfile';
import Skills from '../Skills';
import Asset from '../Assets';

import colors from '../../../constant/colors';
import fonts from '../../../constant/fonts';
import {getUserRequest} from '../../../services/api/userProfile';
import LoadSpinner from '../../../components/LoadSpinner';

const CustomTabView = () => {
  const layout = useWindowDimensions();
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {key: 'publicProfile', title: 'Public Profile'},
    {key: 'personalDetails', title: 'Personal Details'},
    {key: 'skills', title: 'Skills'},
    {key: 'employeeDetails', title: 'Employee Details'},
    {key: 'assets', title: 'Asset'},
    {key: 'deployment', title: 'Deployment'},
  ]);
  const {data} = useQuery({
    queryKey: ['user'],
    queryFn: getUserRequest,
  });

  if (data) {
    console.log('Data', data.record);
    const renderScene = SceneMap({
      publicProfile: () => <PublicProfile data={data.publicProfile} />,
      personalDetails: () => <PersonalDetails data={data.personalDetails} />,
      skills: () => <Skills data={data.skills} />,
      employeeDetails: () => <EmployeeDetails data={data.employeeDetails} />,
      assets: () => <Asset data={data.assets} />,
      deployment: () => <Deployment data={data.deploymentDetails} />,
    });

    const renderTabBar = (
      props: SceneRendererProps & {
        navigationState: NavigationState<{key: string; title: string}>;
      },
    ) => {
      return (
        <TabBar
          {...props}
          indicatorStyle={styles.indicatorStyle}
          inactiveColor={colors.SECONDARY}
          activeColor={colors.PRIMARY}
          scrollEnabled={true}
          labelStyle={styles.labelStyle}
          style={styles.tabBarContainer}
        />
      );
    };

    return (
      <TabView
        navigationState={{index, routes}}
        renderScene={renderScene}
        renderTabBar={renderTabBar}
        onIndexChange={setIndex}
        initialLayout={{width: layout.width}}
        style={styles.tabViewContainer}
        sceneContainerStyle={styles.sceneContainerStyle}
      />
    );
  } else {
    return <LoadSpinner />;
  }
};

const styles = StyleSheet.create({
  labelStyle: {
    color: colors.LABEL_COLOR_SECONDARY,
    textAlign: 'center',
    fontSize: 14,
    fontFamily: fonts.ARIAL,
    textTransform: 'none',
  },
  tabBarContainer: {
    backgroundColor: colors.WHITE,
    marginBottom: 28,
    height: 40,
  },
  indicatorStyle: {backgroundColor: colors.PRIMARY},
  sceneContainerStyle: {
    paddingHorizontal: 16,
    backgroundColor: colors.WHITE,
  },
  tabViewContainer: {backgroundColor: colors.WHITE},
});
export default CustomTabView;

import React, {useContext} from 'react';
import {
  useWindowDimensions,
  StyleSheet,
  View,
  ActivityIndicator,
} from 'react-native';
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
import ErrorMessage from '../../../components/errorMessage';

import {getUserRequest} from '../../../services/api/userProfile';

import colors from '../../../constant/colors';
import fonts from '../../../constant/fonts';

import {
  AssetType,
  addressType,
  assessmentDetailsType,
  deploymentDetailsType,
  designationDetailsType,
  emergencyContactDetailsType,
  employeeDetailsType,
  otherDetailsType,
  personalDetailsType,
  profileDetailsType,
  projectType,
  skillsType,
  socialDetailsType,
} from '../../../types';
import {NO_DATA_FETCHED} from '../../../constant/message';
import UserContext from '../../../context/user.context';

type dataType = {
  publicProfile: {
    publicProfile: profileDetailsType;
    socialDetails: socialDetailsType;
  };
  privateProfile: {
    personalDetail: personalDetailsType;
    emergencyContactDetails: emergencyContactDetailsType[];
    address: addressType[];
  };
  employeeDetail: {
    employeeDetail: employeeDetailsType;
    designationDetails: designationDetailsType;
    assessmentDetails: assessmentDetailsType;
    otherDetails: otherDetailsType;
    currentProjects: projectType[];
    previousProjects: projectType[];
  };
  skills: skillsType;
  assets: {
    currentAsset: AssetType[];
    previousAsset: AssetType[];
  };
  deployment: deploymentDetailsType;
};

const renderSceneWrapper = (data: dataType, refetch: () => {}, role: string) =>
  role === 'Manager'
    ? SceneMap({
        publicProfile: () => <PublicProfile data={data.publicProfile} />,
        personalDetails: () => <PersonalDetails data={data.privateProfile} />,
        skills: () => <Skills data={data.skills} refresh={refetch} />,
        employeeDetails: () => <EmployeeDetails data={data.employeeDetail} />,
        assets: () => <Asset data={data.assets} />,
        deployment: () => <Deployment data={data.deployment} />,
      })
    : SceneMap({
        publicProfile: () => <PublicProfile data={data.publicProfile} />,
        personalDetails: () => <PersonalDetails data={data.privateProfile} />,
        skills: () => <Skills data={data.skills} refresh={refetch} />,
        assets: () => <Asset data={data.assets} />,
      });

const CustomTabView = () => {
  const [userContextData] = useContext(UserContext);
  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);

  const [routes] = React.useState(
    userContextData?.userData.role === 'Manager'
      ? [
          {key: 'publicProfile', title: 'Public Profile'},
          {key: 'personalDetails', title: 'Personal Details'},
          {key: 'skills', title: 'Skills'},
          {key: 'employeeDetails', title: 'Employee Details'},
          {key: 'assets', title: 'Asset'},
          {key: 'deployment', title: 'Deployment'},
        ]
      : [
          {key: 'publicProfile', title: 'Public Profile'},
          {key: 'skills', title: 'Skills'},
          {key: 'assets', title: 'Asset'},
          {key: 'personalDetails', title: 'Personal Details'},
        ],
  );

  const {data, refetch, isError, isRefetchError, isLoading} = useQuery({
    queryKey: ['user'],
    queryFn: getUserRequest,
  });

  if (isLoading) {
    return (
      <View style={styles.errorMessageContainer}>
        <ActivityIndicator size="large" color={colors.PRIMARY} />
      </View>
    );
  } else if (!isError && data && !isRefetchError) {
    const renderScene = renderSceneWrapper(
      data,
      refetch,
      userContextData?.userData.role as string,
    );

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
    return (
      <View style={styles.errorMessageContainer}>
        <ErrorMessage message={NO_DATA_FETCHED} />
      </View>
    );
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
    height: 45,
  },
  indicatorStyle: {backgroundColor: colors.PRIMARY},
  sceneContainerStyle: {
    flex: 1,
    backgroundColor: colors.WHITE,
  },
  tabViewContainer: {backgroundColor: colors.WHITE},
  errorMessageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default CustomTabView;

import React, {useState} from 'react';
import {StyleSheet} from 'react-native';
import {
  TabBar,
  TabBarProps,
  TabView,
  SceneRendererProps,
} from 'react-native-tab-view';

import fonts from '../../constant/fonts';
import colors from '../../constant/colors';
import TabScreen from './component/TabScreen';

type RenderSceneProps = SceneRendererProps & {
  route: {
    key: string;
    title: string;
  };
};

const renderScene = ({route}: RenderSceneProps) => {
  return <TabScreen route={route.key} />;
};

const LeaveScreen = () => {
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    {key: 'pending', title: 'Pending'},
    {key: 'history', title: 'Leave History'},
  ]);

  return (
    <TabView
      navigationState={{index, routes}}
      renderTabBar={renderTabBar}
      renderScene={renderScene}
      onIndexChange={setIndex}
    />
  );
};

const renderTabBar = (props: TabBarProps<{key: string; title: string}>) => {
  return (
    <TabBar
      {...props}
      labelStyle={styles.labelStyle}
      inactiveColor={colors.SECONDARY}
      activeColor={colors.PRIMARY}
      indicatorStyle={styles.indicatorStyle}
      style={styles.tabBarContainer}
    />
  );
};

const styles = StyleSheet.create({
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
});

export default LeaveScreen;

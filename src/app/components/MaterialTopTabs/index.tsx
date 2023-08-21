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

export type RenderSceneProps = SceneRendererProps & {
  route: {
    key: string;
    title: string;
  };
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

interface IProps {
  routes: {key: string; title: string}[];
  renderScene: (props: RenderSceneProps) => React.ReactElement;
}

function MaterialTopTabs(props: IProps) {
  const {routes, renderScene} = props;

  const [screenIndex, setScreenIndex] = useState(0);

  return (
    <TabView
      navigationState={{index: screenIndex, routes}}
      renderTabBar={renderTabBar}
      renderScene={renderScene}
      onIndexChange={setScreenIndex}
    />
  );
}

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

export default MaterialTopTabs;

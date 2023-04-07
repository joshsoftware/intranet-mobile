import React, {useState} from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';

import * as Animatable from 'react-native-animatable';

import Accordion from 'react-native-collapsible/Accordion';
import DetailsView from './profile/cardDetails/detailsView';
import Typography from './typography';

import {projectType} from '../types';
import colors from '../constant/colors';
import {ArrowDown, ArrowUp} from '../constant/icons';

type Props = {
  data: projectType[];
};
const CustomAccordian = ({data}: Props) => {
  const [activeProjects, setActiveProjects] = useState<number[]>([]);

  const setProjects = (sections: number[]) => {
    setActiveProjects(sections ? sections : []);
  };

  const renderHeader = (
    content: projectType,
    index: number,
    isActive: boolean,
    sections: projectType[],
  ) => {
    return (
      <Animatable.View duration={400} style={styles.header}>
        <Typography style={styles.headerText} type="label">
          {content.projectName}
        </Typography>
        {isActive ? <ArrowUp /> : <ArrowDown />}
      </Animatable.View>
    );
  };

  const renderContent = (
    content: projectType,
    index: number,
    isActive: boolean,
    sections: projectType[],
  ) => {
    // Accordion Content view
    return (
      <Animatable.View duration={400}>
        <DetailsView data={content} />
      </Animatable.View>
    );
  };
  return (
    <Accordion
      activeSections={activeProjects}
      sections={data}
      renderHeader={renderHeader}
      renderContent={renderContent}
      onChange={setProjects}
      underlayColor="#E6EDFF"
      touchableComponent={TouchableOpacity}
    />
  );
};

const styles = StyleSheet.create({
  header: {
    height: 30,
    padding: 5,
    borderRadius: 5,
    backgroundColor: '#E6EDFF',
    marginVertical: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerText: {
    color: colors.LABEL_COLOR_SECONDARY,
    paddingLeft: 5,
  },
});
export default CustomAccordian;

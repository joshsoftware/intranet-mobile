import React from 'react';
import {ScrollView, StyleSheet} from 'react-native';

import {View} from 'react-native-animatable';

import CardDetails from '../../components/profile/cardDetails';
import DetailsView from '../../components/profile/cardDetails/detailsView';
import CustomChip from '../../components/customChip';

import {skillsType} from '../../types';

type Props = {
  data: skillsType;
};
const Skills = ({data}: Props) => {
  return (
    <ScrollView>
      <CardDetails title="Details">
        <DetailsView
          data={{primary: data.primary, secondary: data.secondary}}
        />
      </CardDetails>
      <CardDetails title="Other Skills">
        <View style={styles.containerStyle}>
          {data.others.map((skill: string, index: number) => (
            <CustomChip label={skill} style={styles.chipStyle} mode="view" />
          ))}
        </View>
      </CardDetails>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  containerStyle: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  chipStyle: {
    marginLeft: 10,
  },
});
export default Skills;

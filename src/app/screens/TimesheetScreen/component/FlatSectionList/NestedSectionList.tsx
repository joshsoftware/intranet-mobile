import React from 'react';
import {SectionList, StyleSheet, Text} from 'react-native';

import colors from '../../../../constant/colors';

const NestedSectionList = <T,>(props: {
  data: {title: string; data: T[]}[];
  renderItem: ({item}: {item: T}) => React.ReactElement;
}) => {
  const {data, renderItem} = props;

  const renderSectionHeader = ({
    section: {title},
  }: {
    section: {title: string};
  }) => {
    return <Text style={styles.sectionHeader}>{title}</Text>;
  };

  return (
    <SectionList
      sections={data}
      renderItem={renderItem}
      renderSectionHeader={renderSectionHeader}
    />
  );
};

const styles = StyleSheet.create({
  sectionHeader: {
    color: colors.PRIMARY,
    paddingHorizontal: 16,
  },
});

export default NestedSectionList;

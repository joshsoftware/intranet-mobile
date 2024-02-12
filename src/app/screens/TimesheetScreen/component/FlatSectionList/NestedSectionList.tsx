import React from 'react';
import {SectionList, StyleSheet, Text} from 'react-native';

import colors from '../../../../constant/colors';

interface IProps<T> {
  data: {title: string; id?: number; data: T[]}[];
  superSection: string;
  renderItem: (
    item: T,
    superSection: string,
    subSectionId?: number,
    subSection?: string,
  ) => React.ReactElement;
}

const NestedSectionList = <T,>(props: IProps<T>) => {
  const {data, superSection, renderItem} = props;

  const renderSectionHeader = ({
    section: {title},
  }: {
    section: {title: string};
  }) => {
    return <Text style={styles.sectionHeader}>{title}</Text>;
  };

  const renderItemWrapper = ({
    item,
    section: {id, title},
  }: {
    item: T;
    section: {id?: number; title: string};
  }) => {
    return renderItem(item, superSection, id, title);
  };

  return (
    <SectionList
      sections={data}
      renderItem={renderItemWrapper}
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

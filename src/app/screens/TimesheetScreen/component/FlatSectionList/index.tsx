import React from 'react';
import {FlatList, StyleSheet, Text} from 'react-native';

import NestedSectionList from './NestedSectionList';

import colors from '../../../../constant/colors';

export type FlatSectionListData<T> = {
  title: string;
  data: {
    title: string;
    id: number;
    data: T[];
  }[];
}[];

interface IProps<T> {
  data: FlatSectionListData<T>;
  refreshing: boolean;
  onRefresh: () => void;
  renderItem: (item: T, superSection: string, subSectionId: number) => React.ReactElement;
}

const FlatSectionList = <T,>(props: IProps<T>) => {
  const {data, refreshing, onRefresh, renderItem: renderNestedItem} = props;

  const renderItem = ({
    item,
  }: {
    item: {title: string; data: {title: string; id: number; data: T[]}[]};
  }) => {
    return (
      <>
        <Text style={styles.title}>{item.title}</Text>
        <NestedSectionList
          data={item.data}
          renderItem={renderNestedItem}
          superSection={item.title}
        />
      </>
    );
  };

  return (
    <FlatList
      data={data}
      refreshing={refreshing}
      renderItem={renderItem}
      onRefresh={onRefresh}
    />
  );
};

const styles = StyleSheet.create({
  title: {
    textAlign: 'center',
    fontWeight: 'bold',
    color: colors.PRIMARY,
    paddingVertical: 5,
    backgroundColor: colors.LIGHT_GREY_BACKGROUND,
  },
});

export default FlatSectionList;

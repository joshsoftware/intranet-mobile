import {
  ActivityIndicator,
  FlatList,
  ListRenderItemInfo,
  StyleSheet,
  View,
} from 'react-native';
import React from 'react';

import linear from '../../../components/seperator/linear';
import Typography from '../../../components/typography';
import {useTeamMembersLeaves} from '../dashboard.hooks';

import {dateFormate} from '../../../utils/date';

type ItemProps = {
  name: string;
  from: string;
  to: string;
};

const renderItem = ({
  item: {name, from, to},
}: ListRenderItemInfo<ItemProps>) => {
  return (
    <View style={styles.item}>
      <Typography type="header">{name}</Typography>
      <Typography type="label">
        Leave From: {dateFormate(from)} To: {dateFormate(to)}
      </Typography>
    </View>
  );
};

const TeamMembersLeaves = () => {
  const {data, isLoading} = useTeamMembersLeaves();

  if (!isLoading && !data.length) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Typography type="header" style={styles.title}>
        Team Members Upcoming Leaves
      </Typography>
      {isLoading ? (
        <ActivityIndicator size="large" />
      ) : (
        <FlatList
          data={data}
          renderItem={renderItem}
          ItemSeparatorComponent={linear}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    paddingVertical: 12,
  },
  item: {
    flexDirection: 'column',
    gap: 6,
    paddingVertical: 12,
  },
});

export default TeamMembersLeaves;

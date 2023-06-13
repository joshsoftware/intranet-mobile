import {ActivityIndicator, StyleSheet, View} from 'react-native';
import React, {Fragment} from 'react';

import Linear from '../../../components/seperator/linear';
import LeaveCard from './leaveCard';
import Typography from '../../../components/typography';
import {useTeamMembersLeaves} from '../dashboard.hooks';

const TeamMembersLeaves = () => {
  const {data, isLoading} = useTeamMembersLeaves();

  if (!isLoading && !data.length) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Typography type="header" style={styles.title}>
        Upcoming Team Leaves: Next 20 Days
      </Typography>
      {isLoading ? (
        <ActivityIndicator size="large" />
      ) : (
        data.map((item, index) => (
          <Fragment key={index}>
            {Boolean(index) && <Linear />}
            <LeaveCard {...item} />
          </Fragment>
        ))
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    marginBottom: 72,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    paddingVertical: 12,
  },
});

export default TeamMembersLeaves;

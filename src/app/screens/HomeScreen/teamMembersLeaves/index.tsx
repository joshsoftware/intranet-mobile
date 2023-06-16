import React, {Fragment} from 'react';
import {StyleSheet} from 'react-native';
import Animated, {FadeInDown} from 'react-native-reanimated';

import Linear from '../../../components/seperator/linear';
import LeaveCard from './leaveCard';
import Typography from '../../../components/typography';
import {useTeamMembersLeaves} from '../dashboard.hooks';

const TeamMembersLeaves = () => {
  const {data, isLoading} = useTeamMembersLeaves();

  if (isLoading || !data.length) {
    return null;
  }

  return (
    <Animated.View entering={FadeInDown} style={styles.container}>
      <Typography type="header" style={styles.title}>
        Upcoming Leaves of Team Members
      </Typography>
      <Typography type="secondaryText" style={styles.subTitle}>
        Next 20 days
      </Typography>
      {data.map((item, index) => (
        <Fragment key={index}>
          {Boolean(index) && <Linear />}
          <LeaveCard {...item} />
        </Fragment>
      ))}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
  },
  subTitle: {
    fontSize: 13,
    fontStyle: 'italic',
    fontWeight: '100',
    marginBottom: 5,
  },
});

export default TeamMembersLeaves;

import React, {Fragment} from 'react';
import {StyleSheet} from 'react-native';
import Animated, {FadeInDown} from 'react-native-reanimated';

import Linear from '../../../components/seperator/linear';
import Typography from '../../../components/typography';
import BirthdayCard from './BirthdayCard';
import {useTeamMembersBirthdays} from '../dashboard.hooks';

const TeamMembersBirthdays = () => {
  const {data, isLoading} = useTeamMembersBirthdays();

  if (isLoading || !data.length) {
    return null;
  }

  return (
    <Animated.View entering={FadeInDown} style={styles.container}>
      <Typography type="header" style={styles.title}>
        Upcoming Birthdays Of Employees
      </Typography>
      {data.map((item, index) => (
        <Fragment key={index}>
          {Boolean(index) && <Linear />}
          <BirthdayCard {...item} />
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
    fontWeight: '700',
    marginBottom: 5,
  },
});

export default TeamMembersBirthdays;

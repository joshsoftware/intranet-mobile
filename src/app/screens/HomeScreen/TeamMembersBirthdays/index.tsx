import {ActivityIndicator, StyleSheet, View} from 'react-native';
import React, {Fragment} from 'react';

import Linear from '../../../components/seperator/linear';
import Typography from '../../../components/typography';
import BirthdayCard from './BirthdayCard';
import {useTeamMembersBirthdays} from '../dashboard.hooks';

const TeamMembersBirthdays = () => {
  const {data, isLoading} = useTeamMembersBirthdays();

  if (!isLoading && !data.length) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Typography type="header" style={styles.title}>
        Upcoming Birthdays of Team Members
      </Typography>

      {isLoading ? (
        <ActivityIndicator size="large" />
      ) : (
        data.map((item, index) => (
          <Fragment key={index}>
            {Boolean(index) && <Linear />}
            <BirthdayCard {...item} />
          </Fragment>
        ))
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
    marginBottom: 5,
  },
});

export default TeamMembersBirthdays;

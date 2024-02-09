import React from 'react';
import {StyleSheet, View, Text} from 'react-native';

import colors from '../../../constant/colors';
import {Timesheet} from '../../../constant/icons';

const TimesheetListEmptyComponent: React.FC = () => {
  return (
    <View style={styles.container}>
      <Timesheet
        height={100}
        width={100}
        fill={colors.PRIMARY}
        style={styles.icon}
      />
      <Text style={styles.text}>No Timesheets Found!</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: colors.PRIMARY,
    fontWeight: 'bold',
  },
  icon: {
    marginTop: 20,
  },
});

export default TimesheetListEmptyComponent;

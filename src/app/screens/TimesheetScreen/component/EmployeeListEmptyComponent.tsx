import React from 'react';
import {StyleSheet, View, Text} from 'react-native';

import colors from '../../../constant/colors';
import {Employees} from '../../../constant/icons';

const EmployeeListEmptyComponent = () => {
  return (
    <View style={styles.container}>
      <Employees
        height={50}
        width={50}
        fill={colors.PRIMARY}
        style={styles.icon}
      />
      <Text style={styles.text}>No Employees Found!</Text>
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
  },
  icon: {
    marginTop: 20,
  },
});

export default EmployeeListEmptyComponent;

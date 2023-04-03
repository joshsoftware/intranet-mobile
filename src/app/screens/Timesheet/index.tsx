import React from 'react';
import {View, StyleSheet} from 'react-native';

import ManagerScreen from './views/managerView';
import TimesheetList from './views/timesheetListView';
import FloatingActionButton from '../../components/button/floatingActionButton';

import sizes from '../../constant/sizes';

const TimesheetScreen = () => {
  const isManager = false;

  return (
    <>
      <View style={styles.container}>
        {isManager ? <ManagerScreen /> : <TimesheetList />}
      </View>
      <FloatingActionButton onPress={() => undefined} />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: sizes.CONTAINER_HORIZONTAL_MARGIN,
  },
});

export default TimesheetScreen;

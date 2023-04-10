import React, {useCallback, useState} from 'react';
import {View, StyleSheet} from 'react-native';

import ManagerScreen from './views/managerView';
import TimesheetList from './views/timesheetListView';
import FloatingActionButton from '../../components/button/floatingActionButton';
import CreateTimesheet from './views/createTimesheetView';

import sizes from '../../constant/sizes';

const TimesheetScreen = () => {
  const isManager = false;

  const [shouldShowModal, setShouldShowModal] = useState<boolean>(false);

  const toggleModal = useCallback(() => {
    setShouldShowModal(v => !v);
  }, []);

  return (
    <>
      <View style={styles.container}>
        {isManager ? <ManagerScreen /> : <TimesheetList />}
      </View>
      <FloatingActionButton onPress={toggleModal} />

      <CreateTimesheet toggleModal={toggleModal} isVisible={shouldShowModal} />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    marginHorizontal: sizes.CONTAINER_HORIZONTAL_MARGIN,
  },
});

export default TimesheetScreen;

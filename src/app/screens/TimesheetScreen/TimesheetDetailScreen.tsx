import React, {useState} from 'react';
import {StyleSheet, View, ScrollView} from 'react-native';

import Header from '../../components/header';
import DetailRow from '../../components/DetailRow';

import {TimesheetDetailScreenNavigationProp} from '../../navigation/types';
import {Timesheet} from './interface';
import colors from '../../constant/colors';
import Typography from '../../components/typography';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Button from '../../components/button';
import TimesheetActionModal, {
  TModalState,
} from './component/TimesheetActionModal';

function TimesheetDetailScreen({route}: TimesheetDetailScreenNavigationProp) {
  const insets = useSafeAreaInsets();
  const params = route.params;

  const [modalState, setModalState] = useState<TModalState>(null);

  const timesheetData = JSON.parse(params.timesheetData) as Timesheet;

  return (
    <View style={[styles.container, {paddingBottom: insets.bottom}]}>
      <Header type="secondary" title="Timesheet" />

      <ScrollView style={[styles.screenView]}>
        <View style={styles.cardContainer}>
          <DetailRow label="Employee Name" value={'-'} />
          <DetailRow label="Date" value={timesheetData.date} />
          <DetailRow
            label="Work in hours"
            value={timesheetData.work_in_hours}
          />
          <DetailRow label="Project" value={'-'} />
        </View>

        <View style={styles.cardContainer}>
          <Typography type="label">Description</Typography>
          <Typography type="text">{timesheetData.description}</Typography>
        </View>

        <View style={styles.buttonContainer}>
          <Button
            title="Reject"
            type="danger"
            onPress={() => setModalState('reject')}
          />
          <Button
            title="Approve"
            type="success"
            onPress={() => setModalState('approve')}
          />
        </View>
      </ScrollView>

      <TimesheetActionModal
        modalState={modalState}
        closeModal={() => setModalState(null)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.SECONDARY_BACKGROUND,
  },
  screenView: {
    padding: 16,
    gap: 10,
  },
  cardContainer: {
    backgroundColor: colors.WHITE,
    padding: 16,
    borderRadius: 10,
    marginBottom: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 50,
  },
});

export default TimesheetDetailScreen;

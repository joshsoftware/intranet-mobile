import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  ActivityIndicator,
  ScrollView,
} from 'react-native';

import Header from '../../../components/header';
import Typography from '../../../components/typography';
import DetailRow from '../../../components/DetailRow';
import {useLeaveDetail} from '../leave.hooks';

import colors from '../../../constant/colors';
import {LeaveDetailScreenNavigationProp} from '../../../navigation/types';

function LeaveDetailScreen({route}: LeaveDetailScreenNavigationProp) {
  const {leaveID} = route.params;

  const {data, isLoading} = useLeaveDetail(leaveID);

  const {
    emp_name: empName,
    leave_from: leaveFrom,
    leave_to: leaveTo,
    leave_type: leaveType,
    leave_approver: leaveApprover,
    leave_note: leaveNote,
    leave_reason: leaveReason,
    leave_status: leaveStatus,
  } = data || {};

  if (isLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <Header type="secondary" title="Leave" isRightButtonVisible={false} />
        <View style={styles.centerContainer}>
          <ActivityIndicator size="large" color={colors.PRIMARY} />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Header type="secondary" title="Leave" isRightButtonVisible={false} />

      <ScrollView style={styles.screenview}>
        <View style={styles.titleContainer}>
          <Typography style={styles.name}>{empName}</Typography>

          <View style={styles.dateRow}>
            <Typography type="text">Date: </Typography>
            <Typography type="secondaryText" style={styles.paddingLeft}>
              From
            </Typography>
            <Typography type="text"> {leaveFrom}</Typography>
            <Typography type="secondaryText" style={styles.paddingLeft}>
              To
            </Typography>
            <Typography type="text"> {leaveTo}</Typography>
          </View>
        </View>

        <View style={styles.cardContainer}>
          <DetailRow label="Leave Approver" value={leaveApprover} />
          <DetailRow label="Leave Type" value={leaveType} />
          <DetailRow label="Note" value={leaveNote} />
          <DetailRow label="Status" value={leaveStatus} />
          <DetailRow label="Reason" value={leaveReason} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.SECONDARY_BACKGROUND,
  },
  screenview: {
    flex: 1,
    paddingHorizontal: 16,
  },
  titleContainer: {
    paddingVertical: 24,
  },
  dateRow: {
    flexDirection: 'row',
  },
  name: {
    color: colors.SECONDARY,
    fontSize: 17,
    fontWeight: 'bold',
  },
  paddingLeft: {
    paddingLeft: 10,
    fontSize: 14,
  },
  cardContainer: {
    backgroundColor: colors.WHITE,
    padding: 16,
    borderRadius: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default LeaveDetailScreen;

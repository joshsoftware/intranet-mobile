import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  ActivityIndicator,
  ScrollView,
} from 'react-native';

import Header from '../components/header';
import Typography from '../components/typography';
import {useLeaveDetail} from './LeaveScreen/leave.hooks';

import colors from '../constant/colors';
import {LeaveDetailScreenNavigationProp} from '../navigation/types';

function LeaveDetailScreen({route}: LeaveDetailScreenNavigationProp) {
  const {leaveID} = route.params;

  const {data, isLoading} = useLeaveDetail(leaveID);

  const {
    emp_name,
    leave_from,
    leave_to,
    leave_type,
    leave_approver,
    leave_note,
    leave_reason,
    leave_status,
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
          <Typography style={styles.name}>{emp_name}</Typography>

          <View style={styles.dateRow}>
            <Typography type="text">Date: </Typography>
            <Typography type="secondaryText" style={styles.paddingLeft}>
              From
            </Typography>
            <Typography type="text"> {leave_from}</Typography>
            <Typography type="secondaryText" style={styles.paddingLeft}>
              To
            </Typography>
            <Typography type="text"> {leave_to}</Typography>
          </View>
        </View>

        <View style={styles.cardContainer}>
          <View style={styles.row}>
            <Typography type="secondaryText">Leave Approver </Typography>
            <Typography type="text">{leave_approver}</Typography>
          </View>
          <View style={styles.row}>
            <Typography type="secondaryText">Leave Type </Typography>
            <Typography type="text">{leave_type}</Typography>
          </View>
          <View style={styles.row}>
            <Typography type="secondaryText">Note </Typography>
            <Typography type="text">{leave_note || '-'}</Typography>
          </View>
          <View style={styles.row}>
            <Typography type="secondaryText">Status </Typography>
            <Typography type="text">{leave_status || '-'}</Typography>
          </View>
          <View style={styles.row}>
            <Typography type="secondaryText">Reason </Typography>
            <Typography type="text">{leave_reason || '-'}</Typography>
          </View>
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

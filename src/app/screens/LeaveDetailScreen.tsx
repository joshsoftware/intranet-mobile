import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  ActivityIndicator,
} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';

import Header from '../components/header';
import colors from '../constant/colors';
import {LeaveDetailScreenNavigationProp} from '../navigation/types';
import {useLeaveDetail} from './LeaveScreen/leave.hooks';

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
          <Text style={styles.name}>{emp_name}</Text>

          <View style={styles.dateRow}>
            <Text style={styles.textValue}>Date: </Text>
            <Text style={[styles.textTitle, styles.paddingLeft]}>From </Text>
            <Text style={styles.textValue}>{leave_from}</Text>
            <Text style={[styles.textTitle, styles.paddingLeft]}>To </Text>
            <Text style={styles.textValue}>{leave_to}</Text>
          </View>
        </View>

        <View style={styles.cardContainer}>
          <View style={styles.row}>
            <Text style={styles.textTitle}>Leave Approver </Text>
            <Text style={styles.textValue}>{leave_approver}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.textTitle}>Leave Type </Text>
            <Text style={styles.textValue}>{leave_type}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.textTitle}>Note </Text>
            <Text style={styles.textValue}>{leave_note || '-'}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.textTitle}>Status </Text>
            <Text style={styles.textValue}>{leave_status || '-'}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.textTitle}>Reason </Text>
            <Text style={styles.textValue}>{leave_reason || '-'}</Text>
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
  textTitle: {
    color: colors.SECONDARY_TEXT,
  },
  textValue: {
    color: colors.SECONDARY,
    fontSize: 14,
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

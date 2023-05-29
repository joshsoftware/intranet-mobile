import React, {memo} from 'react';
import {StyleSheet, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

import Touchable from '../../../components/touchable';
import Typography from '../../../components/typography';

import {dateFormate} from '../../../utils/date';

import colors from '../../../constant/colors';
import {Arrow} from '../../../constant/icons';
import {LEAVE_DETAIL_SCREEN} from '../../../constant/screenNames';
import {RootStackParamList} from '../../../navigation/types';
import {ILeaveListItemData} from '../interface';

function LeaveListItem({
  emp_name: empName,
  leave_id: leaveID,
  leave_from: leaveFrom,
  leave_to: leaveTo,
  leave_type: leaveType,
  days,
}: ILeaveListItemData) {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const navigateToDetail = () => {
    navigation.navigate(LEAVE_DETAIL_SCREEN, {leaveID});
  };

  return (
    <Touchable type="native" onPress={navigateToDetail}>
      <View style={styles.contanier}>
        <Typography type="header" style={styles.name}>
          {empName}
        </Typography>

        <View style={styles.row}>
          <View style={styles.column}>
            <Typography type="text" style={styles.font12}>
              {dateFormate(leaveFrom)}
            </Typography>
            <Typography type="secondaryText" style={styles.font12}>
              Leave From
            </Typography>
          </View>

          <View style={styles.column}>
            <Typography type="text" style={styles.font12}>
              {dateFormate(leaveTo)}
            </Typography>
            <Typography type="secondaryText" style={styles.font12}>
              Leave To
            </Typography>
          </View>

          <View style={styles.column}>
            <Typography type="text" style={styles.font12}>
              {days}
            </Typography>
            <Typography type="secondaryText" style={styles.font12}>
              Days
            </Typography>
          </View>

          <View style={styles.column}>
            <Typography type="text" style={styles.font12}>
              {leaveType}
            </Typography>
            <Typography type="secondaryText" style={styles.font12}>
              Leave Type
            </Typography>
          </View>
          <Arrow />
        </View>
      </View>
    </Touchable>
  );
}

const styles = StyleSheet.create({
  contanier: {
    padding: 16,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.SECONDARY_DIVIDER,
  },
  name: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 9,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  column: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  font12: {
    fontSize: 12,
  },
});

export default memo(LeaveListItem);

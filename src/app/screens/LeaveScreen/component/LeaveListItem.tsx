import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import Touchable from '../../../components/touchable';
import Typography from '../../../components/typography';
import colors from '../../../constant/colors';
import {Arrow} from '../../../constant/icons';
import {LEAVE_DETAIL_SCREEN} from '../../../constant/screenNames';
import {RootStackParamList} from '../../../navigation/types';
import {ILeaveListItemData} from '../interface';

function LeaveListItem({
  emp_name,
  leave_id,
  leave_from,
  leave_to,
  leave_type,
  days,
}: ILeaveListItemData) {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const navigateToDetail = () => {
    navigation.navigate(LEAVE_DETAIL_SCREEN, {leaveID: leave_id});
  };

  return (
    <Touchable type="native" onPress={navigateToDetail}>
      <View style={styles.contanier}>
        <Typography type="header" style={styles.name}>
          {emp_name}
        </Typography>

        <View style={styles.row}>
          <View style={styles.column}>
            <Typography type="text" style={styles.font12}>
              {leave_from}
            </Typography>
            <Typography type="secondaryText" style={styles.font12}>
              Leave From
            </Typography>
          </View>

          <View style={styles.column}>
            <Typography type="text" style={styles.font12}>
              {leave_to}
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
              {leave_type}
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

export default LeaveListItem;

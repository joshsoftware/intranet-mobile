import React, {memo} from 'react';
import {StyleSheet, View} from 'react-native';

import Touchable from '../../../components/touchable';
import Typography from '../../../components/typography';

import {navigate} from '../../../navigation';

import {Arrow} from '../../../constant/icons';
import {USER_TIMESHEET} from '../../../constant/screenNames';

type Props = {
  name: string;
  email: string;
  userId: string;
};

const EmployeeCard = ({name, email, userId}: Props) => {
  const handleNavigation = () =>
    navigate(USER_TIMESHEET, {name, email, user_id: userId});

  return (
    <Touchable type="native" onPress={handleNavigation}>
      <View style={styles.main}>
        <View>
          <Typography type="header" style={styles.empName}>
            {name}
          </Typography>
          <Typography type="description">{email}</Typography>
        </View>
        <Arrow />
      </View>
    </Touchable>
  );
};

const styles = StyleSheet.create({
  empName: {
    paddingBottom: 7,
  },
  main: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
});

export default memo(EmployeeCard);

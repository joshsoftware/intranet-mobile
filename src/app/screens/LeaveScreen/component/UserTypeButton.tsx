import {StyleSheet, View} from 'react-native';
import React, {memo} from 'react';

import Touchable from '../../../components/touchable';
import Typography from '../../../components/typography';

import colors from '../../../constant/colors';

type Props = {
  value: 'active' | 'all';
  onChange: Function;
};

const UserTypeButton: React.FC<Props> = ({value, onChange}) => {
  const isActiveUsers = value === 'active';

  return (
    <View style={styles.container}>
      <Touchable
        type="opacity"
        onPress={() => onChange('all')}
        style={[styles.button, !isActiveUsers ? styles.activeButton : null]}>
        <Typography style={!isActiveUsers ? styles.activeText : {}}>
          All Users
        </Typography>
      </Touchable>
      <Touchable
        type="opacity"
        onPress={() => onChange('active')}
        style={[styles.button, isActiveUsers ? styles.activeButton : null]}>
        <Typography style={isActiveUsers ? styles.activeText : {}}>
          Active Users
        </Typography>
      </Touchable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    borderWidth: 1,
    borderRadius: 5,
    borderColor: colors.PRIMARY,
  },
  button: {
    flex: 1 / 2,
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: 10,
  },
  activeButton: {
    backgroundColor: colors.PRIMARY,
  },
  activeText: {
    color: colors.WHITE,
  },
});

export default memo(UserTypeButton);

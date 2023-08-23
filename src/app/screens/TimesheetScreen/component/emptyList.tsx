import React, {memo} from 'react';
import {StyleSheet, View} from 'react-native';

import Typography from '../../../components/typography';
import {Timesheet} from '../../../constant/icons';
import colors from '../../../constant/colors';

interface IProps {
  message: string;
  showIcon: boolean;
}

const EmptyList = (props: IProps) => {
  const {message, showIcon} = props;

  return (
    <View style={styles.container}>
      {showIcon && (
        <Timesheet
          height={100}
          width={100}
          fill={colors.PRIMARY}
          style={styles.icon}
        />
      )}
      <Typography style={styles.message} type="label">
        {message}
      </Typography>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  message: {
    color: colors.PRIMARY,
  },
  icon: {
    marginTop: 50,
  },
});

export default memo(EmptyList);

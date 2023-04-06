import React, {memo} from 'react';
import {StyleSheet, View, ViewStyle} from 'react-native';

import Linear from '../../../components/seperator/linear';
import TimesheetHeaderItem from './listHeaderItem';

import colors from '../../../constant/colors';

type Props = {
  style?: ViewStyle;
  headerData: Array<{
    label: string;
    value: string | number;
  }>;
};

const ListHeader = ({style, headerData}: Props) => (
  <>
    <View style={[styles.listStyle, style]}>
      {headerData.map((item, index) => (
        <React.Fragment key={item.label}>
          <TimesheetHeaderItem
            headerTextStyle={styles.headerText}
            descTextStyle={styles.textStyle}
            style={styles.item}
            label={item.label}
            value={item.value.toString()}
          />
          {index !== headerData.length - 1 ? <Linear /> : <View />}
        </React.Fragment>
      ))}
    </View>
    <Linear style={styles.divider} />
  </>
);

const styles = StyleSheet.create({
  item: {
    alignSelf: 'flex-start',
    flex: 1 / 3,
  },
  textStyle: {
    fontSize: 10,
    lineHeight: 12,
    textAlign: 'center',
    marginBottom: 5,
  },
  divider: {
    marginBottom: 10,
  },
  headerText: {
    fontSize: 10,
    lineHeight: 12,
    textAlign: 'center',
    marginBottom: 5,
    color: colors.SECONDARY,
  },
  listStyle: {
    width: '100%',
    flexDirection: 'row',
    marginVertical: 20,
    justifyContent: 'space-around',
  },
});

export default memo(ListHeader);

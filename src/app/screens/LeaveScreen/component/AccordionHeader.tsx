import React from 'react';
import {StyleSheet, View} from 'react-native';
import * as Animatable from 'react-native-animatable';

import Typography from '../../../components/typography';

import {dateFormate} from '../../../utils/date';

import {ArrowDown, ArrowUp} from '../../../constant/icons';
import {ILeaveDetailData} from '../interface';

interface AccordionHeaderProps {
  content: ILeaveDetailData;
  isActive: boolean;
}

export const AccordionHeader = ({content, isActive}: AccordionHeaderProps) => {
  const {leave_from, leave_to} = content;

  return (
    <Animatable.View
      duration={400}
      style={[styles.header, isActive ? {} : styles.inactiveHeader]}>
      <View style={styles.row}>
        <Typography type="text">Date: </Typography>
        <Typography type="secondaryText" style={styles.secondaryText}>
          From
        </Typography>
        <Typography type="text">{dateFormate(leave_from)}</Typography>
        <Typography type="secondaryText" style={styles.secondaryText}>
          To
        </Typography>
        <Typography type="text">{dateFormate(leave_to)}</Typography>
      </View>
      {isActive ? <ArrowUp /> : <ArrowDown />}
    </Animatable.View>
  );
};

const styles = StyleSheet.create({
  header: {
    minHeight: 30,
    paddingHorizontal: 16,
    paddingVertical: 9,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    backgroundColor: '#E6EDFF',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  inactiveHeader: {
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  secondaryText: {
    paddingLeft: 10,
    paddingRight: 4,
    fontSize: 14,
  },
  row: {
    flexDirection: 'row',
  },
});
export default React.memo(AccordionHeader);

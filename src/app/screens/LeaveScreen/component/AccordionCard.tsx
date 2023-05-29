import React from 'react';
import {StyleSheet, View} from 'react-native';
import * as Animatable from 'react-native-animatable';

import Typography from '../../../components/typography';
import DetailRow from '../../ProfileScreen/component/DetailRow';

import {ArrowDown, ArrowUp} from '../../../constant/icons';
import {ILeaveDetailData} from '../interface';

export const AccordionContent = React.memo((content: ILeaveDetailData) => {
  const {leave_type, leave_approver, leave_note, leave_reason, leave_status} =
    content || {};

  return (
    <Animatable.View duration={400} style={styles.contentContainer}>
      <DetailRow label="Leave Approver" value={leave_approver} />
      <DetailRow label="Leave Type" value={leave_type} />
      <DetailRow label="Note" value={leave_note} />
      <DetailRow label="Status" value={leave_status} />
      <DetailRow label="Reason" value={leave_reason} />
    </Animatable.View>
  );
});

interface AccordionHeaderProps {
  content: ILeaveDetailData;
  isActive: boolean;
}

export const AccordionHeader = React.memo(
  ({content, isActive}: AccordionHeaderProps) => {
    const {leave_from, leave_to} = content;

    return (
      <Animatable.View
        duration={400}
        style={[styles.header, isActive ? {} : styles.inactiveHeader]}>
        <View style={styles.row}>
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
        {isActive ? <ArrowUp /> : <ArrowDown />}
      </Animatable.View>
    );
  },
);

const styles = StyleSheet.create({
  contentContainer: {
    paddingHorizontal: 10,
    paddingVertical: 9,
  },
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
  paddingLeft: {
    paddingLeft: 10,
    fontSize: 14,
  },
  row: {
    flexDirection: 'row',
  },
});

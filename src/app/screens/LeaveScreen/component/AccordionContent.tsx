import React from 'react';
import {StyleSheet} from 'react-native';
import * as Animatable from 'react-native-animatable';

import DetailRow from '../../../components/DetailRow';

import {ILeaveDetailData} from '../interface';

export const AccordionContent = (content: ILeaveDetailData) => {
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
};

const styles = StyleSheet.create({
  contentContainer: {
    paddingHorizontal: 10,
    paddingVertical: 9,
  },
});

export default React.memo(AccordionContent);

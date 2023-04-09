import React, {memo} from 'react';
import {SectionList, StyleSheet, ViewStyle} from 'react-native';

import Typography from '../typography';
import UserTimesheet from './userTimesheet';
import Linear from '../seperator/linear';

interface Timesheet {
  timesheet_id: string;
  date: string;
  work_in_hours: string;
  description: string;
}

type Props = {
  style?: ViewStyle;
  data: Array<{title: string; data: Timesheet[]}>;
};

const seperator = () => <Linear style={styles.seperator} />;

const footer = () => <Linear style={styles.footer} />;

const sectionHeader = ({section}: {section: {title: string}}) => (
  <Typography>{section.title}</Typography>
);

const renderItem = ({item}: {item: Timesheet}) => <UserTimesheet data={item} />;

const SectionListTimesheet = ({data, style}: Props) => (
  <SectionList
    sections={data}
    keyExtractor={(item, index) => item.timesheet_id + index}
    renderItem={renderItem}
    renderSectionHeader={sectionHeader}
    renderSectionFooter={seperator}
    style={style}
    ItemSeparatorComponent={seperator}
    ListFooterComponent={footer}
  />
);

const styles = StyleSheet.create({
  footer: {
    paddingBottom: 200,
    borderWidth: 0,
  },
  seperator: {
    marginVertical: 10,
  },
});
export default memo(SectionListTimesheet);

import React, {memo} from 'react';
import {SectionList, StyleSheet, ViewStyle} from 'react-native';

import Typography from '../typography';
import UserTimesheet from './userTimesheet';
import Linear from '../seperator/linear';

import {Timesheet} from '../../interfaces/timesheet';

type Props = {
  style?: ViewStyle;
  data: Array<{title: string; data: Timesheet[]}>;
};

const Seperator = () => <Linear style={styles.seperator} />;

const Footer = () => <Linear style={styles.footer} />;

const SectionHeader = ({section}: {section: {title: string}}) => (
  <Typography>{section.title}</Typography>
);

const RenderItem = ({item}: {item: Timesheet}) => <UserTimesheet data={item} />;

const SectionListTimesheet = ({data, style}: Props) => (
  <SectionList
    sections={data}
    keyExtractor={(item, index) => item.timesheet_id + index}
    renderItem={RenderItem}
    renderSectionHeader={SectionHeader}
    renderSectionFooter={Seperator}
    style={style}
    ItemSeparatorComponent={Seperator}
    ListFooterComponent={Footer}
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

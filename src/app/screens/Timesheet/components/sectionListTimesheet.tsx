import React, {memo, useCallback} from 'react';
import {SectionList, StyleSheet, ViewStyle} from 'react-native';

import Typography from '../../../components/typography';
import TimesheetItem from './timesheetItem';
import Linear from '../../../components/seperator/linear';

import {Timesheet} from '../interfaces';

type Props = {
  style?: ViewStyle;
  timesheetListData: Array<{
    title: string;
    data: Timesheet[];
  }>;
  onEdit: Function;
  onDelete: Function;
};

const seperator = () => <Linear style={styles.seperator} />;

const footer = () => <Linear style={styles.footer} />;

const sectionHeader = ({section}: {section: {title: string}}) => (
  <Typography style={styles.title}>{section.title}</Typography>
);

const SectionListTimesheet = ({
  timesheetListData,
  onEdit,
  onDelete,
  style,
}: Props) => {
  const renderItem = useCallback(
    ({item, section}: {item: Timesheet; section: {title: string}}) => (
      <TimesheetItem
        timesheetData={item}
        onEdit={onEdit}
        onDelete={onDelete}
        title={section.title}
      />
    ),
    [onDelete, onEdit],
  );

  return (
    <SectionList
      sections={timesheetListData}
      keyExtractor={(item, index) => item.timesheet_id + index}
      renderItem={renderItem}
      renderSectionHeader={sectionHeader}
      renderSectionFooter={seperator}
      extraData={timesheetListData}
      style={style}
      ItemSeparatorComponent={seperator}
      ListFooterComponent={footer}
      showsVerticalScrollIndicator={false}
    />
  );
};

const styles = StyleSheet.create({
  title: {
    marginVertical: 10,
  },
  footer: {
    borderWidth: 0,
    paddingBottom: 100,
  },
  seperator: {
    marginVertical: 10,
  },
});
export default memo(SectionListTimesheet);

import React, {memo, useCallback} from 'react';
import {
  SectionList,
  SectionListData,
  SectionListProps,
  SectionListRenderItemInfo,
  StyleSheet,
  View,
} from 'react-native';

import Typography from '../../../components/typography';
import TimesheetItem from './timesheetItem';
import Linear from '../../../components/seperator/linear';
import EmptyList from './emptyList';

import {Timesheet} from '../interface';

type Props = SectionListProps<any, any> & {
  timesheetListData: Array<{
    title: string;
    data: Timesheet[];
  }>;
  onEdit: Function;
  onDelete: Function;
  emptyListMessage?: string;
  isDeleteVisible?: boolean;
};

const footer = () => <View style={styles.footer} />;

const sectionHeader = ({
  section,
}: {
  section: SectionListData<Timesheet, {title: string}>;
}) => <Typography style={styles.title}>{section.title}</Typography>;

const SectionListTimesheet = ({
  timesheetListData,
  onEdit,
  onDelete,
  isDeleteVisible = true,
  emptyListMessage,
  ...props
}: Props) => {
  const renderItem = useCallback(
    ({item, section}: SectionListRenderItemInfo<Timesheet>) => (
      <TimesheetItem
        timesheetData={item}
        onEdit={onEdit}
        onDelete={onDelete}
        title={section.title}
        isDeleteVisible={isDeleteVisible}
      />
    ),
    [isDeleteVisible, onDelete, onEdit],
  );

  const listEmptyComponent = useCallback(
    () => <EmptyList message={emptyListMessage} />,
    [emptyListMessage],
  );

  return (
    <SectionList
      {...props}
      sections={timesheetListData}
      keyExtractor={(item, index) => item.timesheet_id + index}
      renderItem={renderItem}
      renderSectionHeader={sectionHeader}
      style={styles.list}
      ListFooterComponent={footer}
      ItemSeparatorComponent={Linear}
      showsVerticalScrollIndicator={false}
      ListEmptyComponent={listEmptyComponent}
    />
  );
};

const styles = StyleSheet.create({
  list: {
    paddingHorizontal: 16,
  },
  title: {
    marginTop: 20,
    marginBottom: 4,
  },
  footer: {
    paddingBottom: 100,
  },
});

export default memo(SectionListTimesheet);

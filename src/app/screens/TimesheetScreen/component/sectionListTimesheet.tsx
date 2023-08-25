import React, {memo, useCallback, useState} from 'react';
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
import TimesheetActionModal from './TimesheetActionModal';
import LoadingSpinner from '../../../components/LoadingSpinner';
import useIsManagement from '../../../hooks/useIsManagement';

import {Timesheet} from '../interface';
import colors from '../../../constant/colors';

type Props = SectionListProps<any, any> & {
  onEdit: Function;
  onDelete: Function;
  emptyListMessage: string;
  showEmptyListIcon: boolean;
  isDeleteVisible?: boolean;
  isLoading: boolean;
};

const footer = () => <View style={styles.footer} />;

const sectionHeader = ({
  section,
}: {
  section: SectionListData<Timesheet, {title: string}>;
}) => (
  <View style={styles.sectionHeaderContainer}>
    <Typography style={styles.title}>{section.title}</Typography>
  </View>
);

const SectionListTimesheet = ({
  onEdit,
  onDelete,
  isDeleteVisible = true,
  showEmptyListIcon,
  emptyListMessage,
  isLoading,
  ...props
}: Props) => {
  const [actionTimesheetData, setActionTimesheetData] =
    useState<Timesheet | null>(null);

  const isManagementRole = useIsManagement();

  const showActionModal = (timesheetData: Timesheet) => {
    setActionTimesheetData(timesheetData);
  };

  const renderItem = useCallback(
    ({item, section}: SectionListRenderItemInfo<Timesheet>) => (
      <TimesheetItem
        touchable={isManagementRole}
        showActionModal={showActionModal}
        timesheetData={item}
        onEdit={onEdit}
        onDelete={onDelete}
        title={section.title}
        isDeleteVisible={isDeleteVisible}
      />
    ),
    [isDeleteVisible, onDelete, onEdit, isManagementRole],
  );

  const listEmptyComponent = useCallback(
    () => <EmptyList message={emptyListMessage} showIcon={showEmptyListIcon} />,
    [emptyListMessage, showEmptyListIcon],
  );

  if (isLoading) {
    return <LoadingSpinner />;
  }
  const closeActionModal = () => {
    setActionTimesheetData(null);
  };

  return (
    <>
      <SectionList
        {...props}
        keyExtractor={(item, index) => item.timesheet_id + index}
        renderItem={renderItem}
        renderSectionHeader={sectionHeader}
        style={styles.list}
        ListFooterComponent={footer}
        ItemSeparatorComponent={Linear}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={listEmptyComponent}
      />
      {isManagementRole && (
        <TimesheetActionModal
          timesheetData={actionTimesheetData}
          closeModal={closeActionModal}
        />
      )}
    </>
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
  sectionHeaderContainer: {
    backgroundColor: colors.WHITE,
  },
});

export default memo(SectionListTimesheet);

import React, {useState} from 'react';
import {View, TouchableOpacity, StyleSheet, ScrollView} from 'react-native';
import * as Animatable from 'react-native-animatable';
import Accordion from 'react-native-collapsible/Accordion';

import TabScreen from './TabScreen';
import Typography from '../../../components/typography';
import DetailRow from '../../ProfileScreen/component/DetailRow';
import {useEmployeeLeaveList} from '../leave.hooks';

import {startOfMonth, todaysDate} from '../../../utils/date';

import {ArrowDown, ArrowUp} from '../../../constant/icons';
import colors from '../../../constant/colors';
import {ILeaveDetailData, ILeaveFilters} from '../interface';

interface Props {
  route: string;
}

function EmployeeTabScreen({route}: Props) {
  const [activeSections, setActiveSections] = useState<number[]>([]);
  const [filters, setFilters] = useState<ILeaveFilters>({
    leave_type: '',
    pending_flag: route === 'pending' ? true : false,
    active_or_all_flags: 'active',
    from: startOfMonth,
    to: todaysDate,
    page_no: 1,
  });

  const {
    data,
    isLoading,
    isError,
    error,
    refetch,
    isRefetching,
    isRefetchError,
  } = useEmployeeLeaveList(filters);

  const renderHeader = (
    content: ILeaveDetailData,
    _index: number,
    isActive: boolean,
  ) => {
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
  };

  const renderContent = (content: ILeaveDetailData) => {
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

  return (
    <TabScreen
      isManagement={false}
      filters={filters}
      isLoading={isLoading}
      isError={isError}
      error={error}
      refetch={refetch}
      isRefetching={isRefetching}
      isRefetchError={isRefetchError}
      setFilters={setFilters}
      noLeaves={data?.length === 0}>
      <ScrollView>
        <Accordion
          activeSections={activeSections}
          sections={data}
          renderHeader={renderHeader}
          sectionContainerStyle={styles.accordionSectionContainer}
          renderContent={renderContent}
          onChange={setActiveSections}
          underlayColor="#E6EDFF"
          touchableComponent={TouchableOpacity}
        />
      </ScrollView>
    </TabScreen>
  );
}

const styles = StyleSheet.create({
  accordionSectionContainer: {
    backgroundColor: colors.WHITE,
    elevation: 5,
    marginBottom: 16,
    borderRadius: 10,
    marginHorizontal: 16,
  },
  contentContainer: {
    paddingHorizontal: 10,
    paddingVertical: 9,
  },
  paddingLeft: {
    paddingLeft: 10,
    fontSize: 14,
  },
  row: {
    flexDirection: 'row',
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
});

export default EmployeeTabScreen;

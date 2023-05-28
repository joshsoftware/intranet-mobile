import React, {useState, useContext} from 'react';
import {
  ActivityIndicator,
  RefreshControl,
  ScrollView,
  StyleSheet,
  View,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import Accordion from 'react-native-collapsible/Accordion';
import * as Animatable from 'react-native-animatable';

import Typography from '../../../components/typography';
import LeaveListItem from './LeaveListItem';
import DetailRow from '../../ProfileScreen/component/DetailRow';

import UserContext from '../../../context/user.context';
import {isManagement} from '../../../utils/user';

import colors from '../../../constant/colors';
import {ArrowDown, ArrowUp} from '../../../constant/icons';
import {ILeaveDetailData, ILeaveListItemData} from '../interface';

interface Props {
  data: ILeaveListItemData[] | ILeaveDetailData[];
  isLoading: boolean;
  isRefetching: boolean;
  refetch: () => void;
  isError: boolean;
  error?: string;
  fetchNextPage: () => void;
  isFetchingNextPage: boolean;
}

function RenderScreenContent({
  data,
  isLoading,
  isError,
  error,
  refetch,
  isRefetching,
  fetchNextPage,
  isFetchingNextPage,
}: Props) {
  const [activeSections, setActiveSections] = useState<number[]>([]);

  const [userContextValue] = useContext(UserContext);
  const userRole = userContextValue?.userData.role || 'Employee';

  if (isLoading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color={colors.PRIMARY} />
      </View>
    );
  }

  if (isError) {
    return (
      <ScrollView
        contentContainerStyle={styles.centerContainer}
        refreshControl={
          <RefreshControl refreshing={isRefetching} onRefresh={refetch} />
        }>
        <Typography type="error">{error || ''}</Typography>
      </ScrollView>
    );
  }

  if (!data) {
    return (
      <View style={styles.centerContainer}>
        <Typography type="error">Could not get leaves!</Typography>
      </View>
    );
  }

  if (data.length === 0) {
    return (
      <View style={styles.centerContainer}>
        <Typography type="secondaryText">No Leaves!</Typography>
      </View>
    );
  }

  if (isManagement(userRole)) {
    const leaveList = data as ILeaveListItemData[];

    return (
      <FlatList
        data={leaveList}
        refreshControl={
          <RefreshControl refreshing={isRefetching} onRefresh={refetch} />
        }
        onEndReached={fetchNextPage}
        ListFooterComponent={
          isFetchingNextPage ? (
            <ActivityIndicator
              style={styles.paddingVertical}
              color={colors.PRIMARY}
            />
          ) : null
        }
        renderItem={({item}) => <LeaveListItem {...item} />}
      />
    );
  }

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

  const leavesList = data as ILeaveDetailData[];

  // Extra Props to Accordion are passed to underlying flatlist
  // when renderAsFlatList is true
  return (
    <ScrollView>
      <Accordion
        activeSections={activeSections}
        sections={leavesList}
        renderHeader={renderHeader}
        sectionContainerStyle={styles.accordionSectionContainer}
        renderContent={renderContent}
        onChange={setActiveSections}
        underlayColor="#E6EDFF"
        touchableComponent={TouchableOpacity}
        renderAsFlatList={false}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentContainer: {
    paddingHorizontal: 10,
    paddingVertical: 9,
  },
  paddingLeft: {
    paddingLeft: 10,
    fontSize: 14,
  },
  paddingVertical: {
    paddingVertical: 10,
  },
  accordionSectionContainer: {
    backgroundColor: colors.WHITE,
    elevation: 5,
    marginBottom: 16,
    borderRadius: 10,
    marginHorizontal: 16,
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

export default RenderScreenContent;

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

import Typography from '../../../components/typography';
import LeaveListItem from './LeaveListItem';
import {AccordionContent, AccordionHeader} from './AccordionCard';
import {useLastCall} from '../leave.hooks';

import UserContext from '../../../context/user.context';
import {isManagement} from '../../../utils/user';

import colors from '../../../constant/colors';
import {ILeaveDetailData, ILeaveListItemData} from '../interface';

const renderContent = (content: ILeaveDetailData) => {
  return <AccordionContent {...content} />;
};

const renderHeader = (
  content: ILeaveDetailData,
  _index: number,
  isActive: boolean,
) => {
  return <AccordionHeader content={content} isActive={isActive} />;
};

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

  const fetchNextPageLastCall = useLastCall(fetchNextPage, 500);

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

  const leavesList = data as ILeaveDetailData[];

  // Extra Props to Accordion are passed to underlying flatlist
  // when renderAsFlatList is true
  // onEndReached and ListFooterComponent are passed to
  // underlying flatlist
  return (
    <Accordion
      activeSections={activeSections}
      sections={leavesList}
      renderHeader={renderHeader}
      sectionContainerStyle={styles.accordionSectionContainer}
      renderContent={renderContent}
      onChange={setActiveSections}
      underlayColor="#E6EDFF"
      touchableComponent={TouchableOpacity}
      renderAsFlatList={true}
      onEndReached={fetchNextPageLastCall}
      ListFooterComponent={
        isFetchingNextPage ? (
          <ActivityIndicator
            style={styles.paddingVertical}
            color={colors.PRIMARY}
          />
        ) : null
      }
    />
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
});

export default RenderScreenContent;

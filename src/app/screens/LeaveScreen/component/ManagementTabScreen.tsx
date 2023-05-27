import React, {useState} from 'react';
import {FlatList, RefreshControl} from 'react-native';

import TabScreen from './TabScreen';
import LeaveListItem from './LeaveListItem';
import {useLeaveList} from '../leave.hooks';
import {startOfMonth, todaysDate} from '../../../utils/date';
import {ILeaveFilters} from '../interface';

interface Props {
  route: string;
}

function ManagementTabScreen({route}: Props) {
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
  } = useLeaveList(filters);

  console.log(data, isError, isLoading, isRefetching);

  return (
    <TabScreen
      isManagement={true}
      filters={filters}
      isLoading={isLoading}
      isError={isError}
      error={error}
      refetch={refetch}
      isRefetching={isRefetching}
      isRefetchError={isRefetchError}
      setFilters={setFilters}
      noLeaves={data?.length === 0}>
      <FlatList
        data={data}
        refreshControl={
          <RefreshControl refreshing={isRefetching} onRefresh={refetch} />
        }
        renderItem={({item}) => <LeaveListItem {...item} />}
      />
    </TabScreen>
  );
}

export default ManagementTabScreen;

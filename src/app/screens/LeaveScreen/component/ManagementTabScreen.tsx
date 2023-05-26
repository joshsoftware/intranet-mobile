import React, {useCallback, useState} from 'react';
import {FlatList, RefreshControl} from 'react-native';
import {useQueryClient} from 'react-query';

import TabScreen from './TabScreen';
import LeaveListItem from './LeaveListItem';
import {useLeaveList} from '../leave.hooks';
import {dateFormater} from '../../../utils/dateFormater';
import {startOfMonth, todaysDate} from '../../../utils/date';
import {ILeaveFilters} from '../interface';

interface Props {
  route: string;
}

function ManagementTabScreen({route}: Props) {
  const queryClient = useQueryClient();
  const [filters, setFilters] = useState<ILeaveFilters>({
    leave_type: '',
    pending_flag: route === 'pending' ? 'true' : 'false',
    active_or_all_flags: 'active',
    from: dateFormater(startOfMonth),
    to: dateFormater(todaysDate),
    page_no: 0,
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

  const updateFilters = useCallback(
    (newFilters: ILeaveFilters) => {
      setFilters(newFilters);
      queryClient.invalidateQueries(['leave', filters]);
    },
    [filters, queryClient],
  );

  return (
    <TabScreen
      filters={filters}
      isLoading={isLoading}
      isError={isError}
      error={error}
      refetch={refetch}
      isRefetching={isRefetching}
      isRefetchError={isRefetchError}
      updateFilters={updateFilters}
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

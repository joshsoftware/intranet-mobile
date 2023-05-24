import React, {useState} from 'react';
import {ActivityIndicator, FlatList, StyleSheet, View} from 'react-native';

import Input from '../../../components/input';
import colors from '../../../constant/colors';
import {Search} from '../../../constant/icons';
import LeaveListItem from './LeaveListItem';
import {useLeaveList} from '../leave.hooks';

import {ILeaveFilters} from '../interface';
import Typography from '../../../components/typography';

interface Props {
  route: string;
}

function TabScreen({route}: Props) {
  const [filters, setFilters] = useState<ILeaveFilters>({
    leave_type: 'LEAVE,WFH',
    pending_flag: route === 'pending' ? 'true' : 'false',
  });

  let {data, isLoading} = useLeaveList(filters);

  if (isLoading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color={colors.PRIMARY} />
      </View>
    );
  }

  if (!data || data.length === 0) {
    return (
      <View style={styles.centerContainer}>
        <Typography type="error">Could not fetch leaves!</Typography>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <View style={styles.searchBoxContainer}>
          <Input StartIcon={Search} placeholder="Search" />
        </View>
        <View style={styles.filterContainer}>
          <Search />
        </View>
      </View>
      <FlatList
        data={data}
        renderItem={({item}) => <LeaveListItem {...item} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 9,
  },
  searchBoxContainer: {
    flex: 9,
  },
  filterContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default TabScreen;

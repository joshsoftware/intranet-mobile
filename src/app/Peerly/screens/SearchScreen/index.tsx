import React, {useMemo, useState} from 'react';
import {SafeAreaView, StyleSheet, View} from 'react-native';
import {useGetSearchAppreciationList} from './search.hooks';
import {useDebounce} from '../../utils';
import GivenAndReceivedAppriciation from '../../components/GivenAndReceivedAppreciation';
import Search from '../../components/Search';
import colors from '../../constants/colors';
import {AppreciationDetails} from '../../services/home/types';

const SearchScreen = () => {
  const [searchName, setSearchName] = useState('');
  const debounceValue = useDebounce(searchName, 500);

  const {
    data: appreciationList,
    isLoading: isLoadingAppreciations,
    isFetching: isFetchingAppreciations,
    isError: isErrorAppreciation,
  } = useGetSearchAppreciationList({
    name: debounceValue,
  });

  const handleSearch = (value: string) => {
    if (value.length) {
      setSearchName(value);
    } else {
      setSearchName('');
    }
  };

  const getSearchName = useMemo(() => {
    if (debounceValue) {
      return debounceValue.trim().toLowerCase();
    }
    return '';
  }, [debounceValue]);

  const isDisableTabBtn = useMemo(() => {
    if (
      !appreciationList?.length ||
      isErrorAppreciation ||
      isLoadingAppreciations
    ) {
      return true;
    } else {
      return false;
    }
  }, [appreciationList?.length, isErrorAppreciation, isLoadingAppreciations]);

  const receivedAppriciationList = appreciationList.filter(
    (item: AppreciationDetails) => {
      const fname = (item?.receiver_first_name || '').toLowerCase();
      const lname = (item?.receiver_last_name || '').toLowerCase();
      const receiverName = `${fname} ${lname}`;
      return receiverName.includes(getSearchName);
    },
  );

  const expressedAppriciationList = appreciationList.filter(
    (item: AppreciationDetails) => {
      const fname = (item?.sender_first_name || '').toLowerCase();
      const lname = (item?.sender_last_name || '').toLowerCase();
      const senderName = `${fname} ${lname}`;
      return senderName.includes(getSearchName);
    },
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View>
          <Search
            autoFocus={true}
            onChange={handleSearch}
            value={searchName}
            placeholder={'Search Co-Worker'}
          />
        </View>
        <View style={styles.appreciationWrapper}>
          <GivenAndReceivedAppriciation
            appreciationList={appreciationList}
            receivedList={receivedAppriciationList}
            expressedList={expressedAppriciationList}
            isLoading={isLoadingAppreciations || isFetchingAppreciations}
            disableBtn={isDisableTabBtn}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.WHITE,
  },
  container: {
    flex: 1,
    padding: 15,
  },
  appreciationWrapper: {
    marginTop: 10,
    marginBottom: 50,
  },
});

export default SearchScreen;

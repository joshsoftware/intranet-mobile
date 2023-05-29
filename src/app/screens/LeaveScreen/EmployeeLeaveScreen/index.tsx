import {
  ActivityIndicator,
  RefreshControl,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import Accordion from 'react-native-collapsible/Accordion';

import AccordionContent from '../component/AccordionContent';
import AccordionHeader from '../component/AccordionHeader';
import Typography from '../../../components/typography';
import {useLeavesList} from '../leave.hooks';

import colors from '../../../constant/colors';
import {ILeaveDetailData} from '../interface';

type Props = {
  isPendingRoute: boolean;
  startDate: Date;
  endDate: Date;
};

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

const EmployeeLeaveScreen: React.FC<Props> = ({
  startDate,
  endDate,
  isPendingRoute,
}) => {
  const [activeSections, setActiveSections] = useState<number[]>([]);

  const {data, isLoading, refetch, isError, error, isRefetching} =
    useLeavesList(startDate, endDate, isPendingRoute);

  const refreshControlComponent = (
    <RefreshControl refreshing={isRefetching} onRefresh={refetch} />
  );
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
        refreshControl={refreshControlComponent}>
        <Typography type="error">{error}</Typography>
      </ScrollView>
    );
  }

  if (!data.length) {
    return (
      <View style={styles.centerContainer}>
        <Typography type="secondaryText">
          No {isPendingRoute ? 'Pending' : 'Previous'} Leaves!
        </Typography>
      </View>
    );
  }

  return (
    <Accordion
      activeSections={activeSections}
      onChange={setActiveSections}
      sections={data}
      renderContent={renderContent}
      renderHeader={renderHeader}
      touchableComponent={TouchableOpacity}
      touchableProps={{activeOpacity: 0.8}}
      sectionContainerStyle={styles.accordionSectionContainer}
      renderAsFlatList
      refreshControl={refreshControlComponent}
    />
  );
};

const styles = StyleSheet.create({
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  accordionSectionContainer: {
    backgroundColor: colors.WHITE,
    elevation: 5,
    marginBottom: 16,
    borderRadius: 10,
    marginHorizontal: 16,
  },
});

export default EmployeeLeaveScreen;

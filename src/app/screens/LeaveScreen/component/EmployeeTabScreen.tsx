import React, {useState} from 'react';
import {View, ActivityIndicator, StyleSheet} from 'react-native';
import * as Animatable from 'react-native-animatable';
import Accordion from 'react-native-collapsible/Accordion';
import {TouchableOpacity} from 'react-native-gesture-handler';

import Typography from '../../../components/typography';

import colors from '../../../constant/colors';
import {ArrowUp, ArrowDown, Search} from '../../../constant/icons';
import DetailRow from '../../ProfileScreen/component/DetailRow';
import {ILeaveDetailData} from '../interface';

interface Props {
  route: string;
}

function EmployeeTabScreen({route}: Props) {
  const [activeSections, setActiveSections] = useState<number[]>([]);

  const {data, isLoading} = {
    data: [] as ILeaveDetailData[],
    isLoading: false,
  };

  if (isLoading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color={colors.PRIMARY} />
      </View>
    );
  }

  if (data === undefined || data === null) {
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

  const name = data[0].emp_name;

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
    <View style={styles.container}>
      <View style={styles.row}>
        <Typography style={styles.name}>{name}</Typography>
        <View style={styles.centerContainer}>
          <Search />
        </View>
      </View>
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 9,
  },
  name: {
    flex: 9,
    color: colors.SECONDARY,
    fontSize: 17,
    fontWeight: 'bold',
    marginVertical: 16,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
  headerText: {
    paddingLeft: 5,
  },
  contentContainer: {
    paddingHorizontal: 10,
    paddingVertical: 9,
  },
  accordionSectionContainer: {
    backgroundColor: colors.WHITE,
    elevation: 5,
    marginBottom: 16,
    borderRadius: 10,
  },
  paddingLeft: {
    paddingLeft: 10,
    fontSize: 14,
  },
});

export default EmployeeTabScreen;

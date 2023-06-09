import React, {useState} from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import Accordion from 'react-native-collapsible/Accordion';
import * as Animatable from 'react-native-animatable';

import Typography from '../../../components/typography';
import DetailRow from '../../../components/DetailRow';

import {dateFormate} from '../../../utils/date';

import {IProject} from '../interface/employeeDetail';
import {ArrowDown, ArrowUp} from '../../../constant/icons';

interface Props {
  data: IProject[];
}

function ProjectAccordion({data}: Props) {
  const [activeSections, setActiveSections] = useState<number[]>([]);

  const renderHeader = (
    content: IProject,
    _index: number,
    isActive: boolean,
  ) => {
    return (
      <Animatable.View duration={400} style={styles.header}>
        <Typography type="text" style={styles.headerText}>
          {content.projectName}
        </Typography>
        {isActive ? <ArrowUp /> : <ArrowDown />}
      </Animatable.View>
    );
  };

  const renderContent = (content: IProject) => {
    return (
      <Animatable.View duration={400} style={styles.contentContainer}>
        <DetailRow label="Type" value={content.type} />
        <DetailRow label="Start Date" value={dateFormate(content.startDate)} />
        <DetailRow label="End Date" value={dateFormate(content.endDate)} />
        <DetailRow
          label="Timesheet Required"
          value={content.isTimesheetRequired ? 'yes' : 'no'}
        />
        <DetailRow label="Billable" value={content.billable ? 'yes' : 'no'} />
        <DetailRow label="Allocation" value={`${content.allocation}`} />
      </Animatable.View>
    );
  };

  return (
    <>
      {!data || data.length === 0 ? (
        <Typography type="secondaryText">No Projects Here!</Typography>
      ) : (
        <Accordion
          activeSections={activeSections}
          sections={data}
          renderHeader={renderHeader}
          renderContent={renderContent}
          onChange={setActiveSections}
          underlayColor="#E6EDFF"
          touchableComponent={TouchableOpacity}
        />
      )}
    </>
  );
}

const styles = StyleSheet.create({
  header: {
    minHeight: 30,
    padding: 5,
    borderRadius: 5,
    backgroundColor: '#E6EDFF',
    marginVertical: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerText: {
    paddingLeft: 5,
  },
  contentContainer: {
    paddingHorizontal: 10,
  },
});

export default React.memo(ProjectAccordion);

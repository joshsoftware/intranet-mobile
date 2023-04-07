import React, {useMemo} from 'react';
import {ScrollView} from 'react-native';

import DetailsView from '../../components/profile/cardDetails/detailsView';
import CardDetails from '../../components/profile/cardDetails';
import CustomAccordian from '../../components/customAccordian';

import labelFormatter from '../../utils/userProfile/labelFormatter';

import {
  assessmentDetailsType,
  designationDetailsType,
  employeeDetailsType,
  otherDetailsType,
  projectType,
} from '../../types';
import colors from '../../constant/colors';

type dataType = {
  employeeDetail: employeeDetailsType;
  designationDetails: designationDetailsType;
  assessmentDetails: assessmentDetailsType;
  otherDetails: otherDetailsType;
  currentProjects: projectType[];
  previousProjects: projectType[];
};

type Props = {
  data: dataType;
};
const EmployeeDetails = ({data}: Props) => {
  const dataArray = Object.entries(data);
  return (
    <ScrollView style={{backgroundColor: colors.WHITE}}>
      {dataArray.map(([key, content], index: number) => {
        return key === 'currentProjects' || key === 'previousProjects' ? (
          <CardDetails title={labelFormatter(key)} key={index}>
            <CustomAccordian data={content as projectType[]} />
          </CardDetails>
        ) : (
          <CardDetails title={labelFormatter(key)} key={index}>
            <DetailsView data={content} />
          </CardDetails>
        );
      })}
    </ScrollView>
  );
};

export default EmployeeDetails;

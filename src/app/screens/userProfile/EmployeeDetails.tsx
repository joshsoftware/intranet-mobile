import React from 'react';
import {ScrollView} from 'react-native';

import DetailsView from '../../components/profile/cardDetails/detailsView';
import CardDetails from '../../components/profile/cardDetails';
import CustomAccordian from '../../components/customAccordian';

import labelFormatter from '../../utils/labelFormatter';

import {
  assessmentDetailsType,
  designationDetailsType,
  employeeDetailsType,
  otherDetailsType,
  projectType,
} from '../../types';

import colors from '../../constant/colors';

type dataType = {
  employeeDetails: employeeDetailsType;
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
  const keys: (keyof dataType)[] = Object.keys(data) as (keyof dataType)[];
  return (
    <ScrollView style={{backgroundColor: colors.WHITE}}>
      {keys.map((key: keyof dataType, index: number) => {
        return Array.isArray(data[key]) ? (
          <CardDetails title={labelFormatter(key)} key={index}>
            <CustomAccordian data={data[key]} />
          </CardDetails>
        ) : (
          <CardDetails title={labelFormatter(key)} key={index}>
            <DetailsView data={data[key]} />
          </CardDetails>
        );
      })}
    </ScrollView>
  );
};

export default EmployeeDetails;

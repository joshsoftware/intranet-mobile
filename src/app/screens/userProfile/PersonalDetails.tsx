import React from 'react';
import {ScrollView} from 'react-native';

import CardDetails from '../../components/profile/cardDetails';
import DetailsView from '../../components/profile/cardDetails/detailsView';

import labelFormatter from '../../utils/labelFormatter';

import {
  emergencyContactDetailsType,
  personalDetailsType,
  addressType,
} from '../../types';

import colors from '../../constant/colors';

type dataType = {
  personalDetails: personalDetailsType;
  emergencyContactDetails: emergencyContactDetailsType;
  temporaryAddress: addressType;
  permanentAddress: addressType;
};

type Props = {
  data: dataType;
};
const PersonalDetails = ({data}: Props) => {
  const keys: (keyof dataType)[] = Object.keys(data) as (keyof dataType)[];
  return (
    <ScrollView style={{backgroundColor: colors.WHITE}}>
      {keys.map((key: keyof dataType, index: number) => (
        <CardDetails title={labelFormatter(key)}>
          <DetailsView data={data[key]} />
        </CardDetails>
      ))}
    </ScrollView>
  );
};

export default PersonalDetails;

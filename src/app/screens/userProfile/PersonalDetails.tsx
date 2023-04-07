import React, {useMemo} from 'react';
import {ScrollView} from 'react-native';

import CardDetails from '../../components/profile/cardDetails';
import DetailsView from '../../components/profile/cardDetails/detailsView';

import labelFormatter from '../../utils/userProfile/labelFormatter';

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
  const dataArray = Object.entries(data);
  return (
    <ScrollView style={{backgroundColor: colors.WHITE}}>
      {dataArray.map(([key, content], index: number) =>
        useMemo(
          () => (
            <CardDetails key={index} title={labelFormatter(key)}>
              <DetailsView data={content} />
            </CardDetails>
          ),
          [key, content],
        ),
      )}
    </ScrollView>
  );
};

export default PersonalDetails;

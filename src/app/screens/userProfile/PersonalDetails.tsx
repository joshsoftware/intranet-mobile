import React, {ReactNode, useMemo} from 'react';
import {ScrollView} from 'react-native';

import CardDetails from '../../components/profile/cardDetails';
import DetailsView from '../../components/profile/cardDetails/detailsView';

import labelFormatter from '../../utils/userProfile/labelFormatter';

import {
  emergencyContactDetailsType,
  personalDetailsType,
  addressType,
  detailsType,
} from '../../types';

import colors from '../../constant/colors';

type dataType = {
  personalDetail: personalDetailsType;
  emergencyContactDetails: emergencyContactDetailsType[];
  address: addressType[];
};

type Props = {
  data: dataType;
};
const renderData = (data: dataType): ReactNode => {
  return Object.entries(data).map(([key, content], index: number) => {
    if (Array.isArray(content)) {
      return content.map(
        (ele: addressType | emergencyContactDetailsType, index) => {
          return (
            <CardDetails
              key={index}
              title={labelFormatter(
                key === 'address'
                  ? ((ele as addressType).typeOfAddress as string)
                  : key,
              )}>
              <DetailsView data={ele} />
            </CardDetails>
          );
        },
      );
    }

    return (
      <CardDetails key={index} title={labelFormatter(key)}>
        <DetailsView data={content} />
      </CardDetails>
    );
  });
};
const PersonalDetails = ({data}: Props) => {
  return (
    <ScrollView style={{backgroundColor: colors.WHITE}}>
      {renderData(data)}
    </ScrollView>
  );
};

export default PersonalDetails;

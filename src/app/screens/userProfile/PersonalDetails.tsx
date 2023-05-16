import React from 'react';

import CardDetails from '../../components/profile/cardDetails';
import DetailsView from '../../components/profile/cardDetails/detailsView';
import ScreenWrapper from './components/ScreenWrapper';

import labelFormatter from '../../utils/userProfile/labelFormatter';

import {
  addressType,
  emergencyContactDetailsType,
  personalDetailsType,
} from '../../types';

type dataType = {
  personalDetail: personalDetailsType;
  emergencyContactDetails: emergencyContactDetailsType[];
  address: addressType[];
};

type Props = {
  data: dataType;
};

const PersonalDetails = ({data}: Props) => {
  return (
    <ScreenWrapper>
      {Object.entries(data).map(([key, content], index: number) => {
        if (key === 'address') {
          return (content as addressType[])?.map(
            (ele: addressType, indexOfAddress: number) => {
              return (
                <CardDetails
                  key={indexOfAddress}
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
      })}
    </ScreenWrapper>
  );
};

export default PersonalDetails;

import React from 'react';

import ScreenWrapper from '../component/ScreenWrapper';
import Card from '../component/Card';
import DetailRow from '../../../components/DetailRow';

import {IPersonalDetailsData} from '../interface/personalDetails';

const PersonalDetails = (props: IPersonalDetailsData) => {
  const {personalDetail, address, emergencyContactDetails} = props || {};

  const {
    panNumber,
    personalEmail,
    passportNumber,
    qualification,
    dateOfJoining,
    workExperience,
    previousCompany,
    tshirtSize,
  } = personalDetail || {};

  const addressCards = address
    ? address.map(
        ({
          typeOfAddress,
          address: addressValue,
          city,
          pinCode,
          state,
          mobileNumber,
        }) => (
          <Card key={typeOfAddress} title={typeOfAddress}>
            <DetailRow label="Address" value={addressValue} />
            <DetailRow label="City" value={city} />
            <DetailRow label="Pin Code" value={pinCode} />
            <DetailRow label="State" value={state} />
            <DetailRow label="Landline/Mobile No" value={mobileNumber} />
          </Card>
        ),
      )
    : [];

  return (
    <ScreenWrapper>
      <Card title="Personal Details">
        <DetailRow label="Pan Number" value={panNumber} />
        <DetailRow label="Personal Email" value={personalEmail} />
        <DetailRow label="Passport Number" value={passportNumber} />
        <DetailRow label="Qualification" value={qualification} />
        <DetailRow
          label="Date Of Joining"
          value={dateOfJoining?.split('-').reverse().join('-')}
        />
        <DetailRow label="Work Experience" value={workExperience} />
        <DetailRow label="Previous Company" value={previousCompany} />
        <DetailRow label="Bonusly Auth Token" value={'-'} />
        <DetailRow label="Tshirt Size" value={tshirtSize} />
      </Card>

      <Card title="Emergency Contact Details">
        <DetailRow label="Name" value={emergencyContactDetails[0]?.name} />
        <DetailRow
          label="Relation"
          value={emergencyContactDetails[0]?.relation}
        />
        <DetailRow
          label="Phone No"
          value={emergencyContactDetails[0]?.phoneNumber}
        />
      </Card>

      {addressCards}
    </ScreenWrapper>
  );
};

export default React.memo(PersonalDetails);

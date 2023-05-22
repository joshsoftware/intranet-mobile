import React from 'react';

import ScreenWrapper from '../component/ScreenWrapper';
import Card from '../component/Card';
import DetailRow from '../component/DetailRow';

import {IPersonalDetailsData} from '../interface/personalDetails';

interface Props {
  data: IPersonalDetailsData;
}

const PersonalDetails = ({data}: Props) => {
  const {
    panNumber,
    personalEmail,
    passportNumber,
    qualification,
    dateOfJoining,
    workExperience,
    previousCompany,
    tshirtSize,
  } = data.personalDetail;

  const addressCards = data.address.map(
    ({typeOfAddress, address, city, pinCode, state, mobileNumber}) => (
      <Card key={typeOfAddress} title={typeOfAddress}>
        <DetailRow label="Address" value={address} />
        <DetailRow label="City" value={city} />
        <DetailRow label="Pin Code" value={pinCode} />
        <DetailRow label="State" value={state} />
        <DetailRow label="Landline/Mobile No" value={mobileNumber} />
      </Card>
    ),
  );

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
        <DetailRow label="Work Experience" value={`${workExperience}`} />
        <DetailRow label="Previous Company" value={previousCompany} />
        <DetailRow label="Bonusly Auth Token" value={'-'} />
        <DetailRow label="Tshirt Size" value={tshirtSize} />
      </Card>

      <Card title="Emergency Contact Details">
        <DetailRow label="Name" value={data.emergencyContactDetails[0]?.name} />
        <DetailRow
          label="Relation"
          value={data.emergencyContactDetails[0]?.relation}
        />
        <DetailRow
          label="Phone No"
          value={data.emergencyContactDetails[0]?.phoneNumber}
        />
      </Card>

      {addressCards}
    </ScreenWrapper>
  );
};

export default React.memo(PersonalDetails);

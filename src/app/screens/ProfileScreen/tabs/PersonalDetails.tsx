import React, {Fragment} from 'react';
import {StyleSheet} from 'react-native';

import Card from '../component/Card';
import DetailRow from '../../../components/DetailRow';
import Linear from '../../../components/seperator/linear';
import ScreenWrapper from '../component/ScreenWrapper';

import {dateFormate} from '../../../utils/date';

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
    end_of_probation: probationEndDate,
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
        <DetailRow label="PAN Number" value={panNumber} />
        <DetailRow label="Personal Email" value={personalEmail} />
        <DetailRow label="Passport Number" value={passportNumber} />
        <DetailRow label="Qualification" value={qualification} />
        <DetailRow label="Date Of Joining" value={dateFormate(dateOfJoining)} />
        <DetailRow label="Work Experience" value={workExperience} />
        <DetailRow label="Previous Company" value={previousCompany} />
        <DetailRow label="Tshirt Size" value={tshirtSize} />
        <DetailRow
          label="Probation End Date"
          value={dateFormate(probationEndDate)}
        />
      </Card>

      {Boolean(emergencyContactDetails?.length) && (
        <Card title="Emergency Contact Details">
          {emergencyContactDetails?.map(
            ({name, relation, phoneNumber}, index) => (
              <Fragment key={index}>
                {Boolean(index) && <Linear style={styles.line} />}
                <DetailRow label="Name" value={name} />
                <DetailRow label="Relation" value={relation} />
                <DetailRow label="Phone No" value={phoneNumber} />
              </Fragment>
            ),
          )}
        </Card>
      )}

      {addressCards}
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  line: {
    marginVertical: 4,
  },
});

export default React.memo(PersonalDetails);

import React from 'react';
import {StyleSheet, View} from 'react-native';

import ScreenWrapper from '../component/ScreenWrapper';
import Card from '../component/Card';
import DetailRow from '../../../components/DetailRow';
import IconButton from '../component/IconButton';

import {IPublicProfileData} from '../interface/publicProfile';
import {Facebook, Github, Linkdin, Blog} from '../../../constant/icons';

const PublicProfile = ({publicProfile, socialDetails}: IPublicProfileData) => {
  const {firstName, lastName, gender, mobileNumber, bloodGroup, dateOfBirth} =
    publicProfile || {};

  const {linkedin, github, facebook, blog} = socialDetails || {};

  return (
    <ScreenWrapper>
      <Card title="Profile Details">
        <DetailRow label="First Name" value={firstName} />
        <DetailRow label="Last Name" value={lastName} />
        <DetailRow label="Gender" value={gender} />
        <DetailRow label="Mobile Number" value={mobileNumber} />
        <DetailRow label="Blood Group" value={bloodGroup} />
        <DetailRow
          label="Date of Birth"
          value={dateOfBirth?.split('-').reverse().join('-')}
        />
      </Card>

      {(github || linkedin || blog || facebook) && (
        <Card title="Social Media Links">
          <View style={styles.row}>
            {github && <IconButton icon={Github} link={github} />}
            {linkedin && <IconButton icon={Linkdin} link={linkedin} />}
            {blog && <IconButton icon={Blog} link={blog} />}
            {facebook && <IconButton icon={Facebook} link={facebook} />}
          </View>
        </Card>
      )}
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
  },
});

export default React.memo(PublicProfile);

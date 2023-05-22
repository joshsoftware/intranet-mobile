import React from 'react';
import {Alert, Linking, StyleSheet, TouchableOpacity, View} from 'react-native';
import {SvgProps} from 'react-native-svg';

import ScreenWrapper from '../component/ScreenWrapper';
import Card from '../component/Card';
import DetailRow from '../component/DetailRow';

import {IPublicProfileData} from '../interface/publicProfile';
import {Facebook, Github, Linkdin, Blog} from '../../../constant/icons';

interface Props {
  data: IPublicProfileData;
}

const PublicProfile = ({data}: Props) => {
  const {firstName, lastName, gender, mobileNumber, bloodGroup, dateOfBirth} =
    data.publicProfile;

  const {linkedin, github, facebook, blog} = data.socialDetails;

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

      <Card title="Social Media Links">
        <View style={styles.row}>
          {github && <IconButton icon={Github} link={github} />}
          {linkedin && <IconButton icon={Linkdin} link={linkedin} />}
          {blog && <IconButton icon={Blog} link={blog} />}
          {facebook && <IconButton icon={Facebook} link={facebook} />}
        </View>
      </Card>
    </ScreenWrapper>
  );
};

interface IconButtonProps {
  icon: React.FC<SvgProps>;
  link: string | null;
}

const IconButton = ({icon: Icon, link}: IconButtonProps) => {
  const handlePress = async () => {
    if (link === null) {
      return;
    }

    const supported = await Linking.canOpenURL(link);

    if (supported) {
      await Linking.openURL(link);
    } else {
      Alert.alert(`Could not open URL: \n${link} `);
    }
  };

  return (
    <TouchableOpacity style={styles.iconContainer} onPress={handlePress}>
      <Icon />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
  },
  iconContainer: {
    paddingHorizontal: 20,
  },
});

export default React.memo(PublicProfile);

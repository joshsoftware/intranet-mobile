import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

import Typography from '../../../components/typography';

import {IntranetErrorCode} from '../../../services/api/login';

import {Warning} from '../../../constant/icons';
import {cardStyles, warningStyles} from '../styles';

interface IProps {
  code: IntranetErrorCode;
  email: string;
}

function WarningMessageCard(props: IProps) {
  const {code, email} = props;

  let content: React.ReactNode = null;

  switch (code) {
    case IntranetErrorCode.PRIVATE_EMAIL:
      content = (
        <Text style={warningStyles.text}>
          Received private email. Please ensure
          <Text style={styles.bold}> Share email</Text> option was enabled while
          apple login.
        </Text>
      );
      break;
    case IntranetErrorCode.PERSONAL_EMAIL:
      content = (
        <Text style={warningStyles.text}>
          Only accounts with josh software email id are allowed.
        </Text>
      );
      break;
    case IntranetErrorCode.ABSENT_IN_DATABASE:
      content = (
        <Text style={warningStyles.text}>User not present on intranet.</Text>
      );
      break;
    default:
      break;
  }

  return (
    <View style={[cardStyles.container, warningStyles.container]}>
      <View style={cardStyles.iconContainer}>
        <Warning fill={warningStyles.icon.color} />
      </View>
      <View style={cardStyles.contentContainer}>
        {content}
        {content && <Typography />}
        <Typography style={warningStyles.text}>Email: </Typography>
        <Typography style={[warningStyles.text, styles.bold]}>
          {email}
        </Typography>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  bold: {
    fontWeight: 'bold',
  },
});

export default WarningMessageCard;

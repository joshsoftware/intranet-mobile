import React from 'react';
import {View} from 'react-native';

import {Warning} from '../../../constant/icons';

import {cardStyles, warningStyles} from '../styles';
import Typography from '../../../components/typography';
import {IntranetErrorCode} from '../../../services/api/login';

const message = {
  PERSONAL_EMAIL: 'Only accounts with josh software email id are allowed.',
  PRIVATE_EMAIL:
    'Received private email. Please ensure share email option was enabled while apple login.',
  ABSENT_IN_DATABASE: 'User not present on intranet.',
};

interface IProps {
  code: IntranetErrorCode;
}

function WarningMessageCard(props: IProps) {
  const {code} = props;

  return (
    <View style={[cardStyles.container, warningStyles.container]}>
      <View style={cardStyles.iconContainer}>
        <Warning fill={warningStyles.icon.color} />
      </View>
      <View style={cardStyles.contentContainer}>
        <Typography style={warningStyles.text}>{message[code]}</Typography>
      </View>
    </View>
  );
}

export default WarningMessageCard;

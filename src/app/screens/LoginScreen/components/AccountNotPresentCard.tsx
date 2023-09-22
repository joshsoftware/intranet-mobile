import React from 'react';
import {View, Text} from 'react-native';

import {Warning} from '../../../constant/icons';

import {cardStyles, warningStyles} from '../styles';

interface IProps {
  email: string;
}

function AccountNotPresentCard(props: IProps) {
  return (
    <View style={[cardStyles.container, warningStyles.container]}>
      <View style={cardStyles.iconContainer}>
        <Warning fill={warningStyles.icon.color} />
      </View>
      <View style={cardStyles.contentContainer}>
        <Text style={warningStyles.text}>
          Currently using{' '}
          <Text style={warningStyles.boldText}>{props.email}</Text>.
        </Text>
        <Text style={warningStyles.text} />
        <Text style={warningStyles.text}>
          This user is unavailable on the{' '}
          <Text style={warningStyles.boldText}>Intranet</Text> Application.
        </Text>
        <Text style={warningStyles.text} />
        <Text style={warningStyles.text}>
          Contact Josh Businuess Support at{' '}
          <Text style={warningStyles.boldText}>
            business.support@joshsoftware.com
          </Text>{' '}
          for invitation request.
        </Text>
      </View>
    </View>
  );
}

export default AccountNotPresentCard;

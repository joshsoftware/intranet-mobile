import React from 'react';
import {View, Text} from 'react-native';

import {AuthType} from '../../../services/api/login';

import {Warning} from '../../../constant/icons';

import {cardStyles, warningStyles} from '../styles';

interface IProps {
  type: AuthType;
  email: string;
}

function PersonalEmailCard(props: IProps) {
  return (
    <View style={[cardStyles.container, warningStyles.container]}>
      <View style={cardStyles.iconContainer}>
        <Warning fill={warningStyles.icon.color} />
      </View>
      <View style={cardStyles.contentContainer}>
        <Text style={warningStyles.text}>
          Currently using{' '}
          <Text style={warningStyles.boldText}>{props.email}</Text>, which is
          personal email and not allowed.
        </Text>
        <Text style={warningStyles.text} />
        {props.type === AuthType.APPLE && (
          <Text style={warningStyles.text}>
            Use Apple ID which was created using{' '}
            <Text style={warningStyles.boldText}>Josh Software</Text> email id.
          </Text>
        )}

        {props.type === AuthType.GOOGLE && (
          <Text style={warningStyles.text}>
            Use Google Account with{' '}
            <Text style={warningStyles.boldText}>Josh Software</Text> email id.
          </Text>
        )}

        <Text style={warningStyles.text} />
        <Text style={warningStyles.text}>
          In case you do not have email id of joshsoftware domain, contact Josh
          Business Support at{' '}
          <Text style={warningStyles.boldText}>
            business.support@joshsoftware.com
          </Text>
        </Text>
      </View>
    </View>
  );
}

export default PersonalEmailCard;

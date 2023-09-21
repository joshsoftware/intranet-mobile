import React from 'react';
import {View, Text} from 'react-native';

import {AuthType} from '../../../services/api/login';

import {Warning} from '../../../constant/icons';

import {cardStyles, warningStyles} from '../styles';

interface IProps {
  type: AuthType;
}

function MissingEmailCard(props: IProps) {
  return (
    <View style={[cardStyles.container, warningStyles.container]}>
      <View style={cardStyles.iconContainer}>
        <Warning fill={warningStyles.icon.color} />
      </View>
      <View style={cardStyles.contentContainer}>
        <Text style={warningStyles.text}>
          We did not receive your email address during login process. Retry
          login attempt.
        </Text>
        {props.type === AuthType.APPLE && (
          <>
            <Text style={warningStyles.text} />
            <Text style={[warningStyles.text, warningStyles.boldText]}>
              Apple Login Instructions:
            </Text>
            <Text style={warningStyles.text}>
              1. Go to device settings and Stop using apple id for this app.
            </Text>
            <Text style={warningStyles.text}>{'    > Device Settings'}</Text>
            <Text style={warningStyles.text}>{'    > Apple ID'}</Text>
            <Text style={warningStyles.text}>
              {'    > Password & Security'}
            </Text>
            <Text style={warningStyles.text}>{'    > Sign in with Apple'}</Text>
            <Text style={warningStyles.text}>
              {'    > XC com joshsoftware Intranet'}
            </Text>
            <Text style={warningStyles.text}>
              {'    > Stop Using Apple ID'}
            </Text>
            <Text />
            <Text style={warningStyles.text}>2. Open Intranet App.</Text>
            <Text />
            <Text style={warningStyles.text}>
              3. Select the{' '}
              <Text style={warningStyles.boldText}>"Share My Email"</Text>{' '}
              option when using Apple login.
            </Text>
          </>
        )}

        <Text style={warningStyles.text} />
        <Text style={warningStyles.text}>
          If you continue to experience login issues, get in touch with Josh
          Business Support{' '}
          <Text style={warningStyles.boldText}>
            business.support@joshsoftware.com
          </Text>
          .
        </Text>
      </View>
    </View>
  );
}

export default MissingEmailCard;

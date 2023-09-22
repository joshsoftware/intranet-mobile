import React from 'react';
import {View, Text} from 'react-native';

import {Warning} from '../../../constant/icons';

import {cardStyles, warningStyles} from '../styles';

interface IProps {
  email: string;
}

function PrivateEmailCard(props: IProps) {
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
          You've selected the{' '}
          <Text style={warningStyles.boldText}>"Hide My Email"</Text> option
          during login. We require your email for the login authentication
          process.
        </Text>
        <Text style={warningStyles.text} />
        <Text style={[warningStyles.text, warningStyles.boldText]}>
          Apple Login Instructions:
        </Text>
        <Text />
        <Text style={warningStyles.text}>
          1. Go to device settings and Stop using apple id for this app.
        </Text>
        <Text style={warningStyles.text}>{'    > Device Settings'}</Text>
        <Text style={warningStyles.text}>{'    > Apple ID'}</Text>
        <Text style={warningStyles.text}>{'    > Password & Security'}</Text>
        <Text style={warningStyles.text}>{'    > Sign in with Apple'}</Text>
        <Text style={warningStyles.text}>
          {'    > XC com joshsoftware Intranet'}
        </Text>
        <Text style={warningStyles.text}>{'    > Stop Using Apple ID'}</Text>
        <Text />
        <Text style={warningStyles.text}>2. Open Intranet App.</Text>
        <Text />
        <Text style={warningStyles.text}>
          3. Select the{' '}
          <Text style={warningStyles.boldText}>"Share My Email"</Text> option
          when using Apple login.
        </Text>
      </View>
    </View>
  );
}

export default PrivateEmailCard;

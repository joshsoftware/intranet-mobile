import React from 'react';
import {View} from 'react-native';

import Typography from '../../../components/typography';

import {AuthType} from '../../../services/api/login';

import {TaskAlt} from '../../../constant/icons';
import {cardStyles, successStyles} from '../styles';

interface IProps {
  type: AuthType;
  email: string;
}

function SigninSuccessCard(props: IProps) {
  const {type, email} = props;

  let typeString = '';

  switch (type) {
    case AuthType.GOOGLE:
      typeString = 'Google';
      break;
    case AuthType.APPLE:
      typeString = 'Apple';
      break;
    default:
      typeString = '';
      break;
  }

  return (
    <View style={[cardStyles.container, successStyles.container]}>
      <View style={cardStyles.iconContainer}>
        <TaskAlt fill={successStyles.icon.color} />
      </View>
      <View style={cardStyles.contentContainer}>
        <Typography style={successStyles.text}>
          {typeString} Signin successful {email ? `with email ${email}` : ''}
        </Typography>
      </View>
    </View>
  );
}

export default SigninSuccessCard;

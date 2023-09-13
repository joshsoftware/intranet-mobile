import React from 'react';
import {View} from 'react-native';

import {Info} from '../../../constant/icons';

import {cardStyles, infoStyles} from '../styles';
import Typography from '../../../components/typography';

function GoogleInstructionCard() {
  return (
    <View style={[cardStyles.container, infoStyles.container]}>
      <View style={cardStyles.iconContainer}>
        <Info fill={infoStyles.icon.color} />
      </View>
      <View style={cardStyles.contentContainer}>
        <Typography style={infoStyles.text}>
          Google Login Instructions:
        </Typography>
        <Typography />
        <Typography style={infoStyles.text}>
          1. Press "Back to Login" button.
        </Typography>
        <Typography />
        <Typography style={infoStyles.text}>
          2. Press "Login With Google" button.
        </Typography>
        <Typography />
        <Typography style={infoStyles.text}>
          3. Choose google account with joshsoftware email id.
        </Typography>
      </View>
    </View>
  );
}

export default GoogleInstructionCard;

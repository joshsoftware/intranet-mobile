import React from 'react';
import {View} from 'react-native';

import Typography from '../../../components/typography';

import {Info} from '../../../constant/icons';
import {cardStyles, infoStyles} from '../styles';

function AbsentInstructionCard() {
  return (
    <View style={[cardStyles.container, infoStyles.container]}>
      <View style={cardStyles.iconContainer}>
        <Info fill={infoStyles.icon.color} />
      </View>
      <View style={cardStyles.contentContainer}>
        <Typography style={infoStyles.text}>
          Contact Josh Software Admin for invitation request.
        </Typography>
      </View>
    </View>
  );
}

export default AbsentInstructionCard;

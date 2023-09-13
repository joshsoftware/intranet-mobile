import React from 'react';
import {View} from 'react-native';

import {Info} from '../../../constant/icons';

import {cardStyles, infoStyles} from '../styles';
import Typography from '../../../components/typography';

function AppleLoginInstructionCard() {
  return (
    <View style={[cardStyles.container, infoStyles.container]}>
      <View style={cardStyles.iconContainer}>
        <Info fill={infoStyles.icon.color} />
      </View>
      <View style={cardStyles.contentContainer}>
        <Typography style={infoStyles.text}>
          Apple Login Instructions:
        </Typography>
        <Typography />
        <Typography style={infoStyles.text}>
          1. Go to device settings and Stop using apple id for this app.
        </Typography>
        <Typography style={infoStyles.text}>{'> Device Settings'}</Typography>
        <Typography style={infoStyles.text}>{'> Apple ID'}</Typography>
        <Typography style={infoStyles.text}>
          {'> Password and Security'}
        </Typography>
        <Typography style={infoStyles.text}>
          {'> Apps using Apple ID'}
        </Typography>
        <Typography style={infoStyles.text}>
          {'> com.joshsoftware.intranet'}
        </Typography>
        <Typography style={infoStyles.text}>
          {'> Stop using Apple ID'}
        </Typography>
        <Typography />
        <Typography style={infoStyles.text}>2. Open Intranet App.</Typography>
        <Typography />
        <Typography style={infoStyles.text}>
          3. Press "Login With Apple" button.
        </Typography>
        <Typography />
        <Typography style={infoStyles.text}>
          4. Please use Apple ID with josh software email.
        </Typography>
        <Typography />
        <Typography style={infoStyles.text}>
          5. Do select the "Share my email" option when using Apple login.
        </Typography>
        <Typography />
        <Typography style={infoStyles.text}>
          6. Email id is mandatory for login process.
        </Typography>
      </View>
    </View>
  );
}

export default AppleLoginInstructionCard;

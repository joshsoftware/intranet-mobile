import React from 'react';
import {Linking} from 'react-native';
import {SvgProps} from 'react-native-svg';

import Touchable from '../../../components/touchable';

import toast from '../../../utils/toast';

interface IconButtonProps {
  icon: React.FC<SvgProps>;
  link: string | null;
}

const IconButton = ({icon: Icon, link}: IconButtonProps) => {
  const handlePress = async () => {
    if (link === null) {
      return;
    }

    if (link.startsWith('http://') || link.startsWith('https://')) {
      await Linking.openURL(link);
    } else {
      toast(`Could not open URL: \n${link} `, 'error');
    }
  };

  return (
    <Touchable type="opacity" onPress={handlePress}>
      <Icon />
    </Touchable>
  );
};

export default IconButton;

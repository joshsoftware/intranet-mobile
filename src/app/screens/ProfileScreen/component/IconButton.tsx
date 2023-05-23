import React from 'react';
import {Linking, StyleSheet} from 'react-native';
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

    const supported = await Linking.canOpenURL(link);

    if (supported) {
      await Linking.openURL(link);
    } else {
      toast(`Could not open URL: \n${link} `, 'error');
    }
  };

  return (
    <Touchable
      type="opacity"
      style={styles.iconContainer}
      onPress={handlePress}>
      <Icon />
    </Touchable>
  );
};

const styles = StyleSheet.create({
  iconContainer: {
    paddingHorizontal: 20,
  },
});
export default IconButton;

import React from 'react';
import {StyleSheet, TouchableOpacity, Text, View} from 'react-native';
import {SvgProps} from 'react-native-svg';

import colors from '../../constant/colors';

interface Props {
  icon: React.FC<SvgProps>;
  title: string;
  active: boolean;
  onPress: () => void;
}

const TabBarButton = (props: Props) => {
  const Icon = props.icon;

  return (
    <TouchableOpacity style={styles.container} onPress={props.onPress}>
      <View
        style={[
          styles.iconContainer,
          props.active ? styles.iconContainerActive : {},
        ]}>
        <Icon fill={props.active ? colors.WHITE : colors.SECONDARY} />
      </View>
      <Text style={[styles.title, props.active ? styles.titleActive : {}]}>
        {props.title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  title: {
    color: colors.SECONDARY,
  },
  titleActive: {
    color: colors.PRIMARY,
    fontWeight: 'bold',
  },
  iconContainer: {
    padding: 11,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  iconContainerActive: {
    backgroundColor: colors.PRIMARY,
  },
});

export default TabBarButton;

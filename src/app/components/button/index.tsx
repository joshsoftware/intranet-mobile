import React from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  Text,
  ActivityIndicator,
  StyleProp,
  GestureResponderEvent,
  ViewStyle,
  TextStyle,
} from 'react-native';

import colors from '../../constant/colors';
import fonts from '../../constant/fonts';

export enum ButtonType {
  Primary = 'primary',
  Secondary = 'secondary',
  Tertiary = 'tertiary',
}

interface Props {
  title: string;
  type: ButtonType;
  isLoading?: boolean;
  disabled?: boolean;
  onPress: ((event: GestureResponderEvent) => void) | undefined;
}

const Button = ({
  title,
  type,
  isLoading = false,
  disabled = false,
  onPress,
}: Props) => {
  let style: StyleProp<ViewStyle> = [styles.button];
  let textStyle: StyleProp<TextStyle> = [styles.text];

  if (type === ButtonType.Primary) {
    style.push(styles.primary);
  }

  if (type === ButtonType.Secondary) {
    style.push(styles.secondary);
    textStyle.push(styles.secondaryText);
  }

  if (type === ButtonType.Tertiary) {
    style.push(styles.tertiary);
  }

  if (isLoading || disabled) {
    style.push(styles.buttonDisabled);
  }

  return (
    <TouchableOpacity
      disabled={isLoading}
      style={style}
      activeOpacity={0.5}
      onPress={onPress}>
      {isLoading ? (
        <ActivityIndicator color={colors.WHITE} />
      ) : (
        <Text style={textStyle}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    margin: 4,
    flexGrow: 1,
    padding: 12,
    borderRadius: 22,
    alignItems: 'center',
  },
  buttonDisabled: {
    opacity: 0.7,
  },
  text: {
    color: colors.WHITE,
    fontSize: 14,
    fontWeight: '800',
    fontFamily: fonts.POPPINS,
  },
  primary: {
    backgroundColor: colors.PRIMARY,
  },
  secondary: {
    backgroundColor: colors.WHITE,
    borderWidth: 2,
    borderColor: colors.PRIMARY,
  },
  secondaryText: {
    color: colors.PRIMARY,
  },
  tertiary: {
    backgroundColor: colors.TERTIARY,
  },
});

export default Button;

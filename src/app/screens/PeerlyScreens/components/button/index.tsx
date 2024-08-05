import React, {memo, useMemo} from 'react';
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

import colors from '../../constants/colors';
import fonts from '../../constants/fonts';

type ButtonType = 'primary' | 'secondary' | 'tertiary';

interface Props {
  title: string;
  type: ButtonType;
  isLoading?: boolean;
  disabled?: boolean;
  buttonStyle?:ViewStyle;
  textStyle1?:TextStyle;
  onPress: ((event: GestureResponderEvent) => void) | undefined;
}

const getButtonStyle = (
  type: ButtonType,
  isLoading: boolean,
  disabled: boolean,
) => {
  let style: StyleProp<ViewStyle> = [styles.button];
  let textStyle: StyleProp<TextStyle> = [styles.text];
  switch (type) {
    case 'secondary':
      style.push(styles.secondary);
      textStyle.push(styles.secondaryText);
      break;

    case 'tertiary':
      style.push(styles.tertiary);
      break;

    default:
      // Default is primary
      style.push(styles.primary);
      break;
  }

  if (isLoading || disabled) {
    style.push(styles.buttonDisabled);
  }

  return {style, textStyle};
};

const Button = ({
  title,
  type,
  isLoading = false,
  disabled = false,
  buttonStyle,
  textStyle1,
  onPress,
}: Props) => {
  const {style, textStyle} = useMemo(
    () => getButtonStyle(type, isLoading, disabled),
    [type, isLoading, disabled],
  );

  return (
    <TouchableOpacity
      disabled={disabled}
      style={[style, buttonStyle]}
      activeOpacity={0.8}
      onPress={onPress}>
      {isLoading ? (
        <ActivityIndicator color={colors.WHITE} />
      ) : (
        <Text style={[textStyle,textStyle1]}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
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

export default memo(Button);

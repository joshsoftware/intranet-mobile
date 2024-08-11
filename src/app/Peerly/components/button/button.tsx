import React, {memo} from 'react';
import {
  ActivityIndicator,
  GestureResponderEvent,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import colors from '../../constants/colors';
import fonts from '../../constants/fonts';

type ButtonType = 'primary' | 'secondary' | 'tertiary';

interface ButtonProps {
  title: string;
  type: ButtonType;
  onPress: ((event: GestureResponderEvent) => void) | undefined;
  isLoading?: boolean;
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  title,
  type,
  onPress,
  isLoading,
  disabled,
}) => {
  let style: StyleProp<ViewStyle> = [styles.button];
  let textStyle: StyleProp<TextStyle> = [styles.text];

  switch (type) {
    case 'secondary':
      style.push([styles.secondary]);
      textStyle.push(styles.secondaryText);
      break;
    case 'tertiary':
      textStyle.push(styles.tertiaryText);
      break;
    default:
      style.push([styles.primary]);
  }

  if (isLoading || disabled) {
    style.push(styles.buttonDisabled);
  }

  return (
    <TouchableOpacity
      disabled={disabled}
      style={style}
      activeOpacity={0.8}
      onPress={onPress}>
      {isLoading ? (
        <ActivityIndicator size="small" />
      ) : (
        <Text style={textStyle}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    justifyContent: 'center',
    padding: 10,
    alignItems: 'center',
    borderRadius: 12,
  },
  text: {
    color: colors.WHITE,
    fontSize: 15,
    fontWeight: '500',
    fontFamily: fonts.POPPINS,
  },
  buttonDisabled: {
    opacity: 0.7,
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
  tertiaryText: {
    fontWeight: 'bold',
    color: colors.PRIMARY,
  },
});
export default memo(Button);

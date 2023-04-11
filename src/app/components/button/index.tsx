import React from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  Text,
  ActivityIndicator,
  StyleProp,
  ViewStyle,
  GestureResponderEvent,
  TextStyle,
} from 'react-native';

import colors from '../../constant/colors';
import fonts from '../../constant/fonts';

interface Props {
  title: string;
  isLoading?: boolean;
  disabled?: boolean;
  onPress: ((event: GestureResponderEvent) => void) | undefined;
}

type ButtonProps = Props & {
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
};

const Button = ({
  title,
  isLoading = false,
  style,
  textStyle,
  disabled = false,
  onPress,
}: ButtonProps) => {
  return (
    <TouchableOpacity
      disabled={isLoading}
      style={[
        styles.button,
        style,
        isLoading || disabled ? styles.buttonDisabled : {},
      ]}
      activeOpacity={0.5}
      onPress={onPress}>
      {isLoading ? (
        <ActivityIndicator color={colors.WHITE} />
      ) : (
        <Text style={[styles.text, textStyle]}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

export const PrimaryButton = (props: Props) => {
  return <Button {...props} style={styles.primary} />;
};

export const SecondaryButton = (props: Props) => {
  return (
    <Button
      {...props}
      style={styles.secondary}
      textStyle={styles.secondaryText}
    />
  );
};

export const TertiaryButton = (props: Props) => {
  return <Button {...props} style={styles.tertiary} />;
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
    borderWidth: 1,
    borderColor: colors.PRIMARY,
  },
  secondaryText: {
    color: colors.PRIMARY,
  },
  tertiary: {
    backgroundColor: colors.TERTIARY,
  },
});

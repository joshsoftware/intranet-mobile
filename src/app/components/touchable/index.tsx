import {
  View,
  TouchableNativeFeedback,
  TouchableNativeFeedbackProps,
  TouchableOpacity,
  TouchableOpacityProps,
  TouchableWithoutFeedback,
  TouchableWithoutFeedbackProps,
} from 'react-native';
import React, {memo, PropsWithChildren} from 'react';

import colors from '../../constant/colors';

export type TouchableProps = PropsWithChildren<
  TouchableOpacityProps &
    TouchableNativeFeedbackProps &
    TouchableWithoutFeedbackProps & {
      type: 'native' | 'opacity' | 'none';
      underlayColor?: string;
      opacity?: number;
    }
>;

const Touchable: React.FC<TouchableProps> = ({
  children,
  type,
  underlayColor,
  opacity,
  ...props
}) => {
  switch (type) {
    case 'native':
      return (
        <TouchableNativeFeedback
          background={TouchableNativeFeedback.Ripple(
            underlayColor || colors.BG_PRESSED,
            false,
          )}
          {...props}>
          <View>{children}</View>
        </TouchableNativeFeedback>
      );

    case 'opacity':
      return (
        <TouchableOpacity activeOpacity={opacity} {...props}>
          {children}
        </TouchableOpacity>
      );

    default:
      return (
        <TouchableWithoutFeedback {...props}>
          {children}
        </TouchableWithoutFeedback>
      );
  }
};

export default memo(Touchable);

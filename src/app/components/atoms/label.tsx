import {StyleSheet, ViewStyle, Text, View, TextStyle} from 'react-native';

import Typography from '../typography';

import colors from '../../constant/colors';

type Props = {
  containerStyle?: ViewStyle;
  labels: string[];
  textColor?: TextStyle;
};
const Label = ({containerStyle, labels, textColor}: Props) => {
  return (
    <View style={{...styles.assetContainer, ...containerStyle}}>
      {labels.map((label, index) => {
        let value = 55 / (labels.length - 2);
        let textAlign: 'center' | 'left' | 'right' | 'justify' = 'center';
        if (index == 0) {
          value = 25;
          textAlign = 'left';
        }
        if (index == labels.length - 1) value = 20;

        return (
          <Typography
            style={{
              color: colors.LABEL_COLOR_SECONDARY,
              ...textColor,
              flexBasis: `${value}%`,
            }}
            alignment={textAlign}
            key={index}>
            {label}
          </Typography>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  assetContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    flex: 1,
  },
});

export default Label;

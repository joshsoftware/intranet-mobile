import {StyleSheet, ViewStyle, Text, View, TextStyle} from 'react-native';
import colors from '../../constant/colors';
import Typography from '../typography';

type Props = {
  containerStyle?: ViewStyle;
  labels: string[];
  textColor?: TextStyle;
};
const Label = ({containerStyle, labels, textColor}: Props) => {
  return (
    <View style={{...styles.assetContainer, ...containerStyle}}>
      {labels.map((label, index) => {
        let value = 60 / (labels.length - 2);
        let textAlign: 'center' | 'left' | 'right' | 'justify' = 'center';
        if (index == 0) {
          value = 25;
          textAlign = 'left';
        }
        if (index == labels.length - 1) value = 15;

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
    flexWrap: 'wrap',
    marginBottom: 20,
  },
});

export default Label;

import {TouchableOpacity, ViewStyle} from 'react-native';

import {borderStyles} from '../../../styles';
import CustomImage from '../images/customImage';

type Props = {
  uri: string;
  circleViewStyle?: ViewStyle;
  borderType?: 'thinBorder' | 'circleBorder';
  handlePress: (uri: string) => {};
};

const CircleView = ({
  uri,
  circleViewStyle,
  borderType = 'circleBorder',
  handlePress,
}: Props) => {
  return (
    <TouchableOpacity
      style={[borderStyles[borderType], circleViewStyle]}
      onPress={() => handlePress(uri)}>
      <CustomImage
        uri={
          'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f8/LinkedIn_icon_circle.svg/800px-LinkedIn_icon_circle.svg.png'
        }
      />
    </TouchableOpacity>
  );
};

export default CircleView;

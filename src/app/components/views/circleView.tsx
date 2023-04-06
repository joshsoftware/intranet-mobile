import React from 'react';
import {TouchableOpacity, ViewStyle} from 'react-native';

import {Blog, Facebook, Github, Linkdin} from '../../constant/icons';

type Props = {
  uri: string;
  circleViewStyle?: ViewStyle;
  borderType?: 'thinBorder' | 'circleBorder';
  handlePress: (uri: string) => {};
  data: {name: string};
};

const renderSvg = (type: string) => {
  switch (type) {
    case 'github':
      return <Github />;
    case 'linkdin':
      return <Linkdin />;
    case 'facebook':
      return <Facebook />;
    case 'blog':
      return <Blog />;
  }
};
const CircleView = ({
  uri,
  circleViewStyle,
  borderType = 'circleBorder',
  handlePress,
  data,
}: Props) => {
  return (
    <TouchableOpacity
      style={[circleViewStyle]}
      onPress={() => handlePress(uri)}>
      {renderSvg(data.name)}
    </TouchableOpacity>
  );
};

export default CircleView;

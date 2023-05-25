import React from 'react';
import {TouchableOpacity, ViewStyle} from 'react-native';

import urlHandler from '../../utils/userProfile/urlHandler';

import {Blog, Facebook, Github, Linkdin} from '../../constant/icons';

type Props = {
  uri: string;
  circleViewStyle?: ViewStyle;
  borderType?: 'thinBorder' | 'circleBorder';
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

const handlePress = (uri: string) => urlHandler(uri);

const CircleView = ({uri, circleViewStyle, data}: Props) => {
  const checkPress = () => handlePress(uri);
  return (
    <TouchableOpacity style={[circleViewStyle]} onPress={checkPress}>
      {renderSvg(data.name)}
    </TouchableOpacity>
  );
};

export default CircleView;
